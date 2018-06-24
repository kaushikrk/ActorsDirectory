import { Component, ViewChild } from '@angular/core';
import {ActorModel} from '../app/Actor.model';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  actors: ActorModel[] = [];
  @ViewChild('subMenu') public subMenu ;
constructor() {}
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
