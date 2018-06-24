import { Component, OnInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { Audition } from '../auditionpage/audition.model';
import { FormGroup } from '@angular/forms';
import { AuditionService } from '../../audition.service';

@Component({
  selector: 'app-audition-form',
  templateUrl: './audition-form.component.html',
  styleUrls: ['./audition-form.component.css']
})
export class AuditionFormComponent implements OnInit {

  successMessage:boolean;
  faliureMessage:boolean;
  failureString:String;
  @Output() onCancelPost : EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onSuccessfulPost : EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('auditionForm') auditionForm:FormGroup;
  audition:Audition = new Audition();
  constructor(private auditionService:AuditionService) { }

  ngOnInit() {
    console.log(this.auditionForm);
  }
  formSubmit () {
    console.log(this.audition);
    let auditionDate= new Date(this.audition.auditionDate);
    let currentDate = new Date();
    let year= auditionDate.getFullYear();
    let month = auditionDate.getMonth();
    let day = auditionDate.getDate();
    if(auditionDate > currentDate){
      this.auditionService.postAuditions(this.audition).subscribe((data) => {
        if(data.success){
          console.log('posted successfully');
          this.successMessage=true;
          this.faliureMessage=false;
          this.onSuccessfulPost.emit(true);
          this.onCancelPost.emit(true);
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
      this.failureString="Please enter valid date";
    }
  }
  cancelPost() {
    this.onCancelPost.emit(true);
  }
}
