import { BrowserModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule} from 'primeng/fileupload'
import {CarouselModule} from 'primeng/carousel';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ActorService } from './services/actor.service';
import { MessageScreenComponent } from './Components/message-screen/message-screen.component';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { HomeComponent } from './Components/home/home.component';
import { FieldValidatorDirective } from './Directives/field-validator.directive';
import { RequestInterceptor } from './RequestInterceptor';
import { AuthenticationService } from './services/Authentication.service';
import { CommonService } from './services/Common.service';
import { ProfileComponent } from './Components/profile/profile.component';
import { ContactFormComponent } from './Components/profile/contact-form/contact-form.component';
import { SecurityFormComponent } from './Components/profile/security-form/security-form.component';
import { CommentComponent } from './Components/comment/comment.component';
import { FbloginComponent } from './Components/fblogin/fblogin.component';
import { ServicesComponent } from './Components/home/services/services.component';
import { MovieComponent } from './Components/movie/movie.component';
import { MovieService } from './services/movie.service';
import { ListComponent } from './Components/movie/list/list.component';
import { SeoService } from './services/SeoService';
import { AuditionService } from './services/AuditionService';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { AppRoutingModule } from './routes';
import { AuditionFormComponent } from './Auditions/audition-form/audition-form.component';
import { AuditionpageComponent } from './Auditions/auditionpage/auditionpage.component';
import { PackageDetailsComponent } from './Components/profile/package-details/package-details.component';
// import { StoreModule } from '@ngrx/store';
// import { addCoinReducer } from './reducers/UserReducer';

@NgModule({
  declarations: [
    AppComponent,
    PackageDetailsComponent,
    MessageScreenComponent,
    HomeComponent,
    FieldValidatorDirective,
    ProfileComponent,
    ContactFormComponent,
    SecurityFormComponent,
    FbloginComponent,
    ServicesComponent,
    MovieComponent,
    ListComponent,
    AuditionFormComponent,
    AuditionpageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    FileUploadModule,
    InputTextareaModule,
    CarouselModule,
    NgbModule.forRoot(),
    // StoreModule.forRoot({login:addCoinReducer})
  ],
  providers: [
    ActorService,
    MovieService,
    SeoService,
    AuditionService,
    AuthenticationService,
    CommonService
    ,{
    provide: HTTP_INTERCEPTORS,
    useClass: RequestInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
