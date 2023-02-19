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

  getSkill(skillId: string) {
    return this.httpClient.get<Skill>(`${this.url}/skills/get/${skillId}`);
  }

  updateSkill(skill: Skill) {
    return this.httpClient.patch<Skill>(`${this.url}/skills/update/${skill._id}`, skill);
  }

  createSkill(skill: Skill){
    return this.httpClient.post<Skill>(`${this.url}/skills/create`, skill);
  }

  deleteSkill(skillId: string) {
    return this.httpClient.delete<Skill>(`${this.url}/skills/delete/${skillId}`);
  }
}


