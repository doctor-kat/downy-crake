export interface Skill {
  id: number;
  name: string;
  description: string;
  ranks: SkillRank[];
  kind: SkillKind;
}

export enum SkillKind {
  armor = "armor",
  weapon = "weapon",
  set = "set",
  group = "group",
}

export interface SkillRank {
  id: number;
  description: string;
  skill: Skill;
  level: number;
}
