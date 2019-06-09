import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActorService } from '../../services/actor.service';
import { Configuration } from '../common/config.component';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  plays: any;
  photographers: any = ['1544349932236',
    '1544351831554',
    '1544710409094',
    '1544723888405',
    '1544759577063',
    '1544807890973',
    '1544808434179',
    '1546402448669'];
  
  items: any;
  searchQuery: any;
  showLoading: boolean;
  searchForm: FormGroup;
  cities: String[];
  profileTypes: String[];
  gender: String[];
  constructor(private router: Router, private actorService: ActorService, private movieService: MovieService) {
  }

  ngOnInit() {
    let config = new Configuration();
    this.profileTypes = config.profileType;
    this.cities = config.cities;
    this.showLoading = false;
    this.searchForm = new FormGroup({
      profileType: new FormControl(""),
      location: new FormControl("")
    });
  }
  onSearch(profile: any, city:any) {
    this.actorService.searchActorsFromHomePage(profile,city);
    this.router.navigate([profile])   
  }
}
