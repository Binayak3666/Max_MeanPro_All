import { Component, Input, OnInit,OnDestroy } from '@angular/core';
import { Post } from './../model/post.model';
import { PostService } from '../service/post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post [] = [];
  postSubscription :Subscription
  constructor(public apiService :PostService) { }

  ngOnInit(): void {
    this.apiService.getData()
    this.postSubscription = this.apiService.getPostUpdateListener().subscribe((post:Post[])=>{
         this.posts = post
    })
  }
  ngOnDestroy(){
    this.postSubscription.unsubscribe();
  }
  onDelete(resevedId){
    console.log(resevedId)
    this.apiService.deletPost(resevedId)
  }

}
