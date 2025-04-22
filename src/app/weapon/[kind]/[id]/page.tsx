import { WeaponKind } from "@/app/api/mhdb/weapons/WeaponKind";
import { rarityColor } from "@/app/utils";
import BasicWeaponInfo from "@/app/weapon/[kind]/[id]/BasicWeaponInfo";
import { getData } from "@/app/weapon/[kind]/[id]/data";
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
      <Text size="xs" c="dimmed" className="italic">
        {data.weapon.description}
      </Text>
      <BasicWeaponInfo {...data} />
    </Card>
  );
}
