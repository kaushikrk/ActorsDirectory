import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActorService } from '../actor.service';
import { ActorModel } from '../Actor.model';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  successMessage:boolean = false;
  failureMessage:string ;
  previewsrc: any= {};
  newActor: ActorModel = new ActorModel();
  profilePhotos:any = {};
  @ViewChild('userForm') userForm: FormGroup;
  constructor(public actorService: ActorService) { }

  ngOnInit() {
    
  }
  uploadFiles(event) {
  this.failureMessage=undefined;
  this.successMessage=undefined;
  const files = event.files;
  const me = this;
  const regEx = '/Image\*'
  if (files.length >0) {
      for (let file of files) {
        if(file.size > 1000000){
          this.failureMessage='Please upload a file smaller than 2MB.'
        } else{
          me.profilePhotos = file;
          let reader = new FileReader();
          reader.onload =function (file) {
                console.log(file);
                me.previewsrc=reader.result;
           };      
          reader.readAsDataURL(file);
         }
        }
      }
      }
    submit() {
      this.successMessage=undefined;
      this.failureMessage = undefined;
      let blob = this.previewsrc.split('base64,')[1];
      this.newActor.actorPhoto = blob;
      this.newActor.actorId= this.newActor.actorContactNumber;
      console.log(this.newActor);
      this.actorService.saveActor(this.newActor).subscribe((data:any) => {
        if(data.success){
        this.successMessage=true;
        this.failureMessage = undefined;
        this.newActor= new ActorModel();
        }
        else {
        this.successMessage=false;
        this.failureMessage=data.status.message;
        }
      });
    }
    showUploadWindow(fileUpload){
      fileUpload.click();
    } 
  }
