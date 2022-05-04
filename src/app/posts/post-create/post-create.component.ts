import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../model/post.model';
import { PostService } from '../service/post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {
  constructor(public apiService : PostService, public route: ActivatedRoute) { }
  mode = 'create';
  postId:string;
  post:Post;
  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('postId')){
        this.mode = 'edit';
        this.postId = paramMap.get('postId')
        this.post = this.apiService.getPost(this.postId)
      }else{
        this.mode = 'create'
        this.postId = null
      }
    })
  }
  onSavePost(form : NgForm){
    if(form.status == "INVALID"){
      return;
     }
     if(this.mode == "create" ){
      this.apiService.setPost(form.value.title,form.value.content)
     }else{
      this.apiService.updatePost(
        this.postId,
        form.value.title,
        form.value.content
      );
     }
     form.resetForm()

  }
}
