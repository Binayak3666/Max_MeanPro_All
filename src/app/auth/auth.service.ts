import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthData } from './auth-data.model';

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  private token: string;
 constructor(public http: HttpClient, public router: Router){ }

 getToken(){
   return this.token;
 }

 createUser(email: string, password:string){
   const authData: AuthData = {email: email, password: password};
   return this.http.post("http://localhost:3000/api/user/signup",authData)
 }
 login(email: string, password:string){
  const authData: AuthData = {email: email, password: password};
   this.http.post<{token: string}>("http://localhost:3000/api/user/login",authData)
   .subscribe(response =>{
      const token = response.token;
      this.token = token
  })
}
}
