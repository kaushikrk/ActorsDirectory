import { Component, OnInit, DoCheck, AfterViewInit} from '@angular/core';
import { ActorService } from '../actor.service';
import { ActorModel } from '../Actor.model';
@Component({
  selector: 'app-actor-details',
  templateUrl: './actor-details.component.html',
  styleUrls: ['./actor-details.component.css']
})
export class ActorDetailsComponent implements OnInit, DoCheck, AfterViewInit {

  public actor: any ;
  public loggedIn:Boolean= false;
  public movies :String[] =[];
  public showMessageScreen:boolean = false;
  constructor(private actorService: ActorService) {
    this.actor = {};
  }

  private newMethod(data) {
    console.log('new method');
    this.actor = data;
  }

  submitComment(comment:any){
    console.log(comment.value);
  }
  ngOnInit() {
    console.log('actor details');
    this.actor = this.actorService.data;
    if(this.actor.actorMovies){
      this.movies =this.actor.actorMovies.split(',');
    }
  }
  ngDoCheck() {
    console.log('-checking-');
  }
  ngAfterViewInit() {
    this.actorService.loadDetails.subscribe(data => {
      console.log('after view init');
      this.actor = data.json();
    });
  }
}
