import { getArmor } from "@/app/api/mhdb/armor";
import { getArmorSet } from "@/app/api/mhdb/armor/sets";
import { getAllSkills } from "@/app/api/mhdb/skills";

export async function getData({ id }: { id: number }) {
  const armor = await getArmor({ id });
  const armorSet = await getArmorSet({ id: armor.armorSet.id! });
  const allSkills = Object.groupBy(await getAllSkills(), (skill) => skill.id);

  const skills = [
    ...armorSet.pieces.flatMap((armor) =>
      armor.skills.map((skillRank) => skillRank.skill.id)
    ),
    armorSet.bonus?.skill.id,
    armorSet.groupBonus?.skill.id,
  ]
    .filter(
      (id): id is number => id !== undefined && allSkills[id] !== undefined
    )
    .map((id) => allSkills[id]![0]);

  return { armor, armorSet, skills };
}
