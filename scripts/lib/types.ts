import { Armor } from "../../src/app/api/mhdb/armor/Armor";

export interface ArmorCombination {
  head: Armor;
  chest: Armor;
  arms: Armor;
  waist: Armor;
  legs: Armor;
}

export interface SkillSignature {
  [skillId: number]: number;  // skillId -> level
}

export interface SkillTreeNode {
  // What skills can still be added at this state
  possibleSkills: Record<number, number[]>;  // skillId -> [available levels]

  // How many combinations match this state
  combinationCount: number;

  // Child nodes (next skill selections)
  children: Record<string, SkillTreeNode>;  // key = "skillId:level"

  // Actual combinations (only if count <= 25)
  combinations?: {
    head: number;
    chest: number;
    arms: number;
    waist: number;
    legs: number;
  }[];
}

export interface CombinationData {
  armorIds: {
    head: number;
    chest: number;
    arms: number;
    waist: number;
    legs: number;
  };
  skills: SkillSignature;  // Base skills from armor only
  decorationSlots: number[];  // Array of slot sizes available (e.g., [3, 2, 1, 1])
  maxPotentialSkills: SkillSignature;  // Max skills if all decoration slots optimally filled
}
