import { Component, OnInit, DoCheck, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ActorService } from '../../services/actor.service';
import { ActorModel } from '../../Actor.model';
import { OMDBResponse } from '../../models/OMDBResponse';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/Authentication.service';
import { MovieService } from '../../services/movie.service';
import { SeoService } from '../../services/SeoService';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-actor-details',
  templateUrl: './actor-details.component.html',
  styleUrls: ['./actor-details.component.css']
})
export class ActorDetailsComponent implements OnInit, AfterViewInit {

  dataLoaded: boolean = false;
  totalRatings: any = 0;
  showDialog: boolean = false;
  error: boolean;
  errorMsg: any;
  successMessage: boolean;
  emailTo: any;
  alreadyRated: boolean;
  auditionInvitation: any = ""
  currentRate: any;
  onRatingSuccess: boolean;
  profileIndex: number;
  profilePhoto: any = '';
  guestUserName: any;
  guestUser: boolean;
  @ViewChild("comment",{static:true}) comment: ElementRef;
  userLoggedIn: boolean = true;
  public userName: any = "";
  public actor: any;
  public details: String = 'contact'
  public loggedIn: Boolean = false;
  public movies: String[] = [];
  public OMDBResponses: OMDBResponse[] = [];
  public showMessageScreen: boolean = false;
  public comments: any = [];

  constructor(private authService: AuthenticationService, private actorService: ActorService, private route: ActivatedRoute, private router: Router,
    private movieService: MovieService, private seoService: SeoService, private modalService: NgbModal
  ) {
    this.actor = {};
    this.route.params.subscribe(data => { this.actor = data });
    this.userLoggedIn = this.authService.isUserLoggedIn();
    // if (this.userLoggedIn) {
    //   this.userName = this.authService.getLoggedInUserName();
    // } else{
    //   this.router.navigate(["/login"]);
    // }
    this.route.params.subscribe(actor => {
      this.actorService.showLoadingScreen(true);
      this.actorService.getActor(actor.actorId).subscribe(result => {
        if (result.success)
          this.actorService.showLoadingScreen(false);
        this.actor = result.uniqueResult;
        this.emailTo = `https://mail.google.com/mail/?view=cm&fs=1&to=${this.actor.userEmail}.com&su=Audition&body=We are inviting you to the auditions of ..`;
        this.getActorPhoto();
        this.movieService.getRatings(this.actor.actorId).subscribe((data) => {
          this.currentRate = data.uniqueResult.averageRatings;
          this.totalRatings = data.uniqueResult.totalRatings;
        })
        if (this.actor.profileType == 'actor') {
          this.loadActorMovies();
        }
        this.dataLoaded = true;
      }, err => {
        console.log(err);
        this.actorService.showLoadingScreen(false);
      });
    });
  }
  private newMethod(data) {
    console.log('new method');
    this.actor = data;
  }
  ngOnInit() {
    console.log('actor details');

  }
  ngAfterViewInit() {
  }
  private loadActorMovies() {
    if (this.actor.actorMovies) {
      this.movies = this.actor.actorMovies.split(',');
      this.actorService.showLoadingScreen(true);
      this.actorService.getMovieDetailsFromOmdb(this.movies).subscribe(responseList => {
        responseList.forEach(element => {
          this.OMDBResponses.push(element);
        });
        this.actorService.showLoadingScreen(false);
      }, err => {
        console.log(err);
        this.actorService.showLoadingScreen(false);
      });
    }
  }

  getActorPhoto() {
    if (this.actor.actorPhoto) {
      this.profilePhoto = this.actor.actorPhoto;
    } else if (this.actor.actorPhotos && this.actor.actorPhotos.length > 0) {
      this.profilePhoto = this.actor.actorPhotos[0];
      this.profileIndex = 0;
    } else {
      this.profilePhoto = "https://ssl.gstatic.com/accounts/ui/avatar_2x.png";
    }
    let og = [{
      name: 'og:title', content: this.actor.name
    },
    {
      name: 'og:type', content: 'website'
    },
    {
      name: 'og:url', content: `https://www.icchata.com/movie/details/${this.actor.actorId}`
    },
    {
      name: 'og:image', content: `../../../assets/movies/${this.profilePhoto}`
    }
    ]
    this.seoService.updateMultiMetaForPage(og)
  }
  ngOnDestroy() {
    console.log('test')
  }
  getQuotation() {
  }
  postRating(event: any) {
    setTimeout(() => {
      let userLoggedIn = this.authService.isUserLoggedIn();
      if (userLoggedIn) {
        let userRating = {
          userId: this.authService.getUserDetails().userId,
          movieId: this.actor.actorId,
          userRating: this.currentRate
        };
        this.movieService.postRatings(userRating).subscribe((data) => {
          this.onRatingSuccess = true;
        }, err => {
          if (err.status == 422) {
            this.alreadyRated = true;
          }
          this.onRatingSuccess = false;
        });
      }
      else {
        window.location.href = "/login";
      }
    }, 350)

  }
  sendAuditionCall() {
    console.log(this.auditionInvitation);
    if(this.auditionInvitation.length>30){
      let invite = {
        senderId: this.authService.getActorId(),
        recieverId: this.actor.actorId,
        invitationMessage: this.auditionInvitation
      }
      this.actorService.sendAuditionCall(invite).subscribe(data => {
        if (data.success) {
          this.successMessage = true;
        } else {
          this.error = true;
          this.errorMsg = data.errorMessage;
        }
      });
    }

  }
}
