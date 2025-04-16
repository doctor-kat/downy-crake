export interface Skill {
  id: number;
  name: string;
  description: string | null;
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
  name?: string;
  description: string;
  skill: Partial<Skill>;
  level: number;
}
