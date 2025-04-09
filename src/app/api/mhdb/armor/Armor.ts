import { ArmorSet } from "@/app/api/mhdb/armor/sets/ArmorSet";
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
  armorSet: { id: number; name: string };
  crafting: ArmorCrafting;
}

export enum ArmorKind {
  head = "head",
  chest = "chest",
  arms = "arms",
  waist = "waist",
  legs = "legs",
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
