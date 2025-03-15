import { Skill } from "@/app/api/mhdb/skills/Skill";

export interface Ailment {
  id: number;
  name: string;
  description: string;
  recovery: Recovery;
  protection: Protection;
}

export interface Recovery {
  actions: string[]; // TODO: enum
}

export interface Protection {
  item: any[]; // TODO: item
  skills: Skill[];
}
