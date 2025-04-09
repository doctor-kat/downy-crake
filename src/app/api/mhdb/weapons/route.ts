import { getAllWeapons } from "@/app/api/mhdb/weapons/index";

export async function GET() {
  return Response.json(await getAllWeapons());
}
