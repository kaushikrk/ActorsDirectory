import { Component, OnInit, ElementRef } from '@angular/core';
import { ActorService } from '../actor.service';
import {ActorModel } from '../Actor.model';

@Component({
  selector: 'app-photographer',
  templateUrl: './photographer.component.html',
  styleUrls: ['./photographer.component.css'],
})
export class PhotographerComponent implements OnInit {
  searchboxVisible = false;
  photoGraphersList:ActorModel[] = [];
  sourceList:ActorModel[] = [];
  constructor(private actorService: ActorService) { }

  ngOnInit() {
    
  }
  loadProfile(actor) {
    console.log(actor);
    this.actorService.data = actor;
  }
  searchActorList(searchBox) {
    if (!searchBox.value || searchBox.value == "") {
     this.photoGraphersList=this.sourceList;
    } else {
      let filterValue = searchBox.value;
      if(filterValue.search('a:')!=-1){
        filterValue=filterValue.split('a:')[1]
        console.log(filterValue);
        this.photoGraphersList = this.sourceList
        .filter((actor: ActorModel) => actor.actorAge >= filterValue);
      } else{
        this.photoGraphersList = this.photoGraphersList
        .filter((actor: ActorModel) => actor.actorName === filterValue);
      }
      
    }
  }
}
