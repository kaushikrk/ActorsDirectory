import { Component, OnInit, DoCheck, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import { ActorService } from '../actor.service';
import { ActorModel } from '../Actor.model';
import { OMDBResponse } from '../models/OMDBResponse';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-actor-details',
  templateUrl: './actor-details.component.html',
  styleUrls: ['./actor-details.component.css']
})
export class ActorDetailsComponent implements OnInit,AfterViewInit {

  @ViewChild("comment") comment:ElementRef;
  userLoggedIn: boolean=true;
  public userName: any="";
  public actor: any ;
  public loggedIn:Boolean= false;
  public movies :String[] =[];
  public OMDBResponses:OMDBResponse[]=[];
  public showMessageScreen:boolean = false;
  public comments:any=[];
  constructor(private actorService: ActorService,private route: ActivatedRoute) {
    this.actor = {};
  }

  private newMethod(data) {
    console.log('new method');
    this.actor = data;
  }

  submitComment(comment:any){
    if(this.actor.actorId && this.userName.length>0){
      let body = {
        "comment": comment.value,
        "actorId": this.actor.actorId,
        "userName": this.userName,
        "commentedOn":new Date()
    };
    this.actorService.submitComment(body).subscribe(response=>{
      this.comments=response;
      this.loadActorComments();
    });
    } else{
      this.userLoggedIn=false;
    }
    
  }
  ngOnInit() {
    console.log('actor details');
    this.route.params.subscribe(actor=>{
      this.actorService.getActor(actor.actorId).subscribe(actor=>{
        this.actor=actor;
        this.loadActorMovies();
        this.loadActorComments();
      });
    });
    
  }
  requestContact(){
    this.showMessageScreen=true;
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
      });
    }
  }
  loadActorComments(): any {
    this.actorService.getComments(this.actor.actorId).subscribe(comments=>{
      comments.forEach(element => {
        if(element.commentedOn){
          let commentDate = new Date(element.commentedOn);
          let day =commentDate.getDate();
          let month =commentDate.getMonth();
          let year =commentDate.getFullYear();
          element.commentedOn=day+"/"+month+"/"+year;
        }
      });
      this.comments=comments;
    })
  }
  continueAsGuest(guesUserNameEl:any){
    this.userName=guesUserNameEl.value;
    this.userLoggedIn=true;
    this.submitComment(this.comment.nativeElement);
  }
}
