import { Injectable, Output, EventEmitter } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { URLConfig } from './URLConfig';

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
    urlConfigs={};

    // Observable string streams
    constructor(private http: HttpClient) {
    }
    getActorsList(): Observable<any> {
    return this.http.get<Actor>(URLConfig.getActors);
    // return this.http.get('../assets/actors.json');
    }
    saveActor(data): Observable<any>{
        return this.http.post(URLConfig.postActor,data);
    }
    postComment(data):Observable<any>{
        return this.http.post('',data);
    }
}
