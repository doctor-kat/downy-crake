import { getWeaponsByKind } from "@/app/api/mhdb/weapons";
import { WeaponKind } from "@/app/api/mhdb/weapons/WeaponKind";

export default async function Page({
  params,
}: {
  params: Promise<{ kind: WeaponKind }>;
}) {
  const { kind } = await params;
  const weapons = await getWeaponsByKind({ kind });

  return JSON.stringify(weapons);
}
