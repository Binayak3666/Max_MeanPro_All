import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { mineType } from './mine-type.validator';
import { Post } from '../model/post.model';
import { PostService } from '../service/post.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent implements OnInit, OnDestroy {
  constructor(public apiService: PostService, public route: ActivatedRoute,private authService: AuthService) {}
  mode = 'create';
  postId: string;
  post: Post;
  isLoading = false;
  form: FormGroup;
  private authStatusSub: Subscription;

  ngOnInit(): void {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(()=>{
      this.isLoading = false;
    })
    this.form = new FormGroup({
      title: new FormControl(null, { validators: [Validators.required] }),
      content: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mineType],
      }),
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.apiService.getPost(this.postId).subscribe((response) => {
          this.isLoading = false;
          this.post = {
            id: response['id'],
            title: response['title'],
            content: response['content'],
            imagePath: response['imagePath'],
            creator: response['creator']
          };
          this.form.setValue({
            title: this.post.title,
            content: this.post.content,
            image: this.post.imagePath
          });
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }
  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }
  onSavePost() {
    if (this.form.status == 'INVALID') {
      return;
    }
    this.isLoading = true;
    if (this.mode == 'create') {
      this.apiService.setPost(
        this.form.value.title,
        this.form.value.content,
        this.form.value.image
      );
    } else {
      this.apiService.updatePost(
        this.postId,
        this.form.value.title,
        this.form.value.content,
        this.form.value.image
      );
    }
    this.form.reset();
  }

  imagePreview: string;
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
