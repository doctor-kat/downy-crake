import { CombinationData, SkillSignature, SkillTreeNode } from "./types";

/**
 * Find all possible skills and their levels in a set of combinations
 * Uses maxPotentialSkills to account for decoration slots
 */
function findPossibleSkills(
  combinations: CombinationData[],
  alreadySelected: Map<number, number>
): Record<number, Set<number>> {
  const possibleSkills: Record<number, Set<number>> = {};

  for (const combo of combinations) {
    // Use maxPotentialSkills to account for possible decorations
    for (const skillId in combo.maxPotentialSkills) {
      const skillIdNum = Number(skillId);
      const level = combo.maxPotentialSkills[skillIdNum];

      // Skip skills already selected
      if (alreadySelected.has(skillIdNum)) continue;

      // Skip skills with 0 level
      if (level === 0) continue;

      if (!possibleSkills[skillIdNum]) {
        possibleSkills[skillIdNum] = new Set();
      }
      possibleSkills[skillIdNum].add(level);
    }
  }

  return possibleSkills;
}

/**
 * Filter combinations that can achieve a specific skill at a specific level or higher
 * Uses maxPotentialSkills to account for decoration possibilities
 */
function filterBySkill(
  combinations: CombinationData[],
  skillId: number,
  minLevel: number
): CombinationData[] {
  return combinations.filter((combo) => {
    const level = combo.maxPotentialSkills[skillId] || 0;
    return level >= minLevel;
  });
}

/**
 * Choose the best skill to split on
 * Prefer skills that:
 * 1. Split the combinations most evenly
 * 2. Have higher frequency (appear in more combinations)
 */
function chooseBestSkillToSplit(
  combinations: CombinationData[],
  possibleSkills: Record<number, Set<number>>
): [number, number[]] {
  let bestSkill: number | null = null;
  let bestLevels: number[] = [];
  let bestScore = -Infinity;

  for (const skillIdStr in possibleSkills) {
    const skillId = Number(skillIdStr);
    const levels = Array.from(possibleSkills[skillId]).sort((a, b) => a - b);

    // Calculate how evenly this skill splits the combinations
    const levelCounts: number[] = [];
    for (const level of levels) {
      const count = filterBySkill(combinations, skillId, level).length;
      levelCounts.push(count);
    }

    // Score based on:
    // 1. Number of distinct levels (more is better)
    // 2. Evenness of split (prefer balanced splits)
    const numLevels = levels.length;
    const avgCount = combinations.length / numLevels;
    const variance = levelCounts.reduce((sum, count) => {
      return sum + Math.pow(count - avgCount, 2);
    }, 0) / numLevels;
    const evenness = 1 / (1 + variance);

    const score = numLevels * evenness;

    if (score > bestScore) {
      bestScore = score;
      bestSkill = skillId;
      bestLevels = levels;
    }
  }

  if (bestSkill === null) {
    throw new Error("No skill found to split on");
  }

  return [bestSkill, bestLevels];
}

/**
 * Build skill tree recursively
 */
function buildNode(
  combinations: CombinationData[],
  selectedSkills: Map<number, number>,
  depth: number = 0
): SkillTreeNode {
  const indent = "  ".repeat(depth);

  // Base case: few enough to show
  if (combinations.length <= 25) {
    console.log(`${indent}Leaf node: ${combinations.length} combinations`);
    return {
      possibleSkills: {},
      combinationCount: combinations.length,
      children: {},
      combinations: combinations.map((c) => c.armorIds),
    };
  }

  console.log(`${indent}Node: ${combinations.length} combinations, depth ${depth}`);

  // Find all possible next skill selections
  const possibleSkillsMap = findPossibleSkills(combinations, selectedSkills);

  // Convert to Record<number, number[]>
  const possibleSkills: Record<number, number[]> = {};
  for (const skillIdStr in possibleSkillsMap) {
    const skillId = Number(skillIdStr);
    possibleSkills[skillId] = Array.from(possibleSkillsMap[skillId]).sort((a, b) => a - b);
  }

  // If no possible skills, return leaf
  if (Object.keys(possibleSkills).length === 0) {
    console.log(`${indent}Leaf node (no more skills): ${combinations.length} combinations`);
    return {
      possibleSkills: {},
      combinationCount: combinations.length,
      children: {},
      combinations: combinations.map((c) => c.armorIds),
    };
  }

  // Choose best skill to split on
  const [bestSkillId, levels] = chooseBestSkillToSplit(combinations, possibleSkillsMap);

  console.log(`${indent}Splitting on skill ${bestSkillId} with levels [${levels.join(", ")}]`);

  // Build child nodes for each level
  const children: Record<string, SkillTreeNode> = {};

  for (const level of levels) {
    const filtered = filterBySkill(combinations, bestSkillId, level);

    if (filtered.length === 0) continue;

    const childSelectedSkills = new Map(selectedSkills);
    childSelectedSkills.set(bestSkillId, level);

    const key = `${bestSkillId}:${level}`;
    children[key] = buildNode(filtered, childSelectedSkills, depth + 1);
  }

  return {
    possibleSkills,
    combinationCount: combinations.length,
    children,
  };
}

/**
 * Build the complete skill tree from all combinations
 */
export function buildSkillTree(combinations: CombinationData[]): SkillTreeNode {
  console.log("\nBuilding skill tree...");
  const startTime = Date.now();

  const tree = buildNode(combinations, new Map());

  const elapsed = (Date.now() - startTime) / 1000;
  console.log(`\nBuilt skill tree in ${elapsed.toFixed(1)}s`);

  return tree;
}
