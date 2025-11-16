import { Armor, ArmorKind } from "../../src/app/api/mhdb/armor/Armor";
import { getAllArmor } from "../../src/app/api/mhdb/armor/index";

export async function loadArmorData(): Promise<Map<ArmorKind, Armor[]>> {
  console.log("Fetching armor data from API...");

  const allArmor = await getAllArmor();

  console.log(`Loaded ${allArmor.length} armor pieces`);

  // Group by armor kind
  const armorByKind = new Map<ArmorKind, Armor[]>();

  for (const armor of allArmor) {
    if (!armorByKind.has(armor.kind)) {
      armorByKind.set(armor.kind, []);
    }
    armorByKind.get(armor.kind)!.push(armor);
  }

  // Log counts per slot
  for (const [kind, pieces] of armorByKind.entries()) {
    console.log(`  ${kind}: ${pieces.length} pieces`);
  }

  return armorByKind;
}
