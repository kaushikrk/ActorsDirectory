import { Component, OnInit, ElementRef, Input, ViewChild } from '@angular/core';
import { ActorService } from '../../services/actor.service';
import {ActorModel } from '../../Actor.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css'],
})
export class ActorComponent implements OnInit {
  @Input() searchQuery:any;
  @ViewChild('searchEl',{static:true}) searchEl:any;
  profileType:String;
  searchboxVisible = false;
  currentPage:any=1;
  noResultsFound:boolean=false;
  totalPage:any=[];
  currentList:ActorModel[] =[];
  actorsList:ActorModel[] = [];
  sourceList:ActorModel[] = [];
  text: string;
  results: string[];
  searchResultsubscription:Subscription;
  
  constructor(private actorService: ActorService, private router:ActivatedRoute) { }

  ngOnInit() {
    let data;
    this.router.url.subscribe( segment => {this.profileType=segment[0].path} );
    this.actorService.showLoadingScreen(true);
    if(this.actorService.cachedQuery){
        this.searchProfiles(this.actorService.cachedQuery.actorLocation);
    } else{
      this.actorService.getActorsList(this.profileType).subscribe(res=>{
        data=res;
        this.actorService.showLoadingScreen(false);
        this.updateResults(data);
      }, err => {
        console.log(err);
        this.actorService.showLoadingScreen(false);
      });
    }
  }
  private updateResults(data: any) {
    if (data.items && data.items.length > 0) {
      this.loadResults(data);
      this.noResultsFound = false;
      // this.actorService.cachedList=data;
      this.actorService.showLoadingScreen(false);
    }
    else {
      this.currentList=[];
      this.actorService.showLoadingScreen(false);
      this.noResultsFound = true;
    }
  }

  ngAfterContentChecked(){
  }
  private loadResults(data: any) {
    this.actorsList = data.items;
    this.sourceList = data.items;
    this.totalPage=[];
    let pages = data.items.length / 20;
    for (let i = 0; i <= pages; i++) {
      let k = i;
      this.totalPage.push(++k);
    }
    if (data.items.length >= 20) {
      this.currentList = data.items.slice(0, 20);
    }
    else {
      this.currentList = data.items;
    }
  }

  loadProfile(actor) {
    this.actorService.data = actor;
  }
  searchActorList(searchBox) {
    if (!searchBox.value || searchBox.value == "") {
     this.actorsList=this.sourceList;
    } else {
      let filterValue = searchBox.value;
      if(filterValue.search('a:')!=-1){
        filterValue=filterValue.split('a:')[1]
        this.actorsList = this.sourceList
        .filter((actor: ActorModel) => actor.actorAge >= filterValue);
      } else{
        this.actorsList = this.sourceList
        .filter((actor: ActorModel) => actor.actorName === filterValue);
      }
      
    }
  }
  onPrevPageClick(event:any){
    let sliceStart;
    if(this.currentPage>1){
      this.currentPage--;
      sliceStart=this.currentPage*20;
      this.currentList=this.actorsList.slice(sliceStart,sliceStart+20);
    }
    
    // event.currentTarget.classList.add("active");
  }
  onNextPageClick(event:any){
    let sliceStart;
    if(this.currentPage<this.actorsList.length/20){
      this.currentPage++;
      sliceStart=this.currentPage*20;
      this.currentList=this.actorsList.slice(sliceStart,sliceStart+20);
    }
  }
  ngOnDestroy(){
    console.log("destroying list");
  }
  searchProfiles(userName:String){
    this.actorService.searchActors({"userName":userName,"userProfile":this.profileType}).subscribe(res=>{
      this.updateResults(res);
    },
    err=>{
      console.log(err);
    }
  )
  }
}
function responseErrorHandler(): (error: any) => void {
  return ;
}

