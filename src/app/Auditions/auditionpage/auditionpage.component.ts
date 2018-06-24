import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Audition } from './audition.model';
import { NgForm, FormGroup } from '@angular/forms';
import { AuditionFormComponent } from '../audition-form/audition-form.component';
import { AuditionService } from '../../audition.service';

@Component({
  selector: 'app-auditionpage',
  templateUrl: './auditionpage.component.html',
  styleUrls: ['./auditionpage.component.css']
})
export class AuditionpageComponent implements OnInit {

  auditions : Audition[] = [];
  hiddenForm:boolean = true;
  constructor(private vcRef:ViewContainerRef,private componentFactoryResolver: ComponentFactoryResolver, 
    private auditionService:AuditionService) { }

  ngOnInit() {
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
      data.Items.forEach(element => {
        element.auditionDate = this.formattedDate(element.auditionDate);
      });
        this.auditions= data.Items
      });
  }
}
