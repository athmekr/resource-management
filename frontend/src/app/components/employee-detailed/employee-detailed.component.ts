import { Component, OnInit } from '@angular/core';
import { Employee } from "../../interfaces/employee.interface";
import { EmployeeService } from "../../services/employee.service";
import { ActivatedRoute, Router } from "@angular/router";
import { SkillService } from "../../services/skill.service";
import { Skill } from "../../interfaces/skill.interface";
import swal from "sweetalert2";

@Component({
  selector: 'app-employee-detailed',
  templateUrl: './employee-detailed.component.html',
  styleUrls: ['./employee-detailed.component.css'],
})

export class EmployeeDetailedComponent implements OnInit {

  public employee: Employee;
  public selectedSkills: Skill[] = [];
  public allSkills: Skill[] = [];
  public createdDate: string;
  public updatedDate: string;
  public minDate: Date;
  public maxDate: Date;
  constructor( private employeeService: EmployeeService, private skillService: SkillService, private route: ActivatedRoute, private router: Router) {
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

  public onDelete(){
    swal.fire({
      title: `Are you sure you want to delete employee ${this.employee.firstname + ' ' + this.employee.surname}?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f44336',
      cancelButtonColor: '#919191',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.employeeService.deleteEmployee(this.employee._id)
          .subscribe( () => {
            this.router.navigate(['/employees'])
          });
        swal.fire(
          'Deleted!',
          'Employee has been deleted.',
          'success'
        )
      }
    })
  }

  private initValues() {
    const currentYear = new Date().getFullYear();
    // Set the minimum to January 1st 20 years in the past and maximum to December 31st of current year.
    this.minDate = new Date(currentYear - 20, 0, 1);
    this.maxDate = new Date(currentYear, 11, 31);

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
    // All fields required
    if (this.employee.skills.length < 1 || !this.employee.firstname || !this.employee.surname || !this.employee.hiringDate) {
      swal.fire(
        'Warning!',
        'All fields are mandatory!',
        'warning'
      )
      return false;
    }
    // Hiring date min & max validation
    const hiringDate = new Date(this.employee.hiringDate);
    if (this.minDate >= hiringDate || hiringDate >= this.maxDate) {
      swal.fire(
        'Warning!',
        'Hiring date should be between January 1st 20 years in the past and December 31st of current year!',
        'warning'
      )
      return false;
    }
    return true;
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
