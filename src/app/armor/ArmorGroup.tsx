"use client";

import { Armor, ArmorKind } from "@/app/api/mhdb/armor/Armor";
import { ActionIcon, Group } from "@mantine/core";
import Image from "next/image";
import React from "react";

export default function ArmorGroup({
  armors,
  onClick,
}: {
  armors: Armor[];
  onClick: (armor: Armor) => void;
}) {
  const armorMap = Object.fromEntries(
    Object.values(ArmorKind).map((armorKind) => [
      armorKind,
      armors.filter((armor) => armorKind === armor.kind)?.[0],
    ])
  ) as Record<ArmorKind, Armor | undefined>;

  return (
    <Group>
      {Object.entries(armorMap).map(([armorKind, armor], index) => (
        <ActionIcon
          key={index}
          disabled={!armor}
          size={36}
          variant="outline"
          className="bg-transparent"
          onClick={() => onClick(armor!)}
        >
          <Image
            src={armor ? `/icon/armor_${armorKind}.png` : `/icon/none.png`}
            alt={armorKind}
            width={24}
            height={24}
          />
        </ActionIcon>
      ))}
    </Group>
  );
}
