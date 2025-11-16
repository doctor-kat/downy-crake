"use client";

import { Armor } from "@/app/api/mhdb/armor/Armor";
import { useLoadout } from "@/app/loadout/context/LoadoutContext";
import { Button } from "@mantine/core";
import Image from "next/image";
import React from "react";

/**
 * Primary action button for adding armor to loadout.
 * Uses variant="default" for primary CTA emphasis.
 * Includes icon (leftSection) and status indicator (rightSection: ✓).
 * See: src/app/componentVariants.ts for variant usage guidelines.
 */
export default function AddToLoadout({
  armor,
  onClick,
}: {
  armor: Armor;
  onClick?: () => void;
}) {
  const { loadout, setLoadout } = useLoadout();
  const isInLoadout = loadout.get(armor.kind)?.data?.id === armor.id;

  return (
    <Button
      disabled={isInLoadout}
      variant="default"
      onClick={() => {
        setLoadout({
          slot: armor.kind,
          data: armor,
          decorations: [],
        });
        onClick && onClick();
      }}
      leftSection={
        <Image
          src={`/icon/armor/${armor.kind}.png`}
          alt={armor.kind}
          width={24}
          height={24}
        />
      }
      rightSection={isInLoadout ? "✓" : null}
    >
      {isInLoadout ? "Added To Loadout" : "Add To Loadout"}
    </Button>
  );
}
