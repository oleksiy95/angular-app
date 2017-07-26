import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';
import { User, Credentials, StaticData } from '../models';
import { Router } from "@angular/router";
import { JwtService } from "./jwt.service";
import { UserDataService } from "./user-data.service";
import { Subject } from "rxjs/Subject";

@Injectable()
export class LoginService {
    // Observable navItem source
    private _authNavStatusSource = new BehaviorSubject<boolean>(false);
    // Observable navItem stream
    authNavStatus$ = this._authNavStatusSource.asObservable();

    // private currentUserSubject = new BehaviorSubject<User>(new User());
    // public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();

    constructor(
        private apiService: ApiService, 
        private router: Router, 
        private jwt: JwtService,
        private userDataService: UserDataService
    ) {
        this._authNavStatusSource.next(!this.jwt.isTokenExpired());
    }

    register(user: User): Observable<boolean> {
        return this.apiService.post('/accounts', user)
    }

    login(user: Credentials): Observable<boolean> {
        let subject = new Subject<boolean>();
        this.apiService.post('/auth', user)
            .subscribe(data => {
                this.jwt.saveToken(data.auth_token)
                this._authNavStatusSource.next(true);
                this.userDataService.setCurrentUser().subscribe(data => {
                    subject.next(data);
                });
            });
        return subject.asObservable();                  
    }   

    logout() {
        this.jwt.destroyToken();
        this._authNavStatusSource.next(false);
        this.userDataService.removeCurrentUser();
        this.router.navigate(['/login']);
    }

    isLoggedIn() {
        return this._authNavStatusSource.getValue();
    }
}