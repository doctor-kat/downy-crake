import { baseUrl } from "@/app/api/mhdb/endpoint";
import { Weapon } from "@/app/api/mhdb/weapons/Weapon";

export async function getWeapon({ id }: { id?: string }) {
  const response = await fetch(`${baseUrl}/weapon/${id}`, {
    cache: "force-cache",
  });
  const weapon: Weapon = await response.json();
  return weapon;
}

export async function getAllWeapons() {
  const response = await fetch(`${baseUrl}/weapons`, {
    cache: "force-cache",
  });
  const weapons: Weapon[] = await response.json();
  return weapons;
}
