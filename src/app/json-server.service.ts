import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JsonServerService {

 
  constructor(private http:HttpClient) { }

  jsonUrl :any ="http://localhost:3000/users"

  employeeUrl:any ="http://localhost:3000/employee"

  employeeProjectUrl:any ="http://localhost:3000/empProject"

  loginUrl:any ="http://localhost:3000/loginMaster"

  getLogin(){
    return this.http.get(this.loginUrl)
  }
  
  getEmployeeProject(){
    return this.http.get(this.employeeProjectUrl)
  }

  getEmployees(){
    return this.http.get(this.employeeUrl)
  }
  getEmployee(id:any){
    return this.http.get(this.employeeUrl, +"/" +id)
  }

  postEmployees(employee:any){
    return this.http.post(this.employeeUrl,employee)
  }

  postEmployeesProject(employee:any){
    return this.http.post(this.employeeProjectUrl,employee)
  }


  putEmployees(employee:any,id:any){
    return this.http.put(this.employeeUrl+"/"+id,employee)
  }

  putEmployeesProject(employee:any,id:any){
    return this.http.put(this.employeeProjectUrl+"/"+id,employee)
  }
  
  deleteEmployee(id:any){
    return this.http.delete(this.employeeUrl+"/"+id)
  }

  deleteEmployeeProject(id:any){
    return this.http.delete(this.employeeProjectUrl+"/"+id)
  }


}


