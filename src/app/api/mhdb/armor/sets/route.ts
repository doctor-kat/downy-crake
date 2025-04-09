import { getAllArmorSets } from "@/app/api/mhdb/armor/sets/index";
import { NextRequest } from "next/server";

export async function GET({}: NextRequest) {
  return Response.json(await getAllArmorSets());
}
