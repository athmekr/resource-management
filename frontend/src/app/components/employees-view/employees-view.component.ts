import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from "../../services/employee.service";
import { Employee } from "../../interfaces/employee.interface";
import { ngxCsv } from 'ngx-csv/ngx-csv';
import swal from "sweetalert2";

@Component({
  selector: 'app-employees-view',
  templateUrl: './employees-view.component.html',
  styleUrls: ['./employees-view.component.css']
})
export class EmployeesViewComponent implements AfterViewInit {

  displayedColumns: string[] = ['firstname', 'surname', 'hiringDate', 'skills', 'createdAt', 'updatedAt', 'actions'];
  dataSource: MatTableDataSource<Employee>;
  public employees: Employee[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private employeeService: EmployeeService ) {
    this.dataSource = new MatTableDataSource(this.employees);
  }

  ngAfterViewInit() {
    this.getEmployees();
  }

  private dataSourceSetup() {
    this.dataSource = new MatTableDataSource(this.employees);
    setTimeout(() => this.dataSource.paginator = this.paginator);
    this.dataSource.sort = this.sort;
  }

  private getEmployees(){
    this.employeeService.getEmployees().subscribe(employees => {
      this.employees = employees;
      // Format employee data
      this.employees.forEach( employee => {
        let skillArray: string[] = [];
        let hiringDate = new Date(employee.hiringDate);
        let createdDate = new Date(employee.createdAt);
        let updatedDate = new Date(employee.updatedAt);
        employee.hiringDate = hiringDate.toLocaleDateString('en-GB');
        employee.createdAt = createdDate.toLocaleDateString('en-GB');
        employee.updatedAt = updatedDate.toLocaleDateString('en-GB');
        employee.skills.forEach( skill => {
          skillArray.push(skill.title);
        });
        employee.skillList = skillArray.join(', ');
      });
      this.dataSourceSetup();
    });
  }

  exportCSV() {
    const csv = this.employees.map((employee) => {
      return {
        'firstname':employee.firstname,
        'surname':employee.surname,
        'skills':employee.skillList,
        'hiringDate':employee.hiringDate,
        'createdAt':employee.createdAt,
        'updatedAt':employee.updatedAt
      }
    });

    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Your title',
      useBom: true,
      noDownload: false,
      headers: ["First Name", "Last Name", "Skills", "Hiring date", "Created date", "Updated date"]
    };

    new ngxCsv(csv, 'My Report', options);
  }

  public onDelete(employee: Employee){
    swal.fire({
      title: `Are you sure you want to delete employee ${employee.firstname + ' ' + employee.surname}?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f44336',
      cancelButtonColor: '#919191',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.employeeService.deleteEmployee(employee._id)
          .subscribe( () => {
            this.getEmployees();
          });
        swal.fire(
          'Deleted!',
          'Employee has been deleted.',
          'success'
        )
      }
    })
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
