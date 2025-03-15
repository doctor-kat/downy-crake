import { Armor } from "@/app/api/mhdb/armor/Armor";
import { baseUrl } from "@/app/api/mhdb/endpoint";
import { NextRequest } from "next/server";

export async function GET({}: NextRequest) {
  const response = await fetch(`${baseUrl}/armor`);
  const armor: Armor[] = await response.json();
  return Response.json(armor);
}
