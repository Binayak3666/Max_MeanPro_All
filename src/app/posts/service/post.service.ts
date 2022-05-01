import { Post } from '../model/post.model';
import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
// import { response } from 'express';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private posts: Post[] = [];
  private updatedPost = new Subject<Post[]>();

  constructor(public http: HttpClient) {}

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
  setPost(title: string, content: string) {
    const post = { id: null, title: title, content: content };
    this.http.post('http://localhost:3000/api/posts', post).subscribe((res) => {
      // console.log(res)
      this.posts.push(post);
      this.updatedPost.next([...this.posts]);
    });
  }
}
