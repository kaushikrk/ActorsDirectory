import { Injectable, Output, EventEmitter } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { URLConfig } from './URLConfig';
import { ActorModel } from './Actor.model';

export interface Result {
    Items:ActorModel[];
}
const headers = new HttpHeaders({
    "Accept": "application/json",
    "Content-Type": "application/json"
});
@Injectable()
export class ActorService {

    public loadDetails: EventEmitter<any> = new EventEmitter<any>();
    data = {};
    urlConfigs={};
    cachedList:any;
    cachedQuery:any;
    getActorSearchResult(){
        return this.cachedList;
    }
    // Observable string streams
    constructor(private http: HttpClient) {
        this.cachedQuery={};
    }
    getActorsList(): Observable<any> {
    return this.http.get<Result>(URLConfig.getActors,{"params":this.cachedQuery});
    // return this.http.get('../assets/actors.json');
    }
    async searchActor(query:any){
        console.log("Calling actor service");
        this.cachedQuery=query;
    }
    saveActor(data): Observable<any>{
        return this.http.post(URLConfig.postActor,data);
    }
    postComment(data):Observable<any>{
        return this.http.post('',data);
    }
}
