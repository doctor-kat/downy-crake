import { getAllAilments } from "@/app/api/mhdb/ailments/index";

export async function GET() {
  return Response.json(await getAllAilments());
}
