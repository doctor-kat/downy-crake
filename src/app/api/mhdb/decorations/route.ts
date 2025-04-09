import { getAllDecorations } from "@/app/api/mhdb/decorations/index";

export async function GET() {
  return Response.json(await getAllDecorations());
}
