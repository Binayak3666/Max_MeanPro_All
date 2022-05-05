import { Post } from '../model/post.model';
import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
// import { Router } from 'express';
// import { response } from 'express';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private posts: Post[] = [];
  private updatedPost = new Subject<Post[]>();

  constructor(public http: HttpClient, public router: Router) {}

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
              imagePath: post.imagePath
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
  getPost(id: string) {
    return this.http.get<{ _id: string; title: string; content: string,imagePath: string }>(
      'http://localhost:3000/api/posts/' + id
    );
  }
  setPost(title: string, content: string, image: File) {
    // const post = { id: null, title: title, content: content };json can't be taken file upload data so we have to change the process
    const postData = new FormData(); //it is allow us to include text data and blob
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title);
    this.http
      .post('http://localhost:3000/api/posts', postData)
      .subscribe((res) => {
        const post: Post = {
          id: res['post']['id'],
          title: title,
          content: content,
          imagePath:res['post']['imagePath']
        };
        const id = res['postId'];
        post.id = id;
        this.posts.push(post);
        this.updatedPost.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }
  updatePost(id: string, title: string, content: string, image: File | string) {

    // const post = { id: id, title: title, content: content ,imagePath:null};
    let postData: Post | FormData ;
    if(typeof(image) === 'object'){
      postData = new FormData();
      postData.append('id',id)
      postData.append('title',title)
      postData.append('content',content);
      postData.append('image',image,title)
    }else{
       postData = { id: id, title: title, content: content ,imagePath:image};
    }
    console.log("postData--->",postData)
    this.http
      .put('http://localhost:3000/api/posts/' + id, postData)
      .subscribe((response) => {
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex((p) => p.id === id);
        const post : Post = {
          id: id, title: title, content: content ,imagePath:response['imagePath']
        }
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.updatedPost.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }

  deletPost(id) {
    this.http
      .delete('http://localhost:3000/api/posts/' + id)
      .subscribe((res) => {
        const updatedPost = this.posts.filter((post) => post['id'] !== id);
        this.posts = updatedPost;
        this.updatedPost.next([...this.posts]);
      });
  }
}
