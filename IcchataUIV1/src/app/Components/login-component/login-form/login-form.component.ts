import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { URLConfig } from '../../../URLConfig';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LoginUtility } from '../../../Util/LoginUtility';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../../../services/Authentication.service';
import { ActorService } from '../../../services/actor.service';
import { Router } from '@angular/router';
import { Location } from "@angular/common";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  

  setErrorMsg(errorMsg: any): any {
    this.errorMsg=errorMsg;
  }
  loginUtil: LoginUtility;
  showForgotPassword: boolean = false;
  forgotPasswordFlag: boolean;
  passwordSent: boolean;
  errorMsg: string = "Invalid Username/password";
  userAlreadyExist: boolean = false;
  
  userLoggedIn: boolean = false;
  invalidCredentials: boolean = false;
  tab: string = 'login';
  loginForm: FormGroup;
  @Output() loggedIn :EventEmitter<boolean> = new EventEmitter();
  validateCredentials(loginForm: any, registrationForm: boolean): any {
    if (registrationForm) {
      if (this.isValidEmail(loginForm.userName) && this.isValidMobile(loginForm.contactNumber)) {
        return true;
      } else {
        throw new Error("Invalid Username/Password");
      }
    } else {
      if (this.isValidEmail(loginForm.userId) || this.isValidMobile(loginForm.userId)) {
        return true;
      } else {
        throw new Error("Invalid Username/Password");
      }
    }

  }
  isValidEmail(email: any): any {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  isValidMobile(mobile: any) {
    var re = /(6|7|8|9)\d{9}/;
    return re.test((mobile));
  }
  constructor(private http: HttpClient, private location: Location, private authService: AuthenticationService, private router: Router, private formBuilder: FormBuilder,
    private actorService: ActorService
  ) {
    this.loginUtil = new LoginUtility();
  }

  ngOnInit() {
    this.userLoggedIn = this.authService.isUserLoggedIn();
    if (this.userLoggedIn) {
      this.router.navigate(['/home']);
    } else {
      this.loginForm = new FormGroup({
        'userId': new FormControl('', [Validators.required]),
        'password': new FormControl('', [Validators.required]),
      });
    }
  }
  login() {
    this.passwordSent = false;
    if (this.loginForm.invalid) {
      this.setErrorMsg("Invalid Username/Password");
      return;
    } else {
      try{
        this.validateCredentials(this.loginForm.value, false);
      this.invalidCredentials = false;
      }catch(e){
        console.log('Invalid Credentials');
        this.setErrorMsg("Please enter valid email address or phone number"); 
      }
      
    }
      this.loginUtil.loginUser(this.loginForm.value, this.actorService, this.authService).subscribe(
        data => {
          this.invalidCredentials = false;
          this.loggedIn.emit(true);
          this.loginUtil.setUserName(data, this.authService);
          // this.authService.loginEvent.emit(data.userName);
          // this.router.navigate(['/home']);
          // window.location.href = '/profile'
          this.location.back();
        }, err => {
          this.invalidCredentials=true;
          this.actorService.showLoadingScreen(false);
          console.log('Invalid Credentials');
          this.setErrorMsg("Please enter valid email address or phone number");
        }
      );

  }
  getPassword(event: any, mobileNumber: any, emailAddress: any) {
    if (this.isValidMobile(mobileNumber.value) && this.isValidEmail(emailAddress.value)) {
      let user = {
        encodedContactNumber: btoa(mobileNumber.value),
        encodedEmail: btoa(emailAddress.value)
      }
      event.target.disabled = true;
      this.showForgotPassword = false;
      setTimeout(() => {
        event.target.disabled = false;
      }, 60000);
      this.http.post(URLConfig.getHostName() + '/user/forgotPassword', user).subscribe(
        data => {
          this.passwordSent = true;
          this.invalidCredentials = false;
          this.errorMsg = "Password has been sent to you."
        },
        err => { console.log('error logging out') }
      );
    }
    else {
      this.setErrorMsg("Please enter valid email address and phone number");
      this.showForgotPassword = false;
    }

  }
  
}
