import { Component, OnInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { Audition } from '../auditionpage/audition.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuditionService } from '../../services/AuditionService';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/Authentication.service';

@Component({
  selector: 'app-audition-form',
  templateUrl: './audition-form.component.html',
  styleUrls: ['./audition-form.component.css']
})
export class AuditionFormComponent implements OnInit {

  pastDate: boolean;
  time = {hour: 13, minute: 30};
  successMessage:boolean;
  faliureMessage:boolean;
  failureString:String;
  @Output() onCancelPost : EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onSuccessfulPost : EventEmitter<boolean> = new EventEmitter<boolean>();
  auditionForm:FormGroup;
  audition:Audition = new Audition();
  constructor(private auditionService:AuditionService,private auth:AuthenticationService, private fb:FormBuilder, private router:Router) {
    this.auditionForm=this.fb.group({
      roleName: new FormControl("",[Validators.required, Validators.minLength(4)]),
      productionName:new FormControl("",[Validators.required,Validators.minLength(4)]),
      productionType:new FormControl("",Validators.required),
      contactDetails:new FormControl("",[Validators.required,Validators.minLength(10)]),
      auditionDate:new FormControl("",Validators.required),
      auditionTime:new FormControl("",Validators.required),
      auditionLocation:new FormControl("",Validators.required),
      auditionFor:new FormControl("",Validators.required),
      auditionDescription:new FormControl("",Validators.required)
    })
   }

  ngOnInit() {
     if(!this.auth.isUserLoggedIn()){
        this.router.navigate(["/login"])
     }
  }
  formSubmit () {
    if(this.auditionForm.valid){
      let audition=this.auditionForm.value;
      let currentDate= new Date();
      let auditionDate= new Date(audition.auditionDate.year,audition.auditionDate.month-1,audition.auditionDate.day)
      if(currentDate<auditionDate &&(audition.auditionTime.hour<24 && audition.auditionTime.minute<60)){
        this.auditionService.postAuditions(this.auditionForm.value).subscribe((data) => {
          if(data.success){
            console.log('posted successfully');
            this.successMessage=true;
            this.faliureMessage=false;
            this.router.navigate(["/auditions"])
            }
            else {
              this.successMessage=false;
              this.faliureMessage=true;
              console.log('failed audition posting');
            }
        });
      }
      else{
        this.faliureMessage=true;
        this.failureString="Please Check Date and Time "
      }
    }
    else{
      this.faliureMessage=true;
      this.failureString="Please check Audition details before submitting "
    }
    
  }
  cancelPost() {
    this.onCancelPost.emit(true);
  }
}
