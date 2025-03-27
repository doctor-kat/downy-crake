import { getArmor } from "@/app/api/mhdb/armor/route";
import { getSkills } from "@/app/api/mhdb/skills/route";
import Client from "@/app/armor/client";
import React from "react";

export default async function Page() {
  const armors = await getArmor();
  const skills = await getSkills();

  return <Client {...{ armors, skills }} />;
}
