import { getAllArmor } from "@/app/api/mhdb/armor/index";

export async function GET() {
  return Response.json(await getAllArmor());
}
