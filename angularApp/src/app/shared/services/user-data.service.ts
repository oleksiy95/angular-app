import { Injectable } from '@angular/core';
import { UserService } from "./user.service";
import { JwtService } from "./jwt.service";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { User } from "../index";
import { Observable } from "rxjs/Rx";
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UserDataService {
    //private currentUser: User;
    private currentUserIdentityId;

    private currentUserSubject = new BehaviorSubject<User>(new User());
    public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();
    constructor(private userService: UserService, private jwt: JwtService) {
        this.currentUserSubject.next(this.getCurrentUser());
    }

    setCurrentUser(): Observable<boolean>{
        this.currentUserIdentityId = this.jwt.decodeToken().id;        
        return this.userService.getUser(this.currentUserIdentityId).map(data => {
            localStorage.setItem('current_user', JSON.stringify(data));
            this.currentUserSubject.next(data);
            return true;
        });
    }

    getCurrentUser(): User {
        return JSON.parse(localStorage.getItem('current_user'));
    }

    removeCurrentUser() {
        localStorage.removeItem('current_user');
        this.currentUserSubject.next(new User());
    }
}