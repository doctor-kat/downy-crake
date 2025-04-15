import { WeaponKind } from "@/app/api/mhdb/weapons/WeaponKind";
import { rarityColor } from "@/app/utils";
import { getData } from "@/app/weapon/[kind]/[id]/data";
import WeaponInfo from "@/app/weapon/[kind]/[id]/WeaponInfo";
import { Card, Text } from "@mantine/core";
import React from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ kind: WeaponKind; id: number }>;
}) {
  const { kind, id } = await params;
  const data = await getData({ id });

  return (
    <Card>
      <Text fw={500} c={`${rarityColor[data.weapon.rarity]}.9`}>
        {data.weapon.name}
      </Text>
      <WeaponInfo {...data} />
    </Card>
  );
}
