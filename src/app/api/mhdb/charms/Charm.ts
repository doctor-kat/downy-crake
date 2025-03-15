import { CraftingCost } from "@/app/api/mhdb/dataTypes/CraftingCost";
import { SkillRank } from "@/app/api/mhdb/skills/Skill";

export interface Charm {
  id: number;
  gameId: string;
  ranks: CharmRank[];
}

export interface CharmRank {
  id: number;
  name: string;
  description: string;
  level: number;
  rarity: number;
  skills: SkillRank[];
  crafting: CharmRankCrafting;
}

export interface CharmRankCrafting {
  craftable: boolean;
  zennyCost: number;
  materials: CraftingCost[];
}
