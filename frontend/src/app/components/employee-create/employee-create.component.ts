import { Component, OnInit } from '@angular/core';
import { Employee } from "../../interfaces/employee.interface";
import { Skill } from "../../interfaces/skill.interface";
import { EmployeeService } from "../../services/employee.service";
import { SkillService } from "../../services/skill.service";
import { ActivatedRoute, Router } from "@angular/router";
import swal from "sweetalert2";

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit{

  public employee: Employee;
  public selectedSkills: Skill[] = [];
  public allSkills: Skill[] = [];

  constructor( private employeeService: EmployeeService, private skillService: SkillService, private route: ActivatedRoute, private router: Router ) {
  }
  ngOnInit() {
    this.initValues();
    this.getSkills();
  }

  comparer(o1: Skill, o2: Skill): boolean {
    // if possible compare by object's name, and not by reference.
    return o1 && o2 ? o1.title === o2.title : o2 === o2;
  }
  getSkills() {
    this.skillService.getSkills().subscribe(skills => {
      this.allSkills = skills;
    });
  }

  private initValues() {
    this.selectedSkills = [];
    this.employee = {
      _id: '',
      firstname: '',
      surname: '',
      hiringDate: '',
      skills: [],
      createdAt: '',
      updatedAt: ''
    }
  }

  private validateEmployee(){
    if (this.employee.skills.length < 1 || !this.employee.firstname || !this.employee.surname || !this.employee.hiringDate) {
      swal.fire(
        'Warning!',
        'All fields are mandatory!',
        'warning'
      )
      return false;
    } else return true;
  }

  onSave(): void {
    this.employee.skills = this.selectedSkills;
    if (!this.validateEmployee()) return;
    this.employeeService.createEmployee(this.employee).subscribe((employee: Employee) => {
      this.employee = employee;
      this.router.navigate(['/employees']);
      swal.fire(
        'Success!',
        'Employee has been created!',
        'success'
      )
    });
  }

  onCancel(): void {
    this.router.navigate(['/employees']);
  }
}
