import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { ActorService } from '../actor.service';
import {ActorModel } from '../Actor.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css'],
})
export class ActorComponent implements OnInit {
  @Input() searchQuery:any;
  searchboxVisible = false;
  currentPage:Number=1;
  noResultsFound:boolean=false;
  totalPage:any=[];
  currentList:ActorModel[] =[];
  actorsList:ActorModel[] = [];
  sourceList:ActorModel[] = [];
  searchResultsubscription:Subscription;
  constructor(private actorService: ActorService) { }

  ngOnInit() {
    let data;
    console.log(this.searchQuery);
    if(this.actorService.getActorsList()){
      this.actorService.getActorsList().subscribe(res=>{
        data=res;
        if(data.Items && data.Items.length>0){
          this.loadResults(data);
          this.actorService.cachedList=data;
          this.actorService.showLoadingScreen(false);
        } else{
          this.actorService.showLoadingScreen(false);
          this.noResultsFound=true;
        }
      });  
    }
    else{
      this.loadResults(this.actorService.cachedList);
      this.actorService.showLoadingScreen(false);
    }
  }
  ngAfterContentChecked(){
  }
  private loadResults(data: any) {
    this.actorsList = data.Items;
    this.sourceList = data.Items;
    let pages = data.Items.length / 18;
    for (let i = 0; i <= pages; i++) {
      let k = i;
      this.totalPage.push(++k);
    }
    if (data.Items.length >= 17) {
      this.currentList = data.Items.slice(0, 18);
    }
    else {
      this.currentList = data.Items;
    }
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
        this.actorsList = this.sourceList
        .filter((actor: ActorModel) => actor.actorName === filterValue);
      }
      
    }
  }
  onPageClick(pageNumber:any,event:any){
    let pgN= parseInt(pageNumber);
    let sliceStart=(pgN-1)*18;
    this.currentList=this.actorsList.slice(sliceStart,sliceStart+18);
    // event.currentTarget.classList.add("active");
  }
  ngOnDestroy(){
    console.log("destroying list");
  }
}
