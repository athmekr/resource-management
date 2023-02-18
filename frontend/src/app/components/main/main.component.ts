import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  public activeHoverEmployees: boolean = false;
  public activeHoverSkills: boolean = false;

  public activateHover(type: 'employees' | 'skills') {
    if (type === 'employees'){
      this.activeHoverEmployees = true;
    } else {
      this.activeHoverSkills = true;
    }
  }
  public deactivateHover(type: 'employees' | 'skills') {
    if (type === 'employees'){
      this.activeHoverEmployees = false;
    } else {
      this.activeHoverSkills = false;
    }
  }
}
