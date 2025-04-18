export interface Skill {
  id: number;
  name: string;
  description: string | null;
  ranks: SkillRank[];
  kind: SkillKind;
  icon: SkillIcon;
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

export interface SkillIcon {
  id: string;
  kind: SkillIconKind;
}

export enum SkillIconKind {
  affinity = "affinity",
  attack = "attack",
  defense = "defense",
  element = "element",
  gathering = "gathering",
  group = "group",
  handicraft = "handicraft",
  health = "health",
  item = "item",
  offense = "offense",
  ranged = "ranged",
  set = "set",
  stamina = "stamina",
  utility = "utility",
}
