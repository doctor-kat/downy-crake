import { ArmorSet } from "@/app/api/mhdb/armorSets/ArmorSet";
import { CraftingCost } from "@/app/api/mhdb/dataTypes/CraftingCost";
import { Rank } from "@/app/api/mhdb/dataTypes/Rank";
import { SkillRank } from "@/app/api/mhdb/skills/Skill";

export interface Armor {
  id: number;
  name: string;
  description: string;
  kind: ArmorKind;
  rank: Rank;
  rarity: number;
  defense: ArmorDefense;
  resistances: ArmorResistances;
  slots: number[];
  skills: SkillRank[];
  armorSet: ArmorSet;
  crafting: ArmorCrafting;
}

export enum ArmorKind {
  head,
  chest,
  arms,
  waist,
  legs,
}

export interface ArmorDefense {
  base: number;
  max: number;
}

export interface ArmorResistances {
  fire: number;
  water: number;
  ice: number;
  thunder: number;
  dragon: number;
}

export interface ArmorCrafting {
  id: number;
  zennyCost: number;
  materials: CraftingCost[];
}
