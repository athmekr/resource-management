import {Component, OnInit} from '@angular/core';
import { Employee } from "../../interfaces/employee.interface";
import { EmployeeService } from "../../services/employee.service";
import { ActivatedRoute, Router } from "@angular/router";
import swal from "sweetalert2";

@Component({
  selector: 'app-employee-detailed',
  templateUrl: './employee-detailed.component.html',
  styleUrls: ['./employee-detailed.component.css']
})
export class EmployeeDetailedComponent implements OnInit {

  // public employee: { skills: any[]; createdAt: string; firstname: string; hiringDate: string; surname: string; updatedAt: string };
  public employee: Employee;

  constructor( private employeeService: EmployeeService, private route: ActivatedRoute, private router: Router ) {
  }
  ngOnInit() {
    this.initValues();
    this.getEmployee();
  }

  getEmployee(){
    const employeeId = this.route.snapshot.params['id'];
    this.employeeService.getEmployee(employeeId).subscribe((employee: Employee) => {
      this.employee = employee;
    });
  }

  initValues() {
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

  onSave(): void {
    // const formData = new FormData();
    console.log('Employee new: ', this.employee)
    this.employeeService.updateEmployee(this.employee).subscribe((employee: Employee) => {
      this.employee = employee;
      console.log('Employee updated!')
      this.router.navigate(['/employees']);
      swal.fire(
        'Updated!',
        'Employee has been updated!',
        'success'
      )
    });
  }

  onCancel(): void {
    this.router.navigate(['/employees']);
  }
}
