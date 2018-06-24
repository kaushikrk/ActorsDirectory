import { Component, OnInit, DoCheck, AfterViewInit } from '@angular/core';
import { ActorService } from '../actor.service';
import { ActorModel } from '../Actor.model';

@Component({
  selector: 'app-actor-details',
  templateUrl: './actor-details.component.html',
  styleUrls: ['./actor-details.component.css']
})
export class ActorDetailsComponent implements OnInit, DoCheck, AfterViewInit {

  public actor: any ;
  public showMessageScreen:boolean = false;
  constructor(private actorService: ActorService) {
    this.actor = {};
  }

  private newMethod(data) {
    console.log('new method');
    console.log(data);
    this.actor = data;
  }

  ngOnInit() {
    console.log('actor details');
    this.actor = this.actorService.data;
  }
  ngDoCheck() {
    console.log('-checking-');
    console.log(this.actor);
  }
  ngAfterViewInit() {
    this.actorService.loadDetails.subscribe(data => {
      this.actor = data.json();
    });
  }
}
