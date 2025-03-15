import { baseUrl } from "@/app/api/mhdb/endpoint";
import { Skill } from "@/app/api/mhdb/skills/Skill";
import { NextRequest } from "next/server";

export async function GET({}: NextRequest) {
  const response = await fetch(`${baseUrl}/skills`);
  const skills: Skill[] = await response.json();
  return Response.json(skills);
}
