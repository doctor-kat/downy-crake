import { WeaponKind } from "@/app/api/mhdb/weapons/WeaponKind";
import WeaponModal from "@/app/weapon/[kind]/@modal/(.)[id]/WeaponModal";
import { getData } from "@/app/weapon/[kind]/[id]/data";
import React from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ kind: WeaponKind; id: number }>;
}) {
  const { id } = await params;
  const data = await getData({ id });

  return <WeaponModal {...data} />;
}
