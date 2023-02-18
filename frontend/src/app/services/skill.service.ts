import { HttpClient } from "@angular/common/http";
import { Skill } from "../interfaces/skill.interface";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class SkillService{
  private url = 'http://localhost:8000';
  constructor(private httpClient: HttpClient) { }
  getSkills() {
    return this.httpClient.get<Skill[]>(`${this.url}/skills/get`);
  }

  getSkill() {

  }

  updateSkill() {

  }

  createSkill(){

  }

  deleteSkill(skillId: string) {
    return this.httpClient.delete<Skill>(`${this.url}/skills/delete/${skillId}`);
  }
}


