import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SkillService } from "../../services/skill.service";
import { Skill } from "../../interfaces/skill.interface";


@Component({
  selector: 'app-skills-view',
  templateUrl: './skills-view.component.html',
  styleUrls: ['./skills-view.component.css']
})
export class SkillsViewComponent implements AfterViewInit {
  displayedColumns: string[] = ['title', 'description', 'createdAt', 'updatedAt'];
  dataSource: MatTableDataSource<Skill>;
  public skills: Skill[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private skillService: SkillService ) {
    this.getSkills();
    this.dataSource = new MatTableDataSource(this.skills);
  }

  ngAfterViewInit() {
    this.getSkills();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getSkills(){
    this.skillService.getSkills().subscribe(skills => {
      this.skills = skills;
      this.skills.forEach( skill => {
        let createdDate = new Date(skill.createdAt);
        let updatedDate = new Date(skill.updatedAt);
        skill.createdAt = createdDate.toLocaleDateString('en-GB');
        skill.updatedAt = updatedDate.toLocaleDateString('en-GB');
      });
      this.dataSource = new MatTableDataSource(this.skills);
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


