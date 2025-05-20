import ArmorInfo from "@/app/armor/[id]/ArmorInfo";
import { getData } from "@/app/armor/[id]/data";
import AddToLoadout from "@/app/loadout/components/AddToLoadout";
import { rarityColor } from "@/app/utils";
import { Card, Text } from "@mantine/core";
import React from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const data = await getData({ id });

  return (
    <Card>
      <Text fw={500} c={`${rarityColor[data.armor.rarity]}.9`}>
        {data.armor.name}
      </Text>
      <ArmorInfo {...data} />
      <AddToLoadout armor={data.armor} />
    </Card>
  );
}
