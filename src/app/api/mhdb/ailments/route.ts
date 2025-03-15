import { Ailment } from "@/app/api/mhdb/ailments/Ailment";
import { baseUrl } from "@/app/api/mhdb/endpoint";
import { NextRequest } from "next/server";

export async function GET({}: NextRequest) {
  const response = await fetch(`${baseUrl}/ailments`);
  const ailments: Ailment[] = await response.json();
  return Response.json(ailments);
}
