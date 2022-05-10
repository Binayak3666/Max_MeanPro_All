import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {faLock} from '@fortawesome/free-solid-svg-icons'

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
  onSubmit(){}
  loginForm = new FormGroup ({
    email: new FormControl(''),
    password: new FormControl('')
  })
}
