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

  getEmployee(employeeId: string) {
    return this.httpClient.get<Employee>(`${this.url}/employees/get/${employeeId}`);
  }

  updateEmployee(employee: Employee) {
    return this.httpClient.patch<Employee>(`${this.url}/employees/update/${employee._id}`, employee);
  }

  createEmployee(employee: Employee){
    return this.httpClient.post<Employee>(`${this.url}/employees/create`, employee);
  }

  deleteEmployee(employeeId: string) {
    return this.httpClient.delete<Employee>(`${this.url}/employees/delete/${employeeId}`);
  }
}
