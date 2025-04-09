import { getAllSkills } from "@/app/api/mhdb/skills/index";

export async function GET() {
  return Response.json(await getAllSkills());
}
