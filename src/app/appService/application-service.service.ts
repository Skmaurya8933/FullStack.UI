import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeDetail } from '../Model/employee-detail.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationServiceService {

  constructor(private http:HttpClient) {

  }
  ngOnInit(){

  }

  getAllEmpData(){
    return this.http.get<EmployeeDetail[]>('https://localhost:7026/api/Employee/GetAllEmployeeDetail')
  }

  postEmployeeData(employeeDetail:EmployeeDetail){
    return this.http.post<EmployeeDetail>('https://localhost:7026/api/Employee/AddEmployeeDetail',employeeDetail);
  }

  putEmployeeData(employeeData:EmployeeDetail){
    return this.http.post<EmployeeDetail>('https://localhost:7026/api/Employee/UpdateEmployeeDetail',employeeData);
  }

  deleteEmployeeData(id:number){
    return this.http.get<any>('https://localhost:7026/api/Employee/DeleteEmployeeDetail?id='+id);
  }


}

