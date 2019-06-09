import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponentComponent } from './login-component/login-component.component';
import { GoogleSigninComponent } from './google-sign-in/googleSignIn.component';
import { LoginFormComponent } from './login-component/login-form/login-form.component';
import { SignupFormComponent } from './login-component/signup-form/signup-form.component';
@NgModule({
    declarations: [LoginComponentComponent,GoogleSigninComponent,LoginFormComponent,SignupFormComponent],
    imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [LoginComponentComponent,GoogleSigninComponent,LoginFormComponent,SignupFormComponent]
})
export class AuthenticationModule { }