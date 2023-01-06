import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../Model/login.model';
import jwt_decode from 'jwt-decode';
import { SignupDetail } from '../Model/signup-detail.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http:HttpClient) { }

  userLogin(login:Login){
    return this.http.post<Login>('https://localhost:7026/api/Signup/Login',login);
  }

  userRegister(registerReq:SignupDetail){

    return this.http.post<SignupDetail>('https://localhost:7026/api/Signup/Register',registerReq);
  }
}
