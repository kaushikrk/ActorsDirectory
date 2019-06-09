import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ActorService } from '../../services/actor.service';
import { AuthenticationService } from '../../services/Authentication.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { URLConfig } from '../../URLConfig';
import { Location } from "@angular/common";
import { LoginUtility } from '../../Util/LoginUtility';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {

  setErrorMsg(errorMsg: any): any {
    this.errorMsg=errorMsg;
  }
  loginUtil: LoginUtility;
  showForgotPassword: boolean = false;
  forgotPasswordFlag: boolean;
  passwordSent: boolean;
  errorMsg: string = "Invalid Username/password";
  userAlreadyExist: boolean = false;
  registrationSuccess: boolean = false;
  userLoggedIn: boolean = false;
  invalidCredentials: boolean = false;
  tab: string = 'login';
  loginForm: FormGroup;
  registerForm: FormGroup;
  invalidSignUpCredentials: boolean;
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
    } 
  }
  

}
