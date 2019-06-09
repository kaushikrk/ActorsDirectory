import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpRequest } from '@angular/common/http';
import { URLConfig } from '../URLConfig';
import { ActorModel } from '../Actor.model';
import { OMDBResponse } from '../models/OMDBResponse';
import { AuthenticationService } from './Authentication.service';
import { CommonService } from './Common.service';
import * as Cookies from 'es-cookie'
import { Observable, forkJoin } from 'rxjs';
export interface Result {
    success: boolean;
    failure: boolean;
    items: ActorModel[];
    uniqueResult: ActorModel;
}


@Injectable()
export class ActorService extends CommonService {


  searchActorsFromHomePage(profile:any,city:any): any {
    this.cachedQuery={profileType:profile,actorLocation:city};
  }
  getProfile(actorId: any): any {
    return this.http.get<Result>(URLConfig.getProfile + "/" + parseInt(actorId));
  }
  sendAuditionCall(msg:any): any {
    return this.http.post(URLConfig.auditionCall,msg);
  }
  googleReferral(user: any): any {
    return this.http.post(URLConfig.googleReferral, user);
  }
    updatePassword(newPassword: any): Observable<any> {
        let auth = JSON.parse(Cookies.get('localAuthData'));
        if(!auth || !auth.access_token){
         window.location.href='/'
        }
        let authHeaders = new HttpHeaders().append('authorization', 'Bearer ' + auth.access_token)
        .append('Credentials', btoa(newPassword+':'+auth.userId));
        return this.http.post(URLConfig.getHostName() + '/user/changeCredentials', {},
            { headers: authHeaders }
        );
    }
    actorDetails: any;
    googleProfile: any;
    userName: String;
    googleUser: boolean;
    userLoggedIn: boolean;
    appUser: boolean;
    constructor(private http: HttpClient, private authService: AuthenticationService) {
        super();
        // this.cachedQuery = {};

    }
    public detailsEmitter: EventEmitter<any> = new EventEmitter<any>();
    postPhotos(files: any, userId: any): Observable<any> {
        let formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append("files", files[i]);
        }

        formData.append("userId", userId);
        //  const req = new HttpRequest('POST', URLConfig.postPhotos+"?userId="+userId, formData);
        return this.http.post<Result>(URLConfig.postPhotos + "/" + userId, formData);
    }
    getComments(actorId: any): Observable<any> {
        return this.http.get(URLConfig.getCommentsURL(actorId))
    }
    submitComment(comment: any): any {
        return this.http.post(URLConfig.postComments, comment);
    }
    getActor(actorId: any): Observable<any> {
        return this.http.get<Result>(URLConfig.getActors + "/" + parseInt(actorId));
    }
    getMovieDetailsFromOmdb(movies: any): Observable<any> {
        if (movies && movies.length > 0) {
            let movieRequests = [];
            movies.forEach(element => {
                movieRequests.push(this.http.get<OMDBResponse>("https://www.omdbapi.com/?apikey=c01f9765&t=" + element));
            });
            return forkJoin(movieRequests);
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
    // Observable string streams
    getActorsList(profileType:String): Observable<any> {
            return this.http.get<Result>(URLConfig.getActors+"/type/"+profileType);
    }
    searchActors(query: any) {
        console.log("Calling actor service");
        return this.http.get<Result>(URLConfig.searchActors,{params:query})
    }
    saveActor(data): Observable<any> {
        // data.encodedContactNumber = btoa(data.actorContactNumber);
        // data.actorContactNumber = 0;
        return this.http.post(URLConfig.postActor, data);
    }
    updateActor(data): Observable<any> {
        data.encodedContactNumber = btoa(data.actorContactNumber);
        return this.http.put(URLConfig.updateActor, data,{headers:this.getAuthHeaders()});
    }
    postComment(data): Observable<any> {
        return this.http.post('', data);
    }

}
