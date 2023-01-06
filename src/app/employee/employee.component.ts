import { Component, Inject,OnInit,ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApplicationServiceService } from '../appService/application-service.service';
import { EmployeeDetail } from '../Model/employee-detail.model';
import Swal from 'sweetalert2'
import { ToastrService } from 'ngx-toastr';
import { validateVerticalPosition } from '@angular/cdk/overlay';




@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employeeform:any;
  actionBtn:string="Save";
  data_:any;
  employee:any;
  requestArray:any=[]
  checkBoxData:any= [
    { name: '.NET', value: '.Net' },
    { name: '.NET CORE', value: '.NetCore' },
    { name: 'REACT JS', value: 'ReactJs' },
    { name: 'ANGULAR', value: 'Angular' },
    { name: 'REACT NATIVE', value: 'ReactNative' },
    { name: 'SQL SERVER', value: 'SqlServer' },
    { name: 'C#', value: 'C#' },
    { name: 'HTML', value: 'Html' },
  ];

  constructor(private formbuilder:FormBuilder, private dialogRef : MatDialogRef<EmployeeComponent>,
    private apiservice:ApplicationServiceService,private toastr:ToastrService,
    @Inject(MAT_DIALOG_DATA) public editdata:any

    ){}

  ngOnInit(){

    this.employeeform = this.formbuilder.group({
      EmployeeName: ['',[Validators.required,Validators.minLength(3)]],
      EmpDoB: ['',[Validators.required]],
      EmpDateOFJoining: ['',[Validators.required]],
      EmpSalary: ['',[Validators.required]],
      EmpDepartment: ['',[Validators.required]],
    })

     if(this.editdata){
      this.actionBtn="Update";
      this.employeeform.controls['EmployeeName'].setValue(this.editdata.employeeName);
      this.employeeform.controls['EmpDoB'].setValue(this.editdata.empDoB);
      this.employeeform.controls['EmpDateOFJoining'].setValue(this.editdata.empDateOFJoining);
      this.employeeform.controls['EmpSalary'].setValue(this.editdata.empSalary);
      this.employeeform.controls['EmpDepartment'].setValue(this.editdata.empDepartment);
      this.requestArray=this.editdata.empTechnicalSkills.split(",");
     }

  }
  formReset(){
    this.employeeform.reset();
    this.requestArray.splice(0,this.requestArray.length)
  }
  onSubmit() {
    this.employee=this.employeeform.value;
    this.employee.EmpTechnicalSkills=this.requestArray.toString();
    this.addEmployee(this.employee);
   }

  addEmployee(emp:EmployeeDetail){
  if(!this.editdata){
    if(this.employeeform.valid){
      this.apiservice.postEmployeeData(emp)
      .subscribe( {
        next:(res)=>{
          this.employeeform.reset();
          this.dialogRef.close('save');
          Swal.fire("Hey!",'Employee detail added successfully','success')

        },
        error:()=>{
            this.toastr.error('Error while adding employeedetail','Employee');
           }
         })
       }
    }else{
      emp.EmployeeId=this.editdata.employeeId;
      this.updateEmployee(emp);
    }
  }

  updateEmployee(emp:any){
    this.apiservice.putEmployeeData(emp)
    .subscribe({
      next:(res)=>{
        this.employeeform.reset();
        this.dialogRef.close('update');
        Swal.fire("Hey!",'Employee detail updated successfully','success')
      },
      error:()=>{
        this.toastr.error('Error while updating employeedetail','Employee');
      }
    })
  }
onchangeSkills(even:any){
let index=this.requestArray.indexOf(even.target.value);
    if(index== -1){
      this.requestArray.push(even.target.value);
    }else{
       this.requestArray.splice(index,1);
  }
}

  onCheckChange(event:any) {
    const formArray: FormArray = this.employeeform.get("EmpTechnicalSkills") as FormArray;
    if (event.target.checked) {
      formArray.push(new FormControl(event.target.value));
    } else {
      let i: number = 0;
      formArray.controls.forEach((ctrl:any) => {
        if (ctrl.value == event.target.value) {
          formArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

}


