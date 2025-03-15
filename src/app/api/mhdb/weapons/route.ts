import { baseUrl } from "@/app/api/mhdb/endpoint";
import { Weapon } from "@/app/api/mhdb/weapons/Weapon";
import { NextRequest } from "next/server";

export async function GET({}: NextRequest) {
  const response = await fetch(`${baseUrl}/weapons`);
  const weapons: Weapon[] = await response.json();
  return Response.json(weapons);
}
