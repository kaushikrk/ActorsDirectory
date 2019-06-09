import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RatingModule } from 'primeng/rating';
import { SafeResourceUrl, DomSanitizer, } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { MovieService } from '../../services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/Authentication.service';
import { SeoService } from '../../services/SeoService';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponentComponent } from '../login-component/login-component.component';
@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  
  detailType: any;
  totalRatings: any=0;
  userLoggedIn: any;
  alreadyRated: boolean;
  onRatingSuccess:boolean=false;
  currentRate;
  required: boolean=false;
  reviews: any;
  movieId: string;
  reviewed: boolean = false;
  movie: any;
  @ViewChild("review",{static:true}) review;
  @ViewChild("ratingButton",{static:true}) ratingButton:ElementRef;
  val: any = 2;
  constructor(private movieService: MovieService, private route: ActivatedRoute,
    private authService: AuthenticationService, private ngbModal:NgbModal,
    private seoService: SeoService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.movie = {};
    this.userLoggedIn= this.authService.isUserLoggedIn();
    this.route.url.subscribe(data => { this.detailType = data[0].path });
    this.route.params.subscribe(data => { this.movieId = data.movieId });
    this.movieService.getMovieDetails(this.movieId).subscribe(data => {
      this.movie = data.uniqueResult;
      if(this.movie.trailer){
        this.movie.trailer = this.sanitizer.bypassSecurityTrustResourceUrl(this.movie.trailer);
      }
      
      let tags = {
        name: 'keywords',
        content: this.movie.language + 'Movie,' + this.movie.title + ',' + this.movie.directorName + ',' + this.movie.musicDirector
          + ',' + this.movie.cinematographer + ',' + this.movie.editor
      };
      let og=[{
        name:'og:title', content:this.movie.title
      },
      {
        name:'og:type', content:'website'
      },
      {
        name:'og:url', content:`https://www.icchata.com/movie/details/${this.movie.movieId}`
      },
      {
        name:'og:image', content:`https://www.icchata.com/assets/movies/${this.movie.poster}`
      }
    ]
      this.seoService.updateMultiMetaForPage(og);
      this.seoService.updateMetaForPage(tags);
    });
    this.getReview();
    this.movieService.getRatings(this.movieId).subscribe((data)=>{
      this.currentRate=data.uniqueResult.averageRatings;
      this.totalRatings=data.uniqueResult.totalRatings;
    })
  }
  postReviews(reviewEl: any) {
    let review= reviewEl.value;
    let userLoggedIn = this.authService.isUserLoggedIn();
    if (userLoggedIn) {
      let userName="";
      if (review.length > 30) {
        this.required = false;
        if(this.authService.getUserDetails().userName){
           userName=this.authService.getUserDetails().userName;
        } else{
          userName=this.authService.getUserDetails().userEmail.split("@")[0];
        }
        let userReview = {
          movieId: this.movieId,
          userId: this.authService.getUserDetails().userId,
          userName: userName,
          reviewComment: review
        }
        this.movieService.postReviews(userReview).subscribe(data => { 
          this.getReview();
          reviewEl.value="";
        },
          err => {
            if (err.status == 422) {
              reviewEl.value="";
              this.reviewed = true;
            }
            console.log(err);
          });
      } else{
        this.required = true;
      }
    } else {
      // window.location.href = "/login";
    }

  }
  getReview() {
    let currentRate=this.currentRate;
    this.movieService.getReviews(this.movieId).subscribe(data => {
      this.reviews = data.items;
    }, err => {
      console.log(err);
    });
  }
  postRating(event:any){
    setTimeout(()=>{
      this.userLoggedIn = this.authService.isUserLoggedIn();
    if (this.userLoggedIn) {
    let userRating={
      userId: this.authService.getUserDetails().userId,
      movieId:this.movieId,
      userRating: this.currentRate
    };
    this.movieService.postRatings(userRating).subscribe((data)=>{
      this.onRatingSuccess=true;
    }, err=>{
      if (err.status == 422) {
        this.alreadyRated = true;
      }
      this.onRatingSuccess=false;
    });
  }
  else{
    window.location.href="/login";
  }
    },350)
    
}
}
