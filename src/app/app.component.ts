import { Component, ViewChild } from '@angular/core';
import {ActorModel} from '../app/Actor.model';
import { HttpClient } from '@angular/common/http';
import { Configuration } from './common/config.component';
import { ActorService } from './actor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  actors: ActorModel[] = [];
  showLoading:boolean=false;
  @ViewChild('subMenu') public subMenu ;
  profileTypes:String[];

constructor(private actorService:ActorService) {
let me= this;
let config= new Configuration();
this.profileTypes=config.profileType;
this.actorService.loadDetails.subscribe(data=>{
  console.log("getting value"+data);
  me.showLoading=data;
})
}
ngOnChanges(){
  console.log("changes")
}
ngDoCheck(){
  console.log("do check")
}
menuClick() {
  this.subMenu.nativeElement.classList.toggle('dropdown-menu-hide');
}
onSignIn(googleUser) {
  let profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); 
}
}
