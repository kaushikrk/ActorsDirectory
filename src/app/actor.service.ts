import { Injectable, Output, EventEmitter } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

export interface Actor {
    actorName: string;
    actorAge: Number;
    actorPhoto: string;
    actorGender: string;
    rating: Number;
    actorId: Number;
}
@Injectable()
export class ActorService {

    public loadDetails: EventEmitter<any> = new EventEmitter<any>();
    data = {};

    // Observable string streams
    constructor(private http: HttpClient) {

    }
    getActorsList(): Observable<any> {
    return this.http.get('https://2e49lds24e.execute-api.ap-south-1.amazonaws.com/prod/getAllActors?profileType=Actor');
    // return this.http.get('../assets/actors.json');
    }
    saveActor(data): Observable<any>{
        return this.http.post('https://2e49lds24e.execute-api.ap-south-1.amazonaws.com/prod/saveProfile',data);
    }
    postComment(data):Observable<any>{
        return this.http.post('',data);
    }
}
