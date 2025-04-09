import { baseUrl } from "@/app/api/mhdb/endpoint";
import { Item } from "@/app/api/mhdb/items/Item";
import { NextRequest } from "next/server";

export async function GET({}: NextRequest) {
  const response = await fetch(`${baseUrl}/items`, {
    cache: "force-cache",
  });
  const items: Item[] = await response.json();
  return Response.json(items);
}
