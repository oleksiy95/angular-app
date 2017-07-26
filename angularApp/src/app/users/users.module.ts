import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './user-list/users.component';
import { UsersRoutingModule } from './user-routing.module';
import { UserCardComponent } from './user-list/user-card/user-card.component';
import { UserPostsComponent } from './user-posts/user-posts.component'

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule
  ],
  declarations: [UsersComponent, UserCardComponent, UserPostsComponent]
})
export class UsersModule { }
