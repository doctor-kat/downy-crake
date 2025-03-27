import { Armor } from "@/app/api/mhdb/armor/Armor";
import { baseUrl } from "@/app/api/mhdb/endpoint";

export async function getArmor() {
  const response = await fetch(`${baseUrl}/armor`);
  const armor: Armor[] = await response.json();
  return armor;
}

export async function GET() {
  return Response.json(await getArmor());
}
