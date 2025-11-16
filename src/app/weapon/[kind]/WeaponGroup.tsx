"use client";

import { Weapon } from "@/app/api/mhdb/weapons/Weapon";
import { rarityColor } from "@/app/utils";
import { ActionIcon, Group, Tooltip } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import React from "react";

/**
 * Displays weapons in a crafting tree grid with clickable icons.
 * Uses ActionIcon with variant="outline" + className="bg-transparent" pattern.
 * Color prop indicates weapon rarity: color={`${rarityColor[weapon.rarity]}.9`}
 * See: src/app/componentVariants.ts for variant usage guidelines.
 */
export default function WeaponGroup({ weapons }: { weapons: Weapon[] }) {
  const weaponsByColumn = Object.groupBy(
    weapons,
    (weapon) => weapon.crafting.column
  );

  return (
    <Group gap="xs">
      {Array(10)
        .fill(null)
        .map((_, index) => {
          const weapon = weaponsByColumn[index]?.[0];
          if (weapon) {
            return (
              <Tooltip key={index} label={weapon.name}>
                <ActionIcon
                  component={Link}
                  scroll={false}
                  href={`/weapon/${weapon.kind}/${weapon.id}`}
                  size={36}
                  variant="outline"
                  className="bg-transparent"
                  color={`${rarityColor[weapon.rarity]}.9`}
                >
                  <Image
                    src={`/icon/weapon/${weapon.kind}.png`}
                    alt={weapon.kind}
                    width={24}
                    height={24}
                  />
                </ActionIcon>
              </Tooltip>
            );
          }

          return (
            <ActionIcon
              visibleFrom="sm"
              key={index}
              disabled
              size={36}
              variant="outline"
              className="bg-transparent"
            />
          );
        })}
    </Group>
  );
}
