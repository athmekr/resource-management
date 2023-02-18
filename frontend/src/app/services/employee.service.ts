import { HttpClient } from "@angular/common/http";
import { Employee } from "../interfaces/employee.interface";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService{
  private url = 'http://localhost:8000';
  constructor(private httpClient: HttpClient) { }

  getEmployees() {
    return this.httpClient.get<Employee[]>(`${this.url}/employees/get`);
  }

  deleteEmployee(employeeId: string) {
    return this.httpClient.delete<Employee>(`${this.url}/employees/delete/${employeeId}`);
  }
}
