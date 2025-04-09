import { baseUrl } from "@/app/api/mhdb/endpoint";
import { Weapon } from "@/app/api/mhdb/weapons/Weapon";
import { WeaponKind } from "@/app/api/mhdb/weapons/WeaponKind";

export async function getWeaponsByKind({ kind }: { kind: WeaponKind }) {
  const response = await fetch(`${baseUrl}/weapons?q={"kind": "${kind}"}`, {
    cache: "force-cache",
  });
  const weapons: Weapon[] = await response.json();
  return weapons;
}

export async function getAllWeapons() {
  const response = await fetch(`${baseUrl}/weapons`, {
    cache: "force-cache",
  });
  const weapons: Weapon[] = await response.json();
  return weapons;
}
