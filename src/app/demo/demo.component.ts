import { HttpClient } from '@angular/common/http';
import { Component ,Inject,OnInit,ViewChild} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApplicationServiceService } from '../appService/application-service.service';
import { EmployeeComponent } from '../employee/employee.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { style } from '@angular/animations';


@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
  displayedColumns: string[] = ['employeeId', 'employeeName', 'empDoB', 'empDateOFJoining','empSalary','empDepartment','empTechnicalSkills','action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  data_:any;

  constructor(
    private matdialog:MatDialog,private formbuilder:FormBuilder,
    private apiservice:ApplicationServiceService,private htttp:HttpClient,private toastr:ToastrService){}

ngOnInit(){
  this.getallEmployees();
}

Opendialog(){
  this.matdialog.open(EmployeeComponent).afterClosed().subscribe(val=>{
    if(val==='save'){
      this.getallEmployees();
    }
  })
}
  getallEmployees(){
    this.apiservice.getAllEmpData()
    .subscribe({
      next:(res: any)=>{
        this.data_=res.data.employeeDetails
        this.dataSource=new MatTableDataSource(this.data_);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort=this.sort;
      },
      error:()=>{
        this.toastr.error('Error while fetching the Records','Employee');
      }
    })
  }
  editEmployee(row:any){
    this.matdialog.open(EmployeeComponent,{
      data:row
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getallEmployees();
      }
    })
  }
deleteEmployee(id:any){
  Swal.fire({
    width:370,
    heightAuto:false,
    title: 'Are you sure want to delete?',
    text: 'You will not be able to recover this file!',
    icon: 'question',
    confirmButtonColor:'#3085d6',
    cancelButtonColor:'#d33',
    showCancelButton: true,
    confirmButtonText: 'Yes,delete it!',
    cancelButtonText: 'Cancel',
  }).then((result) => {
    if (result.value) {
      this.apiservice.deleteEmployeeData(id)
  .subscribe({
    next:(res)=>{
      Swal.fire(

        'Deleted!',
        'Your imaginary file has been deleted.',
        'success'
      );
      this.getallEmployees();
    }
  })
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
    }
  });
}


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
