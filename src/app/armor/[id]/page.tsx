import ArmorInfo from "@/app/armor/[id]/ArmorInfo";
import { getData } from "@/app/armor/[id]/data";
import { rarityColor } from "@/app/utils";
import { Card, SimpleGrid, Text } from "@mantine/core";
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
      <SimpleGrid cols={2}>
        <Text fw={500} c={`${rarityColor[data.armor.rarity]}.9`}>
          {data.armor.name}
        </Text>
      </SimpleGrid>
      <ArmorInfo {...data} />
    </Card>
  );
}
