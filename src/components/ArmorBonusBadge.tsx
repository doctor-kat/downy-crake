import { ArmorSet } from "@/app/api/mhdb/armor/sets/ArmorSet";
import { Badge, Group, Stack, Text, Tooltip } from "@mantine/core";
import Image from "next/image";
import React from "react";

export default function ArmorBonusBadge({
  armorSet,
  set,
  group,
}: {
  armorSet: ArmorSet;
  set?: boolean;
  group?: boolean;
}) {
  const armorSetBonus = group ? armorSet.groupBonus : armorSet.bonus;

  return (
    <Tooltip
      label={
        <Stack gap="0">
          {armorSetBonus!.ranks.map((armorSetBonusRank) => (
            <Group wrap="nowrap">
              <Badge circle>{armorSetBonusRank.pieces}</Badge>
              <Text>
                {armorSetBonusRank.skill.name}:{" "}
                {armorSetBonusRank.skill.description}
              </Text>
            </Group>
          ))}
        </Stack>
      }
    >
      <Badge
        leftSection={
          <Image
            src={`/icon/skills/${group ? "group" : "set"}.png`}
            alt={group ? "group" : "set"}
            width={20}
            height={20}
          />
        }
      >
        {armorSetBonus!.skill.name}
      </Badge>
    </Tooltip>
  );
}
