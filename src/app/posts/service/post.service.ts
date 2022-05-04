import { Post } from '../model/post.model';
import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
// import { Router } from 'express';
// import { response } from 'express';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private posts: Post[] = [];
  private updatedPost = new Subject<Post[]>();

  constructor(public http: HttpClient,public router:Router) {}

  getData() {
    this.http
      .get<{ message: string; posts: any }>('http://localhost:3000/api/posts')
      .pipe(
        map((postData) => {
          return postData.posts.map((post) => {
            return {
              title: post.title,
              content: post.content,
              id: post._id,
            };
          });
        })
      )
      .subscribe((transformPosts) => {
        this.posts = transformPosts;
        this.updatedPost.next([...this.posts]);
      });
  }
  getPostUpdateListener() {
    return this.updatedPost.asObservable();
  }
  getPost(id: string){
    return this.http.get<{ _id: string; title: string; content: string }>(
      "http://localhost:3000/api/posts/" + id
    );
  }
  setPost(title: string, content: string) {
    const post = { id: null, title: title, content: content };
    this.http.post('http://localhost:3000/api/posts', post).subscribe((res) => {
      const id = res['postId'];
      post.id = id;
      this.posts.push(post);
      this.updatedPost.next([...this.posts]);
    });
  }
  updatePost(id:string, title:string, content:string){
    const post = {id: id, title: title, content: content }
    this.http.put('http://localhost:3000/api/posts/'+id, post).subscribe((response)=>{
      const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.updatedPost.next([...this.posts]);
        this.router.navigate(["/"]);
    })
  }

  deletPost(id){
    this.http.delete('http://localhost:3000/api/posts/'+id).subscribe((res)=>{
      const updatedPost = this.posts.filter(post => post["id"] !== id);
      this.posts = updatedPost;
      this.updatedPost.next([...this.posts])
    })
  }
}
