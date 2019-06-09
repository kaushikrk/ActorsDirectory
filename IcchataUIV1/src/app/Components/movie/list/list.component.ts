import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../../services/movie.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  redirectURLPattern: string;
  listingType: any;
  movieList: any;
  constructor(private movieService: MovieService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.url.subscribe(data => { this.listingType = data[0].path });
    switch (this.listingType) {
      case "movies": {
        this.redirectURLPattern = "/movie/details"
        this.movieService.getLatestMovies().subscribe(data => {
          console.log(data);
          if (data.items)
            this.movieList = data.items;
        }, err => { console.log(err) })
        break;
      }
      case "plays": {
        this.redirectURLPattern = "/play/details"
        this.movieService.getLatestPlays().subscribe(data => {
          console.log(data);
          if (data.items)
            this.movieList = data.items;
        }, err => { console.log(err) })
        break;
      }
      case "events": {
        this.redirectURLPattern = "/event/details"
        this.movieService.getLatestEvents().subscribe(data => {
          console.log(data);
          if (data.items)
            this.movieList = data.items;
        }, err => { console.log(err) })
        break;
      }
    }
  }
  showMovieDetails(movie: any) {
  }

}
