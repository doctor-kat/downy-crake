import { SkillTreeNode } from "./types";

let cachedTree: SkillTreeNode | null = null;

/**
 * Load the pre-generated skill tree
 * Uses static import for better performance and tree-shaking
 */
export async function loadSkillTree(): Promise<SkillTreeNode> {
  if (cachedTree) {
    return cachedTree;
  }

  try {
    // Dynamic import of the JSON file
    const module = await import("../../../public/data/skill-tree.json");
    cachedTree = module.default as SkillTreeNode;
    return cachedTree;
  } catch (error) {
    console.error("Failed to load skill tree:", error);
    throw new Error(
      "Skill tree data not found. Please run 'pnpm generate:tree' to generate it."
    );
  }
}

/**
 * Check if skill tree exists
 */
export function hasSkillTree(): boolean {
  return cachedTree !== null;
}
