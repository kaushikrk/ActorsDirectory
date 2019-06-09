import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { URLConfig } from "../URLConfig";
import { ActorService } from "./actor.service";
import { CommonService } from "./Common.service";
import * as Cookies from 'es-cookie';
import { Router } from "@angular/router";
import { Observable } from "rxjs";
declare const gapi: any;

@Injectable()
export class AuthenticationService extends CommonService {


    googleProfile: any;
    googleUser: any;
    userName: any;
    appUser: any;
    userLoggedIn: any;
    loginEvent: EventEmitter<any> = new EventEmitter<any>();
    constructor(private http: HttpClient, private commonService: CommonService, private router: Router) {
        super();
        let localAuthCookie = Cookies.get('localAuthData');
        if (localAuthCookie) {
            let localAuth = JSON.parse(localAuthCookie);
            if (localAuth && !localAuth.googleUser) {
                this.appUser = true;
                this.googleUser = false;
                this.userLoggedIn = true;
            } else if (localAuth && localAuth.googleUser) {
                this.googleUser = true;
                this.appUser = false;
                this.userLoggedIn = true;
            }
        } else {
            this.userLoggedIn = false;
        }
    }

    loginUser(params: URLSearchParams, options: any): Observable<any> {
        return this.http.post(URLConfig.loginUrl, params.toString(), options);
    }
    isUserLoggedIn() {
        return this.userLoggedIn;
    }
    getLoggedInUserName() {
        return Cookies.get('userName');
    }
    setLoggedInUser(userName: string, data: any): any {
        this.appUser = true;
        this.userLoggedIn = true;
        this.userName = userName;
        if (!userName) {
            userName = "New User";
        }
        if (data.googleUser) {
            Cookies.set('googleUser', "true", { expires: 0.05 });
        }
        Cookies.set('localAuthData', JSON.stringify(data), { expires: 0.05 });
        Cookies.set('userName', userName, { expires: 0.05 });
        this.loginEvent.emit(userName);
        setTimeout(() => {
            this.removeToken();
        }, 3600 * 1000)
        this.showLoadingScreen(false);
    }
    private removeToken() {
        Cookies.remove('userName');
        Cookies.remove('localAuthData');
    }

    logoutAppUser() {
        let me = this;
        this.removeToken();
        this.removeGoogleToken();
        window.location.href = "/";
    }
    googleLogin(googleProfile, token) {
        this.googleUser = true;
        this.userLoggedIn = true;
        this.googleProfile = googleProfile;
        Cookies.set('googleProfile', JSON.stringify(googleProfile));
        Cookies.set('userName', googleProfile.name);
        Cookies.set('googleAuth', token);
        setTimeout(() => {
            this.removeGoogleToken();
        }, 3600 * 1000)
    }
    private removeGoogleToken() {
        Cookies.remove('googleProfile');
        Cookies.remove('googleAuth');
        Cookies.remove('userName');
    }
    getGoogleSpecificCommonCredentials(): URLSearchParams {
        let params = new URLSearchParams();
        params.set('username', '1522599217643');
        params.set('password', 'sens!tiveP@ss');
        params.set('grant_type', 'password');
        params.set('client_id', 'clientIdPassword');
        params.set('client_secret', 'secret');
        params.set('scope', 'read');
        return params;
    }
    public getUserDetails() {
        let localAuthCookie = Cookies.get('localAuthData');
        if (localAuthCookie) {
            let localAuth = JSON.parse(localAuthCookie);
            return localAuth;
        } else {
            return {};
        }
    }
    public getActorId() {
        let authData = JSON.parse(Cookies.get('localAuthData'));
        let actorId = authData.userId;
        return actorId;
    }
}