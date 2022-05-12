import { Component, OnInit } from '@angular/core';
import {faLock} from '@fortawesome/free-solid-svg-icons'
import { Form, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading = false
  faLock = faLock;
  constructor() { }

  ngOnInit(): void {
  }
  onSubmit(formData: NgForm){
    if(formData.invalid){
      return
    }
    console.log(formData)
  }
}
