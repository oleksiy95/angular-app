import { Component, OnInit, Input } from '@angular/core';
import { UserService, User } from "../../shared";

@Component({
  selector: 'to-follow',
  templateUrl: './to-follow.component.html',
  styleUrls: ['./to-follow.component.scss']
})
export class ToFollowComponent implements OnInit {
  private users: User[];
  private usersToSuggest: User[];
  @Input() currentUser: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.suggestUsersToFollow(this.currentUser.userId).subscribe(data => {
      this.users = data;
      this.usersToSuggest = this.users.sort(() => 0.5 - Math.random()).slice(0, 3);
    });
  }

  refresh() {
    this.usersToSuggest = this.users.sort(() => 0.5 - Math.random()).slice(0, 3);
  }

  follow(followId) {
    this.userService.followTo(this.currentUser.userId, followId).subscribe(data => {
      this.usersToSuggest = this.usersToSuggest.filter(u => u.userId !== data.userId);
    });
  }


}
