import { Decoration } from "../../src/app/api/mhdb/decorations/Decoration";
import { getAllDecorations } from "../../src/app/api/mhdb/decorations/index";

export async function loadDecorationData(): Promise<Decoration[]> {
  console.log("Fetching decoration data from API...");

  const decorations = await getAllDecorations();

  console.log(`Loaded ${decorations.length} decorations`);

  // Group by slot size
  const bySlot: Record<number, number> = {};
  for (const deco of decorations) {
    bySlot[deco.slot] = (bySlot[deco.slot] || 0) + 1;
  }

  for (const [slot, count] of Object.entries(bySlot)) {
    console.log(`  Slot ${slot}: ${count} decorations`);
  }

  return decorations;
}

/**
 * Find the best decorations for each skill by slot size
 */
export function indexDecorationsBySkill(decorations: Decoration[]): Map<
  number,
  Map<number, Decoration>
> {
  // Map: skillId -> slotSize -> best decoration for that skill/slot combo
  const index = new Map<number, Map<number, Decoration>>();

  for (const decoration of decorations) {
    for (const skillRank of decoration.skills) {
      const skillId = skillRank.skill.id;
      const slotSize = decoration.slot;
      const level = skillRank.level;

      if (!index.has(skillId)) {
        index.set(skillId, new Map());
      }

      const skillMap = index.get(skillId)!;
      const existing = skillMap.get(slotSize);

      // Keep the decoration that provides the highest level for this skill
      if (!existing || level > existing.skills[0].level) {
        skillMap.set(slotSize, decoration);
      }
    }
  }

  return index;
}
