import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { HttpModule, XHRBackend, Http } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './home/home.module';
import { AppComponent } from './app.component';
import {
  HeaderComponent,
  FooterComponent,
  ApiService,
  UserService,
  LoginService,
  UserDataService,
  JwtService,
  ModalWindowComponent,
  PostService } from './shared';
import { UsersModule } from './users';
import { AccountModule } from './account';
import { AuthenticatedHttpService } from './authenticate-xhr.backend';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ModalWindowComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    HomeModule,
    UsersModule,
    AccountModule,
  ],
  providers: [
    ApiService,
    UserService,
    LoginService,
    UserDataService,
    JwtService,
    PostService,
    {
      provide: Http,
      useClass: AuthenticatedHttpService
    }
  ],
  entryComponents: [ModalWindowComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router) {
    console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
 }
