import { Component, OnInit } from '@angular/core';
import { JwtService, UserDataService } from "./shared/index";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(
    private userDataService: UserDataService,
    private jwt: JwtService
  ) { }

  ngOnInit() {
    if(this.jwt.isTokenExpired()) {
      this.jwt.destroyToken();
      this.userDataService.removeCurrentUser();
    }
  }

}
