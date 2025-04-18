import { getAllDecorations } from "@/app/api/mhdb/decorations";
import { getAllSkills } from "@/app/api/mhdb/skills";
import Client from "@/app/decorations/client";
import React from "react";

export default async function Page() {
  const decorations = await getAllDecorations();
  const allSkills = await getAllSkills();

  const decorationSkillIds = decorations.reduce<Set<number>>(
    (acc, decoration) => {
      decoration.skills.forEach((skillRank) => acc.add(skillRank.skill.id!));
      return acc;
    },
    new Set()
  );
  const skills = allSkills.filter((skill) => decorationSkillIds.has(skill.id));

  return <Client data={{ decorations, skills }} />;
}
