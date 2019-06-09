import { HttpHeaders } from "@angular/common/http";
import { ActorService } from "../services/actor.service";
import { AuthenticationService } from "../services/Authentication.service";

export class LoginUtility{
    constructor(){}
    public loginUser(value:any,actorService:ActorService,authService:AuthenticationService) {
    let userCred = value;
    let params = new URLSearchParams();
    params.set('username', userCred.userId);
    params.set('password', userCred.password);
    params.set('grant_type', 'password');
    params.set('client_id', 'clientIdPassword');
    params.set('client_secret', 'secret');
    params.set('scope', 'read');
    let headers = new HttpHeaders().append('Content-type', 'application/x-www-form-urlencoded; charset=utf-8').append('Authorization', 'Basic ' + btoa("clientIdPassword:secret"));
    let options = {
      headers: headers
    };
    actorService.showLoadingScreen(true);
    return authService.loginUser(params, options);
  }

  public setUserName(data: any, authService: AuthenticationService) {
    if (data.userName == "" || !data.userName)
      authService.setLoggedInUser(data.userEmail, data);
    else
      authService.setLoggedInUser(data.userName, data);
  }
}