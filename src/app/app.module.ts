import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule} from 'primeng/fileupload'
import { AppComponent } from './app.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ActorComponent } from './actor/actor.component';
import { ActorDetailsComponent } from './actor-details/actor-details.component';
import { ActorService } from './actor.service';
import { RegisterPageComponent } from './register-page/register-page.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { AuditionpageComponent } from './Auditions/auditionpage/auditionpage.component';
import { AuditionFormComponent } from './Auditions/audition-form/audition-form.component';
import { AuditionService } from './audition.service';
import { MessageScreenComponent } from './message-screen/message-screen.component';
import {RatingModule} from 'primeng/rating';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { PhotographerComponent } from './photographer/photographer.component';
import { HomeComponent } from './home/home.component';
import { LatestComponent } from './latest/latest.component';
const routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'home', component: HomeComponent},
  {path: 'actors', component: ActorComponent},
  {path: 'auditions', component: AuditionpageComponent},
  {path: 'actor-details/:actorId', component: ActorDetailsComponent},
  {path: 'signup', component: RegisterPageComponent} ,
  {path: 'login', component: LoginComponentComponent},
  {path: 'photographers', component: PhotographerComponent},
  {path: 'latest', component: LatestComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    MenuBarComponent,
    ActorComponent,
    PhotographerComponent,
    ActorDetailsComponent,
    RegisterPageComponent,
    LoginComponentComponent,
    AuditionpageComponent,
    AuditionFormComponent,
    MessageScreenComponent,
    HomeComponent,
    LatestComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FileUploadModule,
    RatingModule,
    InputTextareaModule
  ],
  providers: [ActorService,AuditionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
