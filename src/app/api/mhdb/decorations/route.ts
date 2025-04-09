import { Decoration } from "@/app/api/mhdb/decorations/Decoration";
import { baseUrl } from "@/app/api/mhdb/endpoint";
import { NextRequest } from "next/server";

export async function GET({}: NextRequest) {
  const response = await fetch(`${baseUrl}/decorations`, {
    cache: "force-cache",
  });
  const decorations: Decoration[] = await response.json();
  return Response.json(decorations);
}
