import { getAllArmor } from "@/app/api/mhdb/armor";
import { getAllArmorSets } from "@/app/api/mhdb/armor/sets";
import { getAllSkills } from "@/app/api/mhdb/skills";
import Client from "@/app/armor/client";
import React from "react";

export default async function Page() {
  const armors = await getAllArmor();
  const armorSets = await getAllArmorSets();
  const allSkills = await getAllSkills();

  const skillIds = new Set<number>();
  armors.forEach((armor) => {
    armor.skills.forEach((skillRank) => skillIds.add(skillRank.skill.id!));
  });
  const skills = allSkills.filter((skill) => skillIds.has(skill.id));

  const bonusSkillIds = new Set<number>();
  armorSets.forEach((armorSet) => {
    if (armorSet.bonus) {
      bonusSkillIds.add(armorSet.bonus.skill.id);
    }

    if (armorSet.groupBonus) {
      bonusSkillIds.add(armorSet.groupBonus.skill.id);
    }
  });
  const bonusSkills = allSkills.filter((skill) => bonusSkillIds.has(skill.id));

  return <Client data={{ armors, armorSets, skills, bonusSkills }} />;
}
