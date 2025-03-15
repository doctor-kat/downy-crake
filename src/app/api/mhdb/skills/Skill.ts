export interface Skill {
  id: number;
  name: string;
  description: string;
  ranks: SkillRank[];
  kind: SkillKind;
}

export enum SkillKind {
  armor,
  weapon,
  set,
  group,
}

export interface SkillRank {
  id: number;
  description: string;
  level: number;
}
