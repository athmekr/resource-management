import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from "./components/main/main.component";
import { EmployeesViewComponent } from "./components/employees-view/employees-view.component";
import { EmployeeDetailedComponent } from "./components/employee-detailed/employee-detailed.component";
import { EmployeeCreateComponent } from "./components/employee-create/employee-create.component";
import { SkillsViewComponent } from "./components/skills-view/skills-view.component";
import { SkillDetailedComponent } from "./components/skill-detailed/skill-detailed.component";
import { SkillCreateComponent } from "./components/skill-create/skill-create.component";

const routes: Routes = [
  { path: '', component: MainComponent, pathMatch: 'full' },
  { path: 'employees', component: EmployeesViewComponent, pathMatch: 'full' },
  { path: 'employees/create', component: EmployeeCreateComponent, pathMatch: 'full' },
  { path: 'employees/:id', component: EmployeeDetailedComponent, pathMatch: 'full' },
  { path: 'skills', component: SkillsViewComponent, pathMatch: 'full' },
  { path: 'skills/create', component: SkillCreateComponent, pathMatch: 'full' },
  { path: 'skills/:id', component: SkillDetailedComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
