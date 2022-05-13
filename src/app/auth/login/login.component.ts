import { Component, OnInit } from '@angular/core';
import {faLock} from '@fortawesome/free-solid-svg-icons'
import { Form, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading = false
  faLock = faLock;
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }
  onSubmit(formData: NgForm){
    if(formData.invalid){
      return
    }
    this.isLoading = true
    this.authService.login(formData.value.email, formData.value.password)
  }
}
