import { SkillTreeNode, SelectionState } from "./types";

export class SkillTreeNavigator {
  private rootNode: SkillTreeNode;
  private currentNode: SkillTreeNode;
  private selections: Map<number, number>;

  constructor(tree: SkillTreeNode) {
    this.rootNode = tree;
    this.currentNode = tree;
    this.selections = new Map();
  }

  /**
   * Get currently possible skills and their levels
   */
  getPossibleSkills(): Record<number, number[]> {
    return this.currentNode.possibleSkills;
  }

  /**
   * Check if a skill selection is valid
   */
  canSelectSkill(skillId: number, level: number): boolean {
    const key = `${skillId}:${level}`;
    return this.currentNode.children[key] !== undefined;
  }

  /**
   * Select a skill level
   */
  selectSkill(skillId: number, level: number): boolean {
    const key = `${skillId}:${level}`;
    const child = this.currentNode.children[key];

    if (!child) {
      return false;
    }

    this.selections.set(skillId, level);
    this.currentNode = child;
    return true;
  }

  /**
   * Deselect a skill (rebuild path from root)
   */
  deselectSkill(skillId: number): boolean {
    if (!this.selections.has(skillId)) {
      return false;
    }

    // Remove the selection
    this.selections.delete(skillId);

    // Rebuild path from root with remaining selections
    this.currentNode = this.rootNode;

    // Re-apply remaining selections in order
    const sortedSelections = Array.from(this.selections.entries()).sort(
      (a, b) => a[0] - b[0]
    );

    for (const [sid, level] of sortedSelections) {
      const key = `${sid}:${level}`;
      const child = this.currentNode.children[key];

      if (!child) {
        // Path is invalid, reset to root
        this.currentNode = this.rootNode;
        this.selections.clear();
        return false;
      }

      this.currentNode = child;
    }

    return true;
  }

  /**
   * Clear all selections
   */
  clearSelections(): void {
    this.selections.clear();
    this.currentNode = this.rootNode;
  }

  /**
   * Get current state
   */
  getState(): SelectionState {
    return {
      selectedSkills: new Map(this.selections),
      currentNode: this.currentNode,
      combinationCount: this.currentNode.combinationCount,
      isComplete: this.currentNode.combinationCount <= 25,
    };
  }

  /**
   * Get final combinations (only available when isComplete is true)
   */
  getCombinations() {
    return this.currentNode.combinations || [];
  }

  /**
   * Get selected skills
   */
  getSelectedSkills(): Map<number, number> {
    return new Map(this.selections);
  }
}
