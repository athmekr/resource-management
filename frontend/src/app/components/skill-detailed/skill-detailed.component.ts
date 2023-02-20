import { Component, OnInit } from '@angular/core';
import { Skill } from "../../interfaces/skill.interface";
import { SkillService } from "../../services/skill.service";
import { ActivatedRoute, Router } from "@angular/router";
import swal from "sweetalert2";

@Component({
  selector: 'app-skill-detailed',
  templateUrl: './skill-detailed.component.html',
  styleUrls: ['./skill-detailed.component.css']
})
export class SkillDetailedComponent implements OnInit {

  public skill: Skill;
  public createdDate: string;
  public updatedDate: string;

  constructor( private skillService: SkillService, private route: ActivatedRoute, private router: Router ) {}

  ngOnInit() {
    this.initValues();
    this.getSkill();
  }

  private getSkill() {
    const skillId = this.route.snapshot.params['id'];
    this.skillService.getSkill(skillId).subscribe((skill: Skill) => {
      this.skill = skill;
      this.createdDate = new Date(skill.createdAt).toLocaleDateString('en-GB');
      this.updatedDate = new Date(skill.updatedAt).toLocaleDateString('en-GB');
    });
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

  public onDelete(){
    swal.fire({
      title: `Are you sure you want to delete skill ${this.skill.title}?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f44336',
      cancelButtonColor: '#919191',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.skillService.deleteSkill(this.skill._id)
          .subscribe( () => {
            this.router.navigate(['/skills']);
          });
        swal.fire(
          'Deleted!',
          'Skill has been deleted.',
          'success'
        )
      }
    })
  }
  onSave(): void {
    if (!this.validateSkill()) return;
    this.skillService.updateSkill(this.skill).subscribe(() => {
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
