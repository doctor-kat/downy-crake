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

export async function getWeapon({ id }: { id: number }) {
  const response = await fetch(`${baseUrl}/weapons/${id}`, {
    cache: "force-cache",
  });
  const weapon: Weapon = await response.json();
  return weapon;
}

export async function getAllWeapons() {
  // const response = await fetch(`${baseUrl}/weapons`, {
  //   cache: "force-cache", // items over 2MB can not be cached
  // });
  const weapons = (
    await Promise.all(
      Object.keys(WeaponKind).map((kind) =>
        getWeaponsByKind({ kind: kind as WeaponKind })
      )
    )
  ).flat();
  return weapons;
}
