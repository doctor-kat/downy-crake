import {getAllArmorSets} from "@/app/api/mhdb/armor/sets";
import {getAllDecorations} from "@/app/api/mhdb/decorations";
import {getAllSkills} from "@/app/api/mhdb/skills";
import Client from "@/app/loadout/client";
import React from "react";

export default async function Page() {
  const armorSets = await getAllArmorSets();
  const decorations = await getAllDecorations();
  const skills = await getAllSkills();

  return (
    <Client
      data={{
        armorSets,
        decorations,
        skills,
      }}
    />
  );
}
