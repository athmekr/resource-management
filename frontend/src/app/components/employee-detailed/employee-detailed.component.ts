import {Component, OnInit} from '@angular/core';
import { Employee } from "../../interfaces/employee.interface";
import { EmployeeService } from "../../services/employee.service";
import { ActivatedRoute, Router } from "@angular/router";
import { SkillService } from "../../services/skill.service";
import { Skill } from "../../interfaces/skill.interface";
import swal from "sweetalert2";

@Component({
  selector: 'app-employee-detailed',
  templateUrl: './employee-detailed.component.html',
  styleUrls: ['./employee-detailed.component.css']
})
export class EmployeeDetailedComponent implements OnInit {

  public employee: Employee;
  public selectedSkills: Skill[] = [];
  public allSkills: Skill[] = [];
  public createdDate: string;
  public updatedDate: string;
  constructor( private employeeService: EmployeeService, private skillService: SkillService, private route: ActivatedRoute, private router: Router ) {
  }
  ngOnInit() {
    this.initValues();
    this.getEmployee();
    this.getSkills();
  }

  getEmployee(){
    const employeeId = this.route.snapshot.params['id'];
    this.employeeService.getEmployee(employeeId).subscribe((employee: Employee) => {
      this.employee = employee;
      this.createdDate = new Date(employee.createdAt).toLocaleDateString('en-GB');
      this.updatedDate = new Date(employee.updatedAt).toLocaleDateString('en-GB');
      this.selectedSkills = this.employee.skills;
    });
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
    this.employeeService.updateEmployee(this.employee).subscribe((employee: Employee) => {
      this.employee = employee;
      this.router.navigate(['/employees']);
      swal.fire(
        'Success!',
        'Employee has been updated!',
        'success'
      )
    });
  }

  onCancel(): void {
    this.router.navigate(['/employees']);
  }
}
