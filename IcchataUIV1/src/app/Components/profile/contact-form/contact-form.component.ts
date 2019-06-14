import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  @Output() saveEvent:EventEmitter<any>= new EventEmitter();
  @Input() actor:any={};
  contactForm:FormGroup;
  constructor(private fb:FormBuilder) { 
    this.contactForm=this.fb.group({
      instaLink: new FormControl(""),
      fbLink: new FormControl(""),
      website: new FormControl(""),
      actorContactNumber: new FormControl("", [Validators.required, Validators.pattern("(7|8|9)\\d{9}")]),
      userEmail:new FormControl(""),
      actorContactConsent: new FormControl("")
    });
  }

  ngOnInit() {
    this.actor=JSON.parse(this.actor);
    this.contactForm.patchValue(this.actor);
  }
  SaveContactForm(){
    let values=this.contactForm.value;
    this.actor.actorContactNumber=values.actorContactNumber;
    this.actor.actorContactConsent=values.actorContactConsent;
    this.actor.instaLink=values.instaLink;
    this.actor.fbLink=values.fbLink;
    this.actor.website=values.website;
    this.actor.userEmail=values.userEmail;
    this.saveEvent.emit(this.actor);
    console.log(this.contactForm.value)
  }
}
