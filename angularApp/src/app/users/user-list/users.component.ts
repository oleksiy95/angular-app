import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../../shared';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[];

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(data => {
      console.log('Get users result: ', data);
      this.users = data;
    })
  }

}
