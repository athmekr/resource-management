import { Skill } from "./skill.interface";

export interface Employee {
  _id: string;
  firstname: string;
  surname: string;
  hiringDate: string;
  skills: Skill[];
  createdAt: string;
  updatedAt: string;
  skillList?: string;
}
