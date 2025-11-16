"use client";

import { ArmorSet } from "@/app/api/mhdb/armor/sets/ArmorSet";
import { ICON_SIZE } from "@/app/utils";
import { Badge, Card, Group, Stack, Text } from "@mantine/core";
import Image from "next/image";
import React from "react";

export default function ArmorBonusGroup({
  data,
  pieces,
  group,
  showDisabledBonuses = false,
}: {
  data: {
    armorSet: ArmorSet;
  };
  set?: boolean;
  group?: boolean;
  pieces: number;
  showDisabledBonuses?: boolean;
}) {
  const bonus = group ? data.armorSet.groupBonus : data.armorSet.bonus;
  if (
    !showDisabledBonuses &&
    bonus!.ranks.every((armorSetBonusRank) => pieces < armorSetBonusRank.pieces)
  ) {
    return null;
  }

  return (
    <Card p="xs">
      <Group>
        <Image
          src={`/icon/skills/${group ? "group" : "set"}.png`}
          alt={group ? "group" : "set"}
          width={ICON_SIZE.XL}
          height={ICON_SIZE.XL}
        />
        <Stack>
          <Text>{bonus!.skill.name}</Text>
          <Stack gap="0">
            {bonus!.ranks.map((armorSetBonusRank) => (
              <Group>
                <Badge
                  circle
                  color="yellow"
                  variant={
                    pieces >= armorSetBonusRank.pieces ? "filled" : "default"
                  }
                >
                  {armorSetBonusRank.pieces}
                </Badge>
                <Text>{armorSetBonusRank.skill.name}</Text>
              </Group>
            ))}
          </Stack>
        </Stack>
      </Group>
    </Card>
  );
}
