import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { JsonServerService } from '../json-server.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
   
  constructor(private serve:JsonServerService){}

  loginRes:any
  allowLogin:boolean[]=[]

  employeeLoginFormGroup = new FormGroup({
    id:new FormControl(''),
    password:new FormControl('')
  })

  loginUser(){
   this.serve.getLogin().subscribe(res =>{

    this.loginRes = res

    console.log(this.loginRes)

    this.loginRes.forEach((ele:any) =>{

     if(ele.userId==this.employeeLoginFormGroup.controls.id.value){
      if(ele.key==this.employeeLoginFormGroup.controls.password.value){
        this.allowLogin.push(true)

      }else{
        this.allowLogin.push(false)
        alert("password is wrong")
      }
     }else{
      this.allowLogin.push(false)
      
     }

    })
   })

  }
}
