import { getAllArmor, getArmor } from "@/app/api/mhdb/armor/route";
import { getAllArmorSets } from "@/app/api/mhdb/armor/sets/route";
import { getAllSkills } from "@/app/api/mhdb/skills/route";
import Client from "@/app/armor/client";
import React from "react";

export default async function Page() {
  const armors = await getAllArmor();
  const armorSets = await getAllArmorSets();
  const skills = await getAllSkills();

  return <Client data={{ armors, armorSets, skills }} />;
}
