import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { URLConfig } from "../URLConfig";

@Injectable()
export class MovieService {


  getLatestEvents(): any {
    return this.http.get<any>(URLConfig.listEvents);
  }
  getLatestPlays(): any {
    return this.http.get<any>(URLConfig.listPlays);
  }
    movieDetail: any;
    constructor(private http: HttpClient) {
    }
    getLatestMovies() {
        return this.http.get<any>(URLConfig.listMovies);
    }
    getMovieDetails(movieId) {
        return this.http.get<any>(URLConfig.movieDetail + movieId);
    }
    postReviews(userReview: any) {
        return this.http.post<any>(URLConfig.saveReview, userReview);
    }
    getReviews(movieId: any): any {
        return this.http.get<any>(URLConfig.saveReview+"/"+movieId);
    }
    postRatings(userRating: any) {
        return this.http.post<any>(URLConfig.saveRating, userRating);
    }
    getRatings(movieId: any) {
        return this.http.get<any>(URLConfig.getRating+"/"+movieId+"/rate");
    }
}