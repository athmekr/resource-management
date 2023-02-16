import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from "../../services/employee.service";
import { Employee } from "../../interfaces/employee.interface";


@Component({
  selector: 'app-employees-view',
  templateUrl: './employees-view.component.html',
  styleUrls: ['./employees-view.component.css']
})
export class EmployeesViewComponent implements AfterViewInit {

  displayedColumns: string[] = ['firstname', 'surname', 'hiringDate', 'skills', 'createdAt', 'updatedAt'];
  dataSource: MatTableDataSource<Employee>;
  public employees: Employee[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private employeeService: EmployeeService ) {
    this.getSkills();
    this.dataSource = new MatTableDataSource(this.employees);
  }

  ngAfterViewInit() {
    this.getSkills();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getSkills(){
    this.employeeService.getEmployees().subscribe(employees => {
      this.employees = employees;
      console.log(this.employees);
      this.employees.forEach( employee => {
        let createdDate = new Date(employee.createdAt);
        let updatedDate = new Date(employee.updatedAt);
        employee.createdAt = createdDate.toLocaleDateString('en-GB');
        employee.updatedAt = updatedDate.toLocaleDateString('en-GB');
      });
      this.dataSource = new MatTableDataSource(this.employees);
    });

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
