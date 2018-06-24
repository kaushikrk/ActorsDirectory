import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";

@Injectable()
export class AuditionService {

    constructor(public http:HttpClient){
    }

    getAuditions(): Observable<any> {
      return this.http.get('https://2e49lds24e.execute-api.ap-south-1.amazonaws.com/prod/auditions');
    }
    postAuditions(data): Observable<any> {
        return this.http.post('https://2e49lds24e.execute-api.ap-south-1.amazonaws.com/prod/auditions',data);
    }
}