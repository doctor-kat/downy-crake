import { getAllSkills } from "@/app/api/mhdb/skills";
import { getWeapon } from "@/app/api/mhdb/weapons";

export async function getData({ id }: { id: number }) {
  const weapon = await getWeapon({ id });
  const allSkills = Object.groupBy(await getAllSkills(), (skill) => skill.id);

  const skills = (weapon.skills ?? [])
    .map((skillRank) => skillRank.skill.id)
    .map((id) => allSkills[id!]![0]);

  return { weapon, skills };
}
