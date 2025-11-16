import { ArmorSet } from "@/app/api/mhdb/armor/sets/ArmorSet";
import { ICON_SIZE } from "@/app/utils";
import { Badge, Group, Stack, Text, Tooltip } from "@mantine/core";
import Image from "next/image";
import React from "react";

export default function ArmorBonusBadge({
  armorSet,
  set,
  group,
  disabled,
}: {
  armorSet: ArmorSet;
  set?: boolean;
  group?: boolean;
  disabled?: boolean;
}) {
  const armorSetBonus = group ? armorSet.groupBonus : armorSet.bonus;

  return (
    <Tooltip
      label={
        <Stack gap="0">
          {armorSetBonus?.ranks.map((armorSetBonusRank) => (
            <Group key={armorSetBonusRank.id} wrap="nowrap">
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
        className={disabled ? "opacity-25" : undefined}
        leftSection={
          <Image
            src={`/icon/skills/${group ? "group" : "set"}.png`}
            alt={group ? "group" : "set"}
            width={ICON_SIZE.SM}
            height={ICON_SIZE.SM}
          />
        }
      >
        {armorSetBonus?.skill.name}
      </Badge>
    </Tooltip>
  );
}
