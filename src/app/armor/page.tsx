import { getAllArmor } from "@/app/api/mhdb/armor";
import { getAllArmorSets } from "@/app/api/mhdb/armor/sets";
import { getAllSkills } from "@/app/api/mhdb/skills";
import Client from "@/app/armor/client";
import React from "react";

export default async function Page() {
  const armors = await getAllArmor();
  const armorSets = await getAllArmorSets();
  const skills = await getAllSkills();

  return <Client data={{ armors, armorSets, skills }} />;
}
