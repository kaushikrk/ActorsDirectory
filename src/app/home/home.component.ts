import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl,ReactiveFormsModule } from '@angular/forms';
import { ActorService } from '../actor.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  showLoading:boolean;
  searchForm:FormGroup;
  constructor(private router:Router,private actorService:ActorService) { }

  ngOnInit() {
    this.showLoading=false;
    this.searchForm = new FormGroup({
      profile: new FormControl(),
      gender: new FormControl(),
      location: new FormControl(),
 }); 
  }
  onSearch(){
   console.log(this.searchForm.value);
   this.showLoading=true;
   let call=this.actorService.searchActor(this.searchForm.value);
   if(call){
    this.router.navigate(['/actors']);
    this.showLoading=false;
   }
   
  }
}
