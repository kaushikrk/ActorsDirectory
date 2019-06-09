import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { URLConfig } from "../URLConfig";
import { Audition } from "../models/Audition";

@Injectable()
export class AuditionService{

  postAuditions(audition: any): any {
    return this.http.post<Audition>(URLConfig.saveAuditions,audition);
  }
    constructor(private http:HttpClient){
        
    }

    getAuditions():any{
        return this.http.get<Audition>(URLConfig.getAuditions);
    }
}