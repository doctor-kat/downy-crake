import { baseUrl } from "@/app/api/mhdb/endpoint";
import { Skill } from "@/app/api/mhdb/skills/Skill";

export async function getAllSkills() {
  const response = await fetch(`${baseUrl}/skills`, {
    cache: "force-cache",
  });
  const skills: Skill[] = await response.json();
  return skills;
}

export async function getSkill({ id }: { id: number }) {
  const response = await fetch(`${baseUrl}/skills/${id}`, {
    cache: "force-cache",
  });
  const skill: Skill = await response.json();
  return skill;
}
