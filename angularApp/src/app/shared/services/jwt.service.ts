import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class JwtService {

    private token = 'auth_token';

    private jwtHelper: JwtHelper = new JwtHelper();
    constructor() { }

    getToken(): string {
        return localStorage[this.token];
    }

    saveToken(token: string) {
        localStorage[this.token] = token;
    }

    destroyToken() {
        localStorage.removeItem(this.token);
    }

    decodeToken() {
        if(this.getToken())
            return this.jwtHelper.decodeToken(this.getToken())
        return false;
    }

    getTokenExpirationDate() {
        if(this.getToken())
            return this.jwtHelper.getTokenExpirationDate(this.getToken())
        return false;
    }
    
    isTokenExpired() {
        if(this.getToken())
            return this.jwtHelper.isTokenExpired(this.getToken())
        return true;
    }  


}