import { Component, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { ActorService } from '../../services/actor.service';
import { AuthenticationService } from '../../services/Authentication.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { LoginUtility } from '../../Util/LoginUtility';
declare const gapi: any;

@Component({
  selector: 'google-signin',
  templateUrl: './google-signin.html'
})
export class GoogleSigninComponent implements OnInit {

  loginUtil: LoginUtility;
  // private clientId: string = '675917032538-7p0ppsmkmof4fcep74j072v1j1l7b8m9.apps.googleusercontent.com';
  private clientId: String = '1049782464152-09t6gmhmimm1t7mgf3rvpp4gs7b6t10b.apps.googleusercontent.com'
  private scope = [
    'profile',
    'email',
    'https://www.googleapis.com/auth/plus.me',
  ].join(' ');

  public auth2: any;
  public googleInit() {
    let that = this;
    gapi.load('auth2', function () {
      that.auth2 = gapi.auth2.init({
        client_id: that.clientId,
        cookiepolicy: 'single_host_origin',
        scope: that.scope
      });
      that.attachSignin(that.element.nativeElement.firstChild);
    });
  }
  public attachSignin(element) {
    let that = this;
    this.auth2.attachClickHandler(element, {},
      function (googleUser) {
        let profile = googleUser.getBasicProfile();
        console.log(profile);
        let googleProfile = {
          userId: profile.getId(),
          name: profile.getName(),
          image: profile.getImageUrl(),
          email: profile.getEmail(),
          googleUser: true
        }
        let user = {
          actorName: googleProfile.name,
          encodedEmail: btoa(googleProfile.email),
          encodedContactNumber: btoa("000"),
          encodedPassword: btoa("saf#Hav3n")
        }
        that.actorService.googleReferral(user).subscribe(data => {
          that.loginUser(that, googleProfile);
        }, err => { 
          if(err.status==422){
            that.loginUser(that, googleProfile);
          }
        });
        that.authService.googleLogin(googleProfile, googleUser.getAuthResponse().id_token);
        // that.authService.loginEvent.emit(googleProfile.name);
      }, function (error) {
        console.log(JSON.stringify(error, undefined, 2));
      });
  }

  constructor(private element: ElementRef, private authService: AuthenticationService, private router: Router, private location: Location, private actorService: ActorService) {
    this.loginUtil = new LoginUtility();
  }

  private loginUser(that: this, googleProfile: { userId: any; name: any; image: any; email: any; googleUser: boolean; }) {
    that.loginUtil.loginUser({ userId: googleProfile.email, password: "saf#Hav3n" }, that.actorService, that.authService).subscribe(data => {
      console.log("Loggin in successfully");
      data.userName = googleProfile.name;
      that.authService.setLoggedInUser(data.userName, data);
      that.location.back();
    });
  }

  ngOnInit() {
    this.googleInit();
  }

}