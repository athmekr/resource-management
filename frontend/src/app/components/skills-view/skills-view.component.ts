import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SkillService } from "../../services/skill.service";
import { Skill } from "../../interfaces/skill.interface";
import swal from "sweetalert2";
import {ngxCsv} from "ngx-csv";

@Component({
  selector: 'app-skills-view',
  templateUrl: './skills-view.component.html',
  styleUrls: ['./skills-view.component.css']
})
export class SkillsViewComponent implements AfterViewInit {
  displayedColumns: string[] = ['title', 'description', 'createdAt', 'updatedAt', 'actions'];
  dataSource: MatTableDataSource<Skill>;
  public skills: Skill[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private skillService: SkillService ) {
    this.getSkills();
  }

  ngAfterViewInit() {
    this.getSkills();
  }

  private dataSourceSetup() {
    this.dataSource = new MatTableDataSource(this.skills);
    setTimeout(() => this.dataSource.paginator = this.paginator);
    this.dataSource.sort = this.sort;
  }

  private getSkills(){
    this.skillService.getSkills().subscribe(skills => {
      this.skills = skills;
      this.skills.forEach( skill => {
        let createdDate = new Date(skill.createdAt);
        let updatedDate = new Date(skill.updatedAt);
        skill.createdAt = createdDate.toLocaleDateString('en-GB');
        skill.updatedAt = updatedDate.toLocaleDateString('en-GB');
      });
      this.dataSourceSetup();
    });
  }

  public exportCSV() {
    const csv = this.skills.map((skill) => {
      return {
        'title':skill.title,
        'description':skill.description,
        'createdAt':skill.createdAt,
        'updatedAt':skill.updatedAt
      }
    });

    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Skills',
      useBom: true,
      noDownload: false,
      headers: ["Title", "Description", "Created date", "Updated date"]
    };

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const filename: string = `skills_${day + '/' + month + '/' + year}`;

    new ngxCsv(csv, filename, options);
  }

  public onDelete(skill: Skill){
    swal.fire({
      title: `Are you sure you want to delete skill ${skill.title}?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f44336',
      cancelButtonColor: '#919191',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.skillService.deleteSkill(skill._id)
          .subscribe( () => {
            this.getSkills();
          });
        swal.fire(
          'Deleted!',
          'Skill has been deleted.',
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


