import { Component, ViewChild } from '@angular/core';
import { ActorModel } from '../app/Actor.model';
import { HttpClient } from '@angular/common/http';
import { Configuration } from './Components/common/config.component';
import { AuthenticationService } from './services/Authentication.service';
import { CommonService } from './services/Common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userName: string = '';
  userLoggedIn: any = false;
  title = 'app';
  actors: ActorModel[] = [];
  showLoading: boolean = false;
  profileTypes: String[];

  constructor(private commonService: CommonService, private authService: AuthenticationService) {
    let me = this;
    let config = new Configuration();
    this.profileTypes = config.profileType;
    CommonService.loadDetails.subscribe(data => {
      me.showLoading = data;
    });
    this.authService.loginEvent.subscribe(
      data=>{
        this.userLoggedIn=true;
        this.userName = data;
      }
    );
  }
  logout() {
    this.authService.logoutAppUser();
  }
  ngAfterViewInit() {
    this.userLoggedIn = this.authService.isUserLoggedIn();

    if (this.userLoggedIn) {
      this.userName = this.authService.getLoggedInUserName();
    }
  }
  showLoader(){
    this.authService.showLoadingScreen(true);
  }
}
