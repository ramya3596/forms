import { Component, OnInit } from '@angular/core';
import { JsonServerService } from '../json-server.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  constructor(private employeeServe: JsonServerService) { }
  ngOnInit(): void {
    this.loadEmployeeProject()
  }

  loadEmployeeProject() {
    this.employee = []
    this.employeeServe.getEmployees().subscribe(res => {
      this.employeeRes = res

      this.employeeServe.getEmployeeProject().subscribe(res1 => {
        console.log(res1)
        this.employeeProject = res1
        console.log(this.employeeProject)
        this.employeeRes.forEach((ele: any) => {

          this.employeeProject.forEach((ele1: any) => {
            if (ele.project == ele1.id) {
              ele.project = ele1.projectName
            }
          })
          this.employee.push(ele)


        })

      })


      // if (val !== "all") {

      //   this.employee = this.employee.filter((element: any) => {
      //     return element.department === val

      //   })

      // }
      // console.log(this.employee)


    })
  }
  getView: boolean = false

  postView: boolean = false

  getId: any

  employee: any = []
  employeeRes: any = []

  employeeProject: any
  employeeProjectRes: any
  singleEmployee: any

  id: any
  arrDep: any = ["python", "cloud", "js", "java"]

  allowToPost: boolean = true

  employeeFormGroup = new FormGroup({
    id: new FormControl(''),
    employeeId: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    department: new FormControl(''),
    experience: new FormControl(''),
    salary: new FormControl(''),
    technicalKnowledge: new FormArray([]),
    policies: new FormArray([]),
    doj: new FormControl(''),
    project: new FormControl('')
  })
  array: any = []
  loadEmployee(val: any) {

    // this.employeeServe.getEmployees().subscribe(res => {
    //   this.employeeRes = res

    //   this.employeeServe.getEmployeeProject().subscribe(res1 =>{console.log(res1)
    //     this.employeeProject=res1
    //     console.log(this.employeeProject)
    //     this.employeeRes.forEach((ele:any)=>{

    //       this.employeeProject.forEach((ele1:any)=>{
    //       if(ele.project == ele1.id){
    //         ele.project=ele1.projectName
    //       }
    //       })
    //       this.employee.push(ele)

    //     })

    //   })


    //   if (val !== "all") {

    //     this.employee = this.employee.filter((element: any) => {
    //       return element.department === val

    //     })

    //   }
    //   console.log(this.employee)


    // })


  }

  addTechnicalKnowledge() {
    const control = new FormControl('');
    (<FormArray>this.employeeFormGroup.get('technicalKnowledge')).push(control)
  }

  getTechnicalKnowledge() {
    return this.employeeFormGroup.controls.technicalKnowledge.controls
  }

  getPolicies() {
    return this.employeeFormGroup.controls.policies.controls
  }

  addPolicies() {
    const array = new FormControl('');
    (<FormArray>this.employeeFormGroup.get('policies')).push(array)
  }
  arr: any = []
  enterDep: any = ""
  allowedDep: boolean = false
  postEmployee() {

    console.log(this.employeeFormGroup)
    console.log(JSON.stringify(this.employeeFormGroup.value))

    this.employeeProject = {
      "projectName": this.employeeFormGroup.controls.project.value

    }

    if (this.employeeFormGroup.controls.id.getRawValue() === "") {
      this.employeeServe.getEmployees().subscribe(res => {
        this.employee = res
        this.arr = []
        this.employee.forEach((ele: any) => {
          this.arr.push(ele.employeeId)
        })
        this.employee.forEach((ele: any) => {
          if (this.arr.includes(this.employeeFormGroup.controls.employeeId.getRawValue())) {
            this.allowToPost = false;
            // break;
          } else { this.allowToPost = true }

        })

        this.employee.forEach((ele: any) => {
          if (this.arrDep.includes(this.employeeFormGroup.controls.department.getRawValue())) {

            this.allowedDep = true
            // alert('department is allowed')
          } else {
            this.allowedDep = false
            // alert('department is not  allowed')
          }
        })
        if (this.allowToPost == true) {

          this.employeeServe.postEmployeesProject(this.employeeProject).subscribe(res1 => {
            this.employeeProjectRes = res1

            this.employeeFormGroup.controls.project.setValue(this.employeeProjectRes.id)

            this.employeeServe.postEmployees(this.employeeFormGroup.value).subscribe(res => {

              console.log(res)

              alert("employee saved succesfully")

              // this.employeeServe.getEmployees().subscribe(res => this.employee = res)
              this.loadEmployeeProject()

              this.getView = true
              this.postView = false

              this.employeeFormGroup = new FormGroup({
                id: new FormControl(''),
                employeeId: new FormControl(''),
                department: new FormControl(''),
                experience: new FormControl(''),
                salary: new FormControl(''),
                technicalKnowledge: new FormArray([]),
                policies: new FormArray([]),
                doj: new FormControl(''),
                project: new FormControl('')
              })


            })
          })
        } else {
          alert("employeeId already exist")
        }
      })
    } else {

      this.employeeServe.getEmployees().subscribe(res => {

        this.employee = res
        this.arr = []
        this.allowToPost = true
        this.employee.forEach((ele: any) => {

          if (ele.employeeId !== this.employeeFormGroup.controls.employeeId.getRawValue()) { this.arr.push(ele.employeeId) }
        })

        this.employee.forEach((ele: any) => {
          if (this.arr.includes(this.employeeFormGroup.controls.employeeId.getRawValue())) {
            this.allowToPost = false;

          } else { this.allowToPost = true }

        })
        this.employee.forEach((ele: any) => {
          if (this.arrDep.includes(this.employeeFormGroup.controls.department.getRawValue())) {
            // alert('department is allowed')
            this.allowedDep = true

          } else {
            // alert('department is not  allowed')
            this.allowedDep = false
          }
        })
        if (this.allowToPost == true) {

          this.employee.forEach((ele: any) => {
            if (this.employeeFormGroup.controls.employeeId == ele.employeeId) {
              this.getId = ele.id
            }
          })

          this.employeeServe.getEmployee(this.getId).subscribe(res => {

            this.singleEmployee = res
         

          this.employeeProject = {
            id: this.singleEmployee.project,
            "projectName": this.employeeFormGroup.controls.project.value

          }

          this.employeeServe.putEmployeesProject(this.employeeProject,this.singleEmployee.project).subscribe(res2 => {
            console.log(res2)
          
            this.employeeFormGroup.controls.project.setValue(JSON.parse(JSON.stringify(res2)).id)
          this.employeeServe.putEmployees(this.employeeFormGroup.value, this.employeeFormGroup.controls.id.getRawValue()).subscribe(res => {
            console.log(res)


            alert("employee updated successfully")
            this.loadEmployeeProject()
            this.getView = true
            this.postView = false
          })
           
            })
          
          })
        } else {
          alert("employeeId already exist")
        }
       

      }


      )
    }

  }


  currentId: any
  editEmployee(id: any, val: any) {
    console.log(id)
    this.currentId = id
    this.employeeFormGroup.controls.id.setValue(this.employee[val].id)
    this.employeeFormGroup.controls.employeeId.setValue(this.employee[val].employeeId)
    this.employeeFormGroup.controls.department.setValue(this.employee[val].department)
    this.employeeFormGroup.controls.experience.setValue(this.employee[val].experience)
    this.employeeFormGroup.controls.salary.setValue(this.employee[val].salary)
    this.employeeFormGroup.controls.project.setValue(this.employee[val].project)

    this.employee[val].technicalKnowledge.forEach((element: any) => {
      const control = new FormControl(element);
      (<FormArray>this.employeeFormGroup.get('technicalKnowledge')).push(control)
    });


    this.employee[val].policies.forEach((element: any) => {
      const control = new FormControl(element);
      (<FormArray>this.employeeFormGroup.get('policies')).push(control)
    });


    this.employeeFormGroup.controls.doj.setValue(this.employee[val].doj)
    

    this.getView = false
    this.postView = true

  }
 
  deleteEmployee(id: any) {

    this.employeeServe.deleteEmployeeProject(id).subscribe(res1 => {console.log(res1)


    this.employeeServe.deleteEmployee(id).subscribe(res => {
      console.log(res);
      alert("employee deleted successfully");
      this.loadEmployeeProject()
      this.getView = true;
      this.postView = false;
    })
  })
  }


  displayGet() {

    this.getView = true

    this.postView = false

  }

  displayPost() {
    this.postView = true
    this.getView = false

  }




}



