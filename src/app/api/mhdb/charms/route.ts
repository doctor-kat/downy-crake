import { Charm } from "@/app/api/mhdb/charms/Charm";
import { baseUrl } from "@/app/api/mhdb/endpoint";
import { NextRequest } from "next/server";

export async function GET({}: NextRequest) {
  const response = await fetch(`${baseUrl}/charms`);
  const charms: Charm[] = await response.json();
  return Response.json(charms);
}
