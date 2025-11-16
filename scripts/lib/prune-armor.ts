import { Armor } from "../../src/app/api/mhdb/armor/Armor";
import { SkillSignature } from "./types";

/**
 * Convert armor skills to a signature map for comparison
 */
function getSkillSignature(armor: Armor): SkillSignature {
  const signature: SkillSignature = {};
  for (const skillRank of armor.skills) {
    signature[skillRank.skill.id] = skillRank.level;
  }
  return signature;
}

/**
 * Check if armor B dominates armor A
 * B dominates A if:
 * - B has >= defense
 * - B has >= all elemental resistances
 * - B has >= decoration slots
 * - B has >= all skill levels that A has
 * - B is not worse in any dimension
 */
function dominates(a: Armor, b: Armor): boolean {
  if (a.id === b.id) return false;

  // Defense check
  if (b.defense.base < a.defense.base) return false;

  // Resistance checks
  if (b.resistances.fire < a.resistances.fire) return false;
  if (b.resistances.water < a.resistances.water) return false;
  if (b.resistances.ice < a.resistances.ice) return false;
  if (b.resistances.thunder < a.resistances.thunder) return false;
  if (b.resistances.dragon < a.resistances.dragon) return false;

  // Decoration slots check (total slot count)
  const aSlots = a.slots.reduce((sum, slot) => sum + slot, 0);
  const bSlots = b.slots.reduce((sum, slot) => sum + slot, 0);
  if (bSlots < aSlots) return false;

  // Skill checks
  const aSkills = getSkillSignature(a);
  const bSkills = getSkillSignature(b);

  // B must have all skills that A has, at same or higher level
  for (const skillId in aSkills) {
    const aLevel = aSkills[skillId];
    const bLevel = bSkills[skillId] || 0;
    if (bLevel < aLevel) return false;
  }

  // At this point, B is >= A in all dimensions
  // Now check if B is strictly better in at least one dimension
  let strictlyBetter = false;

  if (b.defense.base > a.defense.base) strictlyBetter = true;
  if (b.resistances.fire > a.resistances.fire) strictlyBetter = true;
  if (b.resistances.water > a.resistances.water) strictlyBetter = true;
  if (b.resistances.ice > a.resistances.ice) strictlyBetter = true;
  if (b.resistances.thunder > a.resistances.thunder) strictlyBetter = true;
  if (b.resistances.dragon > a.resistances.dragon) strictlyBetter = true;
  if (bSlots > aSlots) strictlyBetter = true;

  // Check if B has any skill better than A, or a skill that A doesn't have
  for (const skillId in bSkills) {
    const aLevel = aSkills[skillId] || 0;
    const bLevel = bSkills[skillId];
    if (bLevel > aLevel) {
      strictlyBetter = true;
      break;
    }
  }

  return strictlyBetter;
}

/**
 * Remove dominated armor pieces
 * Returns only the Pareto-optimal armor pieces
 */
export function pruneArmor(pieces: Armor[]): Armor[] {
  console.log(`  Pruning ${pieces.length} pieces...`);

  const viable: Armor[] = [];

  for (const armor of pieces) {
    // Check if any existing viable armor dominates this one
    const isDominated = viable.some((other) => dominates(armor, other));

    if (!isDominated) {
      // Remove any viable armor that this one dominates
      const filtered = viable.filter((other) => !dominates(other, armor));
      filtered.push(armor);
      viable.length = 0;
      viable.push(...filtered);
    }
  }

  console.log(`  Pruned to ${viable.length} viable pieces (${((viable.length / pieces.length) * 100).toFixed(1)}% remaining)`);

  return viable;
}
