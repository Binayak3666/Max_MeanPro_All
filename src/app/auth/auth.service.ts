import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthData } from './auth-data.model';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
 constructor(public http: HttpClient, public router: Router){ }
 createUser(email: string, password:string){
   const authData: AuthData = {email: email, password: password};
   return this.http.post("http://localhost:3000/api/user/signup",authData)
 }
 login(email: string, password:string){
  const authData: AuthData = {email: email, password: password};
   this.http.post("http://localhost:3000/api/user/login",authData)
   .subscribe(response =>{
     console.log(response)
   })
}
}
