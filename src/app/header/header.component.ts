import { Component,Input,OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { AccountService } from '../appService/account.service';
import Swal from 'sweetalert2'
import { ToastrService } from 'ngx-toastr';
import { MatSidenav } from '@angular/material/sidenav';
import {BreakpointObserver} from '@angular/cdk/layout'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 token:any;
 isLogout!:boolean;

 token_:any;
 userdata:any;
 username:any;
 @ViewChild(MatSidenav) sidenav!:MatSidenav;

  constructor(private matdialog:MatDialog, private route:Router,private ser:AccountService,private toastr:ToastrService,
    private observer:BreakpointObserver){

    }
ngAfterViewInit(){
  this.observer.observe(['(max-width:800px)']).subscribe((res)=>{
       if(res.matches){
        this.sidenav.mode='over';
        this.sidenav.close();
      }else{
        this.sidenav.mode='side';
        this.sidenav.open();
      }
  })
}
  ngOnInit(){
   this.getusername();
   this.removelogoutBtn();
  }

  logout(){
   localStorage.removeItem('token');
    this.username="";
    this.route.navigateByUrl('/home');
    this.toastr.success('Logout successfully','Logout');
  }
  getusername(){
    this.token_=localStorage.getItem('token');
    this.userdata= jwt_decode(this.token_)
   this.username=this.userdata.name;
  }

  removelogoutBtn(){
    if(this.username){
     this.isLogout=true;
    }
    else{
      this.isLogout=false;
    }
  }

  onclickEmployee(){
    this.token=localStorage.getItem('token');
    if(this.token){
      this.route.navigateByUrl('/demo');
    }
    else{
      this.toastr.warning('Please login to access this page');
    }
  }

}
