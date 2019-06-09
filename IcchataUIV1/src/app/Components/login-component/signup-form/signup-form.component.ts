import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { URLConfig } from '../../../URLConfig';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LoginUtility } from '../../../Util/LoginUtility';
import { HttpClient } from '@angular/common/http';
import { ActorService } from '../../../services/actor.service';
import { AuthenticationService } from '../../../services/Authentication.service';
import { Router } from '@angular/router';
import { Location } from "@angular/common";

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {
  

  setErrorMsg(errorMsg: any): any {
    this.errorMsg=errorMsg;
  }
  loginUtil: LoginUtility;
  
  passwordSent: boolean;
  errorMsg: string = "Invalid Username/password";
  userAlreadyExist: boolean = false;
  registrationSuccess: boolean = false;
  userLoggedIn: boolean = false;
  invalidCredentials: boolean = false;
  tab: string = 'login';
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
    } else {
      this.registerForm = new FormGroup({
        'userName': new FormControl('', [Validators.required]),
        'contactNumber': new FormControl('', [Validators.required, Validators.pattern("(7|8|9)\\d{9}")]),
        'password': new FormControl('', [Validators.required]),
      });

    }
  }
  register() {
    let userCred = this.registerForm.value;
    try {
      this.validateCredentials(this.registerForm.value, true);
      this.invalidSignUpCredentials = false;
    }
    catch (e) {
      this.invalidSignUpCredentials = true;
      this.setErrorMsg("Please enter valid email address and phone number");
      return;
    }
    let user = {
      encodedEmail: btoa(userCred.userName),
      encodedContactNumber: btoa(userCred.contactNumber),
      encodedPassword: btoa(userCred.password)
    }
    this.actorService.showLoadingScreen(true);
    this.actorService.saveActor(user)
      .subscribe(
        data => {
          this.actorService.showLoadingScreen(false);
          this.registrationSuccess = true;
          this.invalidCredentials = false;
          this.loggedIn.emit(true);
        },
        err => {
          this.actorService.showLoadingScreen(false);
          console.log(err);
          if (err.status == 422) {
            this.invalidSignUpCredentials = true;
            this.setErrorMsg("User already registered");
          }
        });
  }
  
  showRegistrationError() {
    if (this.tab == 'signup' && this.invalidSignUpCredentials == true) {
      return true;
    } else {
      return false;
    }
  }


  
}
