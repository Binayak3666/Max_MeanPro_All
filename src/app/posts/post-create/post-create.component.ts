import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from '../model/post.model';
import { PostService } from '../service/post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {
  constructor(public apiService : PostService) { }
  ngOnInit(): void {
  }
  onAddPost(form : NgForm){
    if(form.status == "INVALID"){
      return;
     }
    this.apiService.setPost(form.value.title,form.value.content)
    form.resetForm()
  }
}
