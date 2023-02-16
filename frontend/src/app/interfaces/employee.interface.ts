import { Skill } from "./skill.interface";

export interface Employee {
  objectId: string;
  firstname: string;
  surname: string;
  hiringDate: string;
  skills: Skill[];
  createdAt: string;
  updatedAt: string;
}
