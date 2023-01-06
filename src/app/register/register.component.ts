import { Component,Inject,OnInit } from '@angular/core';
import {FormControl, Validators,FormGroup,FormBuilder} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../appService/account.service';
import { SignupDetail } from '../Model/signup-detail.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  signupform:any;
  signup:any

constructor(private formbuilder:FormBuilder,private dialogRefe:MatDialogRef<RegisterComponent>,
  private toastr:ToastrService, private apisignupService:AccountService){


}

ngOnInit(){
    this.signupform = this.formbuilder.group({
    FirstName: ['',[Validators.required,Validators.minLength(3)]],
    LastName: ['',[Validators.required,Validators.minLength(3)]],
    Username: ['',[Validators.required,Validators.minLength(3)]],
    Useremail: ['',[Validators.required,Validators.email]],
    Userphone: ['',[Validators.required,Validators.minLength(10)]],
    Password: ['',[Validators.required,Validators.minLength(6),Validators.maxLength(20)]],

  })

}


  onsubmit(){
    this.signup=this.signupform.value;
     this.RegisterUser(this.signup);
  }

  RegisterUser(register:SignupDetail){
    debugger
    if(this.signupform.valid){
      this.apisignupService.userRegister(register).subscribe({
        next:(res)=>{
          Swal.fire("Welcome!",'You are Registered Successfully.','success')
          this.signupform.reset();
          this.dialogRefe.close('save');
        },
        error:()=>{
          this.toastr.error('Error while register user!','Register');
        }
      })
    }
  }

  formReset(){
     this.signupform.reset();
  }

}
