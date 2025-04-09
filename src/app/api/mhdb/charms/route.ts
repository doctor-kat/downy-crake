import { getAllCharms } from "@/app/api/mhdb/charms/index";

export async function GET() {
  return Response.json(await getAllCharms());
}
