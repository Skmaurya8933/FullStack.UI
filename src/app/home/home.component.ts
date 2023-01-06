import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from '../appService/account.service';
import { Login } from '../Model/login.model';
import { RegisterComponent } from '../register/register.component';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  token:any;
  loginform:any
  login:any;



constructor(private matdialog:MatDialog,private formbuilder:FormBuilder,private accountService:AccountService,
  private router:Router,private toastr:ToastrService){
  this.loginform = this.formbuilder.group({
    Username: ['',[Validators.required]],
    Password: ['',[Validators.required]]
  })
}

ngOnInit(){

}

onSubmit(){
this.login=this.loginform.value;
this.onLogin(this.login);
}

onLogin(loginData:Login){
this.accountService.userLogin(loginData).subscribe({
  next:(res:any)=>{
   this.token=res.data.token;
   localStorage.setItem('token',this.token);
   this.router.navigateByUrl('/header');
   this.toastr.success('Login success!','Login');
  },
  error:()=>{
    this.toastr.error('Invalid username or password','Login');
  }
})
}
  OpenPopup(){
   this.matdialog.open(RegisterComponent)
  }

}


