import { getAllCharms } from "@/app/api/mhdb/charms";
import { getAllSkills } from "@/app/api/mhdb/skills";
import Client from "@/app/charms/client";
import React from "react";

export default async function Page() {
  const charms = await getAllCharms();
  const allSkills = await getAllSkills();

  const charmSkillIds = charms.reduce<Set<number>>((acc, charm) => {
    charm.ranks.forEach((charmRank) =>
      charmRank.skills.forEach((skillRank) => acc.add(skillRank.skill.id!))
    );
    return acc;
  }, new Set());
  const skills = allSkills.filter((skill) => charmSkillIds.has(skill.id));

  return <Client data={{ charms, skills }} />;
}
