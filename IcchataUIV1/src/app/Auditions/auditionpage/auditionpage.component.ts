import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { AuditionFormComponent } from '../audition-form/audition-form.component';
import { Audition } from '../../models/Audition';
import { AuditionService } from '../../services/AuditionService';
import { AuthenticationService } from '../../services/Authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auditionpage',
  templateUrl: './auditionpage.component.html',
  styleUrls: ['./auditionpage.component.css']
})
export class AuditionpageComponent implements OnInit {

  noResults: boolean=true;
  auditions : Audition[] = [];
  hiddenForm:boolean = true;
  constructor(private vcRef:ViewContainerRef,private componentFactoryResolver: ComponentFactoryResolver, 
    private auditionService:AuditionService, private auth:AuthenticationService,private router:Router) { }

  ngOnInit() {
    // if(!this.auth.isUserLoggedIn()){
    //   this.router.navigate(["/login"])
    // }
    this.getAuditions();
  }
  showForm() {
    this.hiddenForm=false;
  }
  formattedDate(auditionDate):String {
   let ad= new Date(auditionDate);
   let date= ad.getDate();
   let month=ad.getMonth();
   let year=ad.getFullYear();
   return date+"/"+month+"/"+year;
  }
  getAuditions() {
    this.auditionService.getAuditions().subscribe((data) => {
      if(data.items.length>0)  {
        this.auditions= data.items
        this.noResults=false;
      }
      else
      this.noResults=true;
      }, err=>{
        this.noResults=true;
      });
  }
}
