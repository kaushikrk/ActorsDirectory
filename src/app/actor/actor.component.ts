import { Component, OnInit, ElementRef } from '@angular/core';
import { ActorService } from '../actor.service';
import {ActorModel } from '../Actor.model';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css'],
})
export class ActorComponent implements OnInit {
  searchboxVisible = false;
  currentPage:Number=1;
  totalPage:any=[];
  currentList:ActorModel[] =[];
  actorsList:ActorModel[] = [];
  sourceList:ActorModel[] = [];
  constructor(private actorService: ActorService) { }

  ngOnInit() {
    this.actorService.getActorsList().subscribe(data => {
      this.actorsList=data.Items;
      this.sourceList=data.Items;
      let pages= data.Items.length/18;
      for(let i=0;i<=pages;i++){
        let k=i;
        this.totalPage.push(++k);
      }
      if(data.Items.length >17)  {
        this.currentList=data.Items.slice(0,17);
      }
      else{
        this.currentList=data.Items;
      }
      }
    );
  }
  loadProfile(actor) {
    console.log(actor);
    this.actorService.data = actor;
  }
  searchActorList(searchBox) {
    if (!searchBox.value || searchBox.value == "") {
     this.actorsList=this.sourceList;
    } else {
      let filterValue = searchBox.value;
      if(filterValue.search('a:')!=-1){
        filterValue=filterValue.split('a:')[1]
        console.log(filterValue);
        this.actorsList = this.sourceList
        .filter((actor: ActorModel) => actor.actorAge >= filterValue);
      } else{
        this.actorsList = this.actorsList
        .filter((actor: ActorModel) => actor.actorName === filterValue);
      }
      
    }
  }
  onPageClick(pageNumber:any){
    let pgN= parseInt(pageNumber);
    let sliceStart=(pgN-1)*18;
    this.currentList=this.actorsList.slice(sliceStart,sliceStart+18);
  }
}
