import { Component, OnInit } from '@angular/core';
import { Skill } from "../../interfaces/skill.interface";
import {SkillService} from "../../services/skill.service";
import {ActivatedRoute, Router} from "@angular/router";
import swal from "sweetalert2";

@Component({
  selector: 'app-skill-create',
  templateUrl: './skill-create.component.html',
  styleUrls: ['./skill-create.component.css']
})
export class SkillCreateComponent implements OnInit{

  public skill: Skill;

  constructor( private skillService: SkillService, private route: ActivatedRoute, private router: Router ) {}

  ngOnInit() {
    this.initValues();
  }

  private initValues() {
    this.skill = {
      _id: '',
      title: '',
      description: '',
      createdAt: '',
      updatedAt: ''
    }
  }

  private validateSkill(){
    if (!this.skill.title || !this.skill.description) {
      swal.fire(
        'Warning!',
        'All fields are mandatory!',
        'warning'
      )
      return false;
    } else return true;
  }

  onSave(): void {
    if (!this.validateSkill()) return;
    this.skillService.createSkill(this.skill).subscribe(() => {
      this.router.navigate(['/skills']);
      swal.fire(
        'Success!',
        'Skill has been created!',
        'success'
      )
    });
  }

  onCancel(): void {
    this.router.navigate(['/skills']);
  }
}
