import { HomeComponent } from "./Components/home/home.component";
import { ProfileComponent } from "./Components/profile/profile.component";
import { TermsConditionsComponent } from "./Components/terms-conditions/terms-conditions.component";
import { DisclaimerComponent } from "./Components/disclaimer/disclaimer.component";
import { AboutUsComponent } from "./Components/about-us/about-us.component";
import { PrivacyPolicyComponent } from "./Components/privacy-policy/privacy-policy.component";
import { ListComponent } from "./Components/movie/list/list.component";
import { MovieComponent } from "./Components/movie/movie.component";
import { ActorDetailsComponent } from "./Components/actor-details/actor-details.component";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { ActorModule } from "./Components/actor.module";
import { AuthenticationModule } from "./Components/authentication.module";
import { FooterModule } from "./Components/footer.module";
import { ActorComponent } from "./Components/actor/actor.component";
import { LoginComponentComponent } from "./Components/login-component/login-component.component";

const routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {path: 'home',component: HomeComponent},
    {path: 'actor', component: ActorComponent},
    {path: 'details/:actorId', component: ActorDetailsComponent},
    {path: 'photographer', component: ActorComponent},
    {path: 'signup', component: LoginComponentComponent} ,
    {path: 'login', component: LoginComponentComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'terms-and-conditions', component: TermsConditionsComponent},
    {path: 'disclaimer', component: DisclaimerComponent},
    {path: 'about', component: AboutUsComponent},
    {path: 'privacy-policy', component: PrivacyPolicyComponent},
    {path:'plays', component:ListComponent},
    {path:'events', component:ListComponent},
    {path: 'movie/details/:movieId', component: MovieComponent},
    {path: 'play/details/:movieId', component: MovieComponent},
    {path: 'event/details/:movieId', component: MovieComponent},
    { path: '**', component: HomeComponent }
  ];

  @NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [
        RouterModule,
        ActorModule,
        AuthenticationModule,
        FooterModule
     ] 
  })
  export class AppRoutingModule{

  }