import { Component, OnInit } from '@angular/core';
import {faLock} from '@fortawesome/free-solid-svg-icons'
import { Form, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  isLoading = false
  faLock = faLock;
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }
  onSignUp(formData: NgForm){
    if(formData.invalid){
      return
    }
    this.isLoading = true
    this.authService.createUser(formData.value.email, formData.value.password).subscribe((result)=>{
      console.log(result)
    })
  }
}
