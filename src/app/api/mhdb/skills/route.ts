import { baseUrl } from "@/app/api/mhdb/endpoint";
import { Skill } from "@/app/api/mhdb/skills/Skill";
import { NextRequest } from "next/server";

export async function getAllSkills() {
  const response = await fetch(`${baseUrl}/skills`, {
    cache: "force-cache",
  });
  const skills: Skill[] = await response.json();
  return skills;
}

export async function getSkill({ id }: { id: string }) {
  const response = await fetch(`${baseUrl}/skills/${id}`, {
    cache: "force-cache",
  });
  const skill: Skill[] = await response.json();
  return skill;
}

export async function GET({}: NextRequest) {
  return Response.json(await getAllSkills());
}
