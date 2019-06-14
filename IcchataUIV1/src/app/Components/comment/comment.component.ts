import { Component, OnInit, Input } from '@angular/core';
import { ActorService } from '../../services/actor.service';
import { AuthenticationService } from '../../services/Authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input('actorId') actorId:any;
  commentRequired: boolean;
  _actor: any;
  comments: any=[];
  @Input() 
  set actor(actor: any) {
    this._actor = JSON.parse(actor);
  }
  constructor(private actorService:ActorService,private authService:AuthenticationService,private router:Router) { }

  ngOnInit() {
    this.loadActorComments();
  }

  loadActorComments(): any {
    console.log("loading actors");
    this.actorService.getComments(this.actorId).subscribe(comments => {
      comments.forEach(element => {
        if (element.commentedOn) {
          let commentDate = new Date(element.commentedOn);
          let day = commentDate.getDate();
          let month = commentDate.getMonth();
          let year = commentDate.getFullYear();
          element.commentedOn = day + "/" + month + "/" + year;
        }
      });
      this.comments = comments;
    }, err => {
      console.log(err);
      this.actorService.showLoadingScreen(false);
    })
  }
  submitComment(comment: any) {
    if (this.actorId && this.authService.isUserLoggedIn()) {
      let body = {
        "comment": comment.value,
        "actorId": this.actorId,
        "userName":this.authService.getLoggedInUserName(),
        "commentedOn": new Date()
      };
      if(comment.value.length>30){
        this.commentRequired=false;
        this.actorService.submitComment(body).subscribe(response => {
          this.comments = response;
          this.loadActorComments();
          comment.value = "";
        }, err => {
          console.log(err);
          this.actorService.showLoadingScreen(false);
        });
      } else{
        this.commentRequired=true;
      }
    } else {
      this.router.navigate(['/login'])
    }

  }
}
