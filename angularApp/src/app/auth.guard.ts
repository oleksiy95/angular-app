import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { LoginService } from './shared/index';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private login: LoginService,private router: Router) {}

  canActivate() {

    if(!this.login.isLoggedIn())
    {
       this.router.navigate(['/login']);
       return false;
    }

    return true;
  }
}