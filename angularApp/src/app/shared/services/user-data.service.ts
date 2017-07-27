import { Injectable } from '@angular/core';
import { UserService } from "./user.service";
import { JwtService } from "./jwt.service";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { UserStaticData } from "../index";
import { Observable } from "rxjs/Rx";
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UserDataService {
    //private currentUser: User;
    private currentUserIdentityId;

    private currentUserSubject = new BehaviorSubject<UserStaticData>(new UserStaticData());
    public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();
    constructor(private userService: UserService, private jwt: JwtService) {
        this.currentUserSubject.next(this.getCurrentUser());
    }

    setCurrentUser(user: UserStaticData) {
        localStorage.setItem('current_user', JSON.stringify(user));
        this.currentUserSubject.next(user);

    }

    getCurrentUser(): UserStaticData {
        return JSON.parse(localStorage.getItem('current_user'));
    }

    removeCurrentUser() {
        localStorage.removeItem('current_user');
        this.currentUserSubject.next(new UserStaticData());
    }
}