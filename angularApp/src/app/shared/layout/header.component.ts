import { Component, OnInit } from '@angular/core';
import { LoginService, UserDataService } from '../services';
import { Subscription } from "rxjs/Subscription";
import { User } from "../index";

@Component({
    selector: 'layout-header',
    templateUrl: './header.component.html',
    providers: [],
})

export class HeaderComponent implements OnInit {
    constructor(private login: LoginService, private userDataService: UserDataService) { }

    status: boolean;
    subscription: Subscription;
    currentUser: User;

    ngOnInit() {
        this.subscription = this.login.authNavStatus$.subscribe(status => this.status = status);
        this.userDataService.currentUser.subscribe(userData => {
            this.currentUser = userData
        });
    }
    ngOnDestroy() {
        // prevent memory leak when component is destroyed
        this.subscription.unsubscribe();
    }

    logout() {
        this.login.logout();
    }
}