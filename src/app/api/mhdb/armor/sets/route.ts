import { ArmorSet } from "@/app/api/mhdb/armor/sets/ArmorSet";
import { baseUrl } from "@/app/api/mhdb/endpoint";
import { NextRequest } from "next/server";

export async function GET({}: NextRequest) {
  const response = await fetch(`${baseUrl}/armor/sets`);
  const armorSets: ArmorSet[] = await response.json();
  return Response.json(armorSets);
}
