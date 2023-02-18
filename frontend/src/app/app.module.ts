import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { RouterLink, RouterOutlet } from "@angular/router";
import { EmployeesViewComponent } from './components/employees-view/employees-view.component';
import { EmployeeDetailedComponent } from './components/employee-detailed/employee-detailed.component';
import { EmployeeCreateComponent } from './components/employee-create/employee-create.component';
import { SkillsViewComponent } from './components/skills-view/skills-view.component';
import { SkillCreateComponent } from './components/skill-create/skill-create.component';
import { SkillDetailedComponent } from './components/skill-detailed/skill-detailed.component';
import { HttpClientModule } from '@angular/common/http'

//Angular Material Modules
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatTooltipModule } from "@angular/material/tooltip";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    EmployeesViewComponent,
    EmployeeDetailedComponent,
    EmployeeCreateComponent,
    SkillsViewComponent,
    SkillCreateComponent,
    SkillDetailedComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        RouterOutlet,
        MatCardModule,
        RouterLink,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        HttpClientModule,
        MatSortModule,
        MatTooltipModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
