import { Component, OnInit } from '@angular/core';
import { JwtService, UserStaticData, UserDataService, Post, UserService, PostService } from "../shared/index";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUser: UserStaticData;
  posts: Post[];
  post: Post = new Post();
  postForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private jwt: JwtService,
    private userDataService: UserDataService,
    private userService: UserService,
    private postService: PostService,
  ) { }

  ngOnInit() {
    this.currentUser = this.userDataService.getCurrentUser();
    if (this.currentUser.userId)
      this.userService.getUserPosts(this.currentUser.userId).subscribe(data => {
        this.posts = data;
      })
    this.buildForm();
  }

  buildForm() {
    this.postForm = this.fb.group({
      "content": [this.post.content, [
        Validators.required,
      ]],      
    });
  }

  makePost() {
    this.userService.makePost(this.currentUser.userId, this.postForm.value)
      .subscribe(data => {
        this.posts.unshift(data);
        this.postForm.reset();
      })
  }

  deletePost(id: number){
    this.postService.deletePost(id).subscribe(data => {
      this.posts = this.posts.filter(p => p.postId !== id);
    })
  }

}
