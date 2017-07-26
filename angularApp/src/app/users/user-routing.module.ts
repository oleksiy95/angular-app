import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './user-list/users.component';
import { UserPostsComponent } from './user-posts/user-posts.component';

const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'userPosts/:id', component: UserPostsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }