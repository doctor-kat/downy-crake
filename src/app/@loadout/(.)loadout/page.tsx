import { getAllArmorSets } from "@/app/api/mhdb/armor/sets";
import { getAllDecorations } from "@/app/api/mhdb/decorations";
import { getAllSkills } from "@/app/api/mhdb/skills";
import React from "react";
import LoadoutModal from "./LoadoutModal";

export default async function Page() {
  // const weapons = await getAllWeapons();
  // const armors = await getAllArmor();
  const armorSets = await getAllArmorSets();
  // const charms = await getAllCharms();
  const decorations = await getAllDecorations();
  const skills = await getAllSkills();

  return (
    <LoadoutModal
      data={{
        // weapons,
        // armors,
        armorSets,
        // charms: charms.flatMap((charm) => charm.ranks),
        decorations,
        skills,
      }}
    />
  );
}
