import { getAllSkills } from "@/app/api/mhdb/skills";
import Client from "@/app/skills/client";
import React from "react";

export default async function Page() {
  const skills = await getAllSkills();

  return <Client data={{ skills }} />;
}
