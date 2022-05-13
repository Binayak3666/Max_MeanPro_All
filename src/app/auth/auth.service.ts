import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private isAuthonticated = false
  private token: string;
  private authStatusListener = new Subject<boolean>();

  constructor(public http: HttpClient, public router: Router) { }

  getToken() {
    return this.token;
  }
  getIsAuth() {
    return this.isAuthonticated;
  }
  getAuthStatusListener() {
    return this.authStatusListener.asObservable()
  }

  createUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    return this.http.post("http://localhost:3000/api/user/signup", authData)
  }
  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http.post<{ token: string }>("http://localhost:3000/api/user/login", authData)
      .subscribe(response => {
        const token = response.token;
        this.token = token
        if (token) {
          this.isAuthonticated = true
          this.authStatusListener.next(true);
          this.router.navigate(['/'])
        }
      })
  }
  logout(){
    this.token = null
    this.isAuthonticated = false ;
    this.authStatusListener.next(false);
    this.router.navigate(['/'])
  }
}
