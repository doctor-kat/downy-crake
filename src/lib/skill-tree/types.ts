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

export interface SelectionState {
  selectedSkills: Map<number, number>;  // skillId -> level
  currentNode: SkillTreeNode;
  combinationCount: number;
  isComplete: boolean;  // <25 combinations
}
