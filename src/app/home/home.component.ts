import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl,ReactiveFormsModule } from '@angular/forms';
import { ActorService } from '../actor.service';
import { Configuration } from '../common/config.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchQuery:any;
  showLoading:boolean;
  searchForm:FormGroup;
  cities:String[];
  profileTypes:String[];
  gender:String[];
  constructor(private router:Router,private actorService:ActorService) {
   }

  ngOnInit() {
    let config = new Configuration();
    this.cities=config.cities;
    this.gender=config.gender;
    this.profileTypes=config.profileType;
    this.showLoading=false;
    this.searchForm = new FormGroup({
      profile: new FormControl(),
      gender: new FormControl(),
      location: new FormControl(),
 }); 
  }
  onSearch(){
   console.log(this.searchForm.value);
   this.searchQuery=this.searchForm.value;
   this.actorService.showLoadingScreen(true);
   let call=this.actorService.searchActor(this.searchForm.value);
   if(call){
    this.router.navigate(['/actors']);
   }
  }
}
