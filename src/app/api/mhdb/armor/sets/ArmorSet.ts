import { Armor } from "@/app/api/mhdb/armor/Armor";
import { Skill, SkillRank } from "@/app/api/mhdb/skills/Skill";

export interface ArmorSet {
  id: number;
  gameId: string;
  name: string;
  pieces: Armor[];
  bonus: ArmorSetBonus;
  groupBonus: ArmorSetBonus;
}

export interface ArmorSetBonus {
  id: number;
  skill: Skill;
  ranks: ArmorSetBonusRank[];
}

export interface ArmorSetBonusRank {
  id: number;
  pieces: number;
  skill: SkillRank;
}
