import { Component, OnInit } from '@angular/core';
declare var FB;

@Component({
  selector: 'app-fblogin',
  templateUrl: './fblogin.component.html',
  styleUrls: ['./fblogin.component.css']
})
export class FbloginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    (window as any).fbAsyncInit = function() {
      FB.init({
        appId      : '394951114363257',
        cookie     : true,
        xfbml      : true,
        version    : 'v3.2'
      });
      FB.AppEvents.logPageView();
    };

    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "https://connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));


  }
  submitLogin(){
    console.log("submit login to facebook");
    // FB.login();
    FB.login((response)=>
        {
          if (response.authResponse)
          {
            FB.api('/me?fields=picture,first_name',response.authResponse.access_token, function(response) {
              console.log(response);
              console.log('Successful login for: ' + response.name);
            });
            FB.api('/email',response.authResponse.access_token, function(response) {
              console.log(response);
              console.log('Successful login for: ' + response.name);
            });
           }
           else
           {
           console.log('User login failed');
         }
      },{scope:'public_profile,email,user_location'});

  }

}
