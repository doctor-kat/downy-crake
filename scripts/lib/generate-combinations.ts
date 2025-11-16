import { Armor, ArmorKind } from "../../src/app/api/mhdb/armor/Armor";
import { Decoration } from "../../src/app/api/mhdb/decorations/Decoration";
import { CombinationData, SkillSignature } from "./types";

/**
 * Calculate skill signature for a combination of armor pieces
 */
function calculateSkills(pieces: Armor[]): SkillSignature {
  const skills: SkillSignature = {};

  for (const piece of pieces) {
    for (const skillRank of piece.skills) {
      const skillId = skillRank.skill.id;
      skills[skillId] = (skills[skillId] || 0) + skillRank.level;
    }
  }

  return skills;
}

/**
 * Calculate maximum potential skills if all decoration slots are optimally filled
 */
function calculateMaxPotentialSkills(
  baseSkills: SkillSignature,
  decorationSlots: number[],
  decorationIndex: Map<number, Map<number, Decoration>>
): SkillSignature {
  const maxSkills = { ...baseSkills };

  // For each skill in the decoration index, try to maximize it with available slots
  for (const [skillId, slotMap] of decorationIndex.entries()) {
    // Sort slots descending (use bigger slots first)
    const availableSlots = [...decorationSlots].sort((a, b) => b - a);
    const usedSlots = new Set<number>();

    // Try to add as much of this skill as possible
    for (let i = 0; i < availableSlots.length; i++) {
      if (usedSlots.has(i)) continue;

      const slotSize = availableSlots[i];

      // Find best decoration for this slot size that provides this skill
      for (let size = slotSize; size >= 1; size--) {
        const decoration = slotMap.get(size);
        if (decoration) {
          const skillRank = decoration.skills.find((sr) => sr.skill.id === skillId);
          if (skillRank) {
            maxSkills[skillId] = (maxSkills[skillId] || 0) + skillRank.level;
            usedSlots.add(i);
            break;
          }
        }
      }
    }
  }

  return maxSkills;
}

/**
 * Get all decoration slots from a set of armor pieces
 */
function getDecorationSlots(pieces: Armor[]): number[] {
  const slots: number[] = [];

  for (const piece of pieces) {
    for (const slotSize of piece.slots) {
      if (slotSize > 0) {
        slots.push(slotSize);
      }
    }
  }

  return slots.sort((a, b) => b - a);  // Sort descending
}

/**
 * Generate all armor combinations (Cartesian product)
 * Uses a generator to avoid loading all combinations into memory
 */
export function* generateCombinations(
  armorByKind: Map<ArmorKind, Armor[]>,
  decorationIndex: Map<number, Map<number, Decoration>>
): Generator<CombinationData> {
  const heads = armorByKind.get(ArmorKind.head) || [];
  const chests = armorByKind.get(ArmorKind.chest) || [];
  const arms = armorByKind.get(ArmorKind.arms) || [];
  const waists = armorByKind.get(ArmorKind.waist) || [];
  const legs = armorByKind.get(ArmorKind.legs) || [];

  const totalCombinations = heads.length * chests.length * arms.length * waists.length * legs.length;
  console.log(`Generating ${totalCombinations.toLocaleString()} combinations...`);
  console.log(`  Heads: ${heads.length}, Chests: ${chests.length}, Arms: ${arms.length}, Waists: ${waists.length}, Legs: ${legs.length}`);

  let count = 0;
  const startTime = Date.now();
  let lastLog = startTime;

  for (const head of heads) {
    for (const chest of chests) {
      for (const arm of arms) {
        for (const waist of waists) {
          for (const leg of legs) {
            const pieces = [head, chest, arm, waist, leg];
            const skills = calculateSkills(pieces);
            const decorationSlots = getDecorationSlots(pieces);
            const maxPotentialSkills = calculateMaxPotentialSkills(
              skills,
              decorationSlots,
              decorationIndex
            );

            yield {
              armorIds: {
                head: head.id,
                chest: chest.id,
                arms: arm.id,
                waist: waist.id,
                legs: leg.id,
              },
              skills,
              decorationSlots,
              maxPotentialSkills,
            };

            count++;

            // Log progress every 2 seconds
            const now = Date.now();
            if (now - lastLog > 2000) {
              const elapsed = (now - startTime) / 1000;
              const rate = count / elapsed;
              const remaining = (totalCombinations - count) / rate;
              const progress = ((count / totalCombinations) * 100).toFixed(1);
              console.log(`  Generated ${count.toLocaleString()}/${totalCombinations.toLocaleString()} (${progress}%) - ${rate.toFixed(0)}/s - ${remaining.toFixed(0)}s remaining`);
              lastLog = now;
            }
          }
        }
      }
    }
  }

  const elapsed = (Date.now() - startTime) / 1000;
  console.log(`Generated ${count.toLocaleString()} combinations in ${elapsed.toFixed(1)}s`);
}
