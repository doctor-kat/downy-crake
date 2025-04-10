import { getWeaponsByKind } from "@/app/api/mhdb/weapons";
import { Weapon } from "@/app/api/mhdb/weapons/Weapon";
import { WeaponKind } from "@/app/api/mhdb/weapons/WeaponKind";
import { artianOverride, artianWeaponIds } from "@/app/weapon/[kind]/artian";
import Client from "@/app/weapon/[kind]/client";

export default async function Page({
  params,
}: {
  params: Promise<{ kind: WeaponKind }>;
}) {
  const { kind } = await params;
  const weaponsRaw = await getWeaponsByKind({ kind });

  // add fake series and crafting for Artian weapons
  const weapons = weaponsRaw.map((weapon) =>
    artianWeaponIds.includes(weapon.id)
      ? ({
          ...weapon,
          ...artianOverride(weapon),
        } as Weapon)
      : weapon
  );

  return <Client data={{ weapons }} />;
}
