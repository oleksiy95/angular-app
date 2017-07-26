import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Post, User, ModalWindowComponent } from "../../shared/index";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'post-container',
  templateUrl: './post-container.component.html',
  styleUrls: ['./post-container.component.scss']
})
export class PostContainerComponent implements OnInit {
@Input() post: Post;
@Input() user: User;
@Output() onDeletePost = new EventEmitter<number>();
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  deletePost() {
    const modalRef = this.modalService.open(ModalWindowComponent);
    modalRef.componentInstance.content = 'Are you sure you want to delete post?'
    modalRef.result.then(data => {
      if(data) this.onDeletePost.emit(this.post.postId);
    })
  }
}
