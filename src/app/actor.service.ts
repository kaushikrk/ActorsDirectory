import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { URLConfig } from './URLConfig';
import { ActorModel } from './Actor.model';
import { OMDBResponse } from './models/OMDBResponse';
import { Observable } from 'rxjs';

export interface Result {
    Items: ActorModel[];
}
const headers = new HttpHeaders({
    "Accept": "application/json",
    "Content-Type": "application/json"
});
@Injectable()
export class ActorService {

    getComments(actorId: any): Observable<any> {
        return this.http.get(URLConfig.getCommentsURL(actorId))
    }
    submitComment(comment: any): any {
        return this.http.post(URLConfig.comments, comment);
    }
    getActor(actorId: any): Observable<any> {
        return this.http.get(URLConfig.getActors + "/" + parseInt(actorId));
    }
    getMovieDetailsFromOmdb(movies: any): Observable<any> {
        if (movies && movies.length > 0) {
            let movieRequests = [];
            movies.forEach(element => {
                movieRequests.push(this.http.get<OMDBResponse>("http://www.omdbapi.com/?apikey=BanMePlz&t=" + element));
            });
            return Observable.forkJoin(movieRequests);
        }
    }
    queryChange: boolean;
    public loadDetails: EventEmitter<any> = new EventEmitter<any>();
    data = {};
    urlConfigs = {};
    cachedList: any;
    cachedQuery: any;
    getActorSearchResult() {
        return this.cachedList;
    }
    showLoadingScreen(value: boolean) {
        console.log("emitting loading value");
        this.loadDetails.emit(value);
    }
    // Observable string streams
    constructor(private http: HttpClient) {
        this.cachedQuery = {};
    }
    getActorsList(): Observable<any> {
        if (!this.cachedList || this.queryChange)
            return this.http.get<Result>(URLConfig.getActors, { "params": this.cachedQuery });
        // return this.http.get('../assets/actors.json');
    }
    async searchActor(query: any) {
        console.log("Calling actor service");
        this.queryChange = true;
        this.cachedQuery = query;
    }
    saveActor(data): Observable<any> {
        return this.http.post(URLConfig.postActor, data);
    }
    postComment(data): Observable<any> {
        return this.http.post('', data);
    }
}
