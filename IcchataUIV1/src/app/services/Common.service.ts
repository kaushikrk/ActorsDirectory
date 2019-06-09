import { AuthenticationService } from "./Authentication.service";
import { ActorService } from "./actor.service";
import { EventEmitter, Injectable } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";
import * as Cookies from 'es-cookie';

@Injectable()
export class CommonService{
    
    public static loadDetails: EventEmitter<any> = new EventEmitter<any>();

    showLoadingScreen(value: boolean) {
        console.log("emitting loading value");
        CommonService.loadDetails.emit(value);
    }
    getAuthHeaders():HttpHeaders {
        if(Cookies.get('localAuthData')){
            let authData = JSON.parse(Cookies.get('localAuthData'));
            if (authData) {
                return new HttpHeaders().append('authorization', 'Bearer ' + authData.access_token);
            } else {
                return new HttpHeaders();
            }
        } else{
            window.location.href="/"
        }
        
    } 
}