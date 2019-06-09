import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActorModel } from '../../Actor.model';
import { ActorService } from '../../services/actor.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/Authentication.service';
import { Router } from '@angular/router';
import { Configuration } from '../common/config.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  setProfilePhoto(): any {
    this.profilePhotos = this.actor.actorPhoto ? this.actor.actorPhoto : 'https://ssl.gstatic.com/accounts/ui/avatar_2x.png';
  }
  listProductions: boolean = true;
  passwordResetSuccess: boolean = false;
  userMsg: String = "";
  tab: string = 'profile';
  actor: any = {};
  showMovies: boolean = true;
  files: File[] = [];
  orgType: String[] = [];
  successMessage: boolean = false;
  failureMessage: string;
  previewsrc: any[] = [];
  newActor: ActorModel = new ActorModel();
  profilePhotos: any = {};
  profileTypes: String[] = [];
  cities: String[];
  userForm: FormGroup;
  productionForm: FormGroup;
  bioDetails: FormGroup;
  @ViewChild('fileUpload',{static:true}) fileUpload: ElementRef;

  constructor(public actorService: ActorService, private formBuilder: FormBuilder, private authService: AuthenticationService, private router: Router) {
    this.userForm = this.formBuilder.group({
      actorName: new FormControl('', [Validators.required, Validators.minLength(8)]),
      actorId: new FormControl(''),
      profileType: new FormControl("photographer", Validators.required),
      actorLocation: new FormControl("", Validators.required),
      aboutActor: new FormControl(""),
      actorMovies: new FormControl(""),
      // otherProfile: new FormControl(""),
      serviceCost: new FormControl(""),
      rolesPreffered: new FormControl([""])
    });
    // this.productionForm= new FormGroup({
    //   productionName: new FormControl("", Validators.required),
    //   productionYear: new FormControl("",Validators.required),
    //   rolePlayed: new FormControl("",Validators.required)
    // }
    // );
    this.bioDetails = new FormGroup({
      height: new FormControl("150", Validators.required),
      weight: new FormControl("60", Validators.required),
      skinTone: new FormControl("Light Brown", Validators.required),
      eyeColor: new FormControl("Black", Validators.required)
    }
    );
  }

  ngOnInit() {
    if (this.authService.isUserLoggedIn()) {
      // if(this.authService.googleUser){
      //   this.router.navigate(['/home']);  
      // } 
    } else {
      this.router.navigate(['/login']);
      return;
    }
    let config = new Configuration();
    this.profileTypes = config.profileType;
    this.cities = config.cities;
    this.orgType = config.organizationType;
    this.files = [];
    let actorId = this.authService.getActorId();
    if (actorId) {
      this.actorService.getProfile(actorId).subscribe(result => {
        if (result.success)
          this.actor = result.uniqueResult;
        this.setProfilePhoto();
        this.userForm.patchValue(this.actor);
        if(this.actor.bioDetails)
        this.bioDetails.patchValue(this.actor.bioDetails);
      }, err => {
        console.log(err);
        this.actorService.showLoadingScreen(false);
      });
    } else {
      this.setProfilePhoto();
      this.actor = new ActorModel();
    }
  }


  uploadFiles(event) {
    this.failureMessage = undefined;
    this.successMessage = undefined;
    const me = this;
    let files = event.files;
    const regEx = '/Image\*'

    if (files.length == 0) {
      this.failureMessage = 'Please upload a file.'
    } else if (this.actor.actorId) {
      this.actorService.postPhotos(files, this.actor.actorId).subscribe(result => {
        this.profilePhotos=result.uniqueResult.actorPhoto;
      });
    }
  }
  submit(event: any) {
    if(event)
    this.actor=event;
    this.successMessage = undefined;
    this.failureMessage = undefined;
    let photos = this.previewsrc;
    Object.assign(this.actor, this.userForm.value);
    if(this.actor.profileType=="actor"){
      this.actor.bioDetails=this.bioDetails.value;
      if(this.actor.rolesPreffered && !(this.actor.rolesPreffered instanceof Array))
      this.actor.rolesPreffered=this.actor.rolesPreffered.split(",");
    }
    if (this.actor.actorId) {
      this.actorService.showLoadingScreen(true);
      this.actorService.updateActor(this.actor).subscribe((data: any) => {
        this.actorService.showLoadingScreen(false);
        if (data.success) {
          this.successMessage = true;
          this.failureMessage = undefined;
          this.newActor = new ActorModel();
        }
        else {
          this.successMessage = false;
          this.failureMessage = data.err;
        }
      });
    }
    else {
      this.authService.logoutAppUser();
    }
  }
  showUploadWindow(fileUpload) {
    fileUpload.basicFileInput.nativeElement.click();
  }
  resetFileUploads() {
    this.failureMessage = '';
    this.previewsrc = [];
  }
  onProfileSelect(event) {
    if (event.target.value == "actor" || event.target.value == "editor" || event.target.value == "singer"
      || event.target.value == "choreographer" || event.target.value == "composer"
    ) {
      this.showMovies = true;
    } else if (event.target.value == "others") {
      this.showMovies = false;
    } else {
      this.showMovies = false;
    }
  }
  addProductions() {
    this.actor.productions = this.productionForm.value;
    this.listProductions = !this.listProductions;
  }

}
