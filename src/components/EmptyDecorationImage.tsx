import { DecorationKind } from "@/app/api/mhdb/dataTypes/DecorationKind";
import { DecorationSlot } from "@/app/api/mhdb/dataTypes/DecorationSlot";
import { ICON_SIZE } from "@/app/utils";
import { DecorationLayer } from "@/components/decorationLayerHelpers";
import { Box, Indicator } from "@mantine/core";
import Image from "next/image";
import React from "react";

/**
 * EmptyDecorationImage - Decoration slot without filled decoration
 *
 * Simpler version of DecorationImage showing only empty slot:
 * 1. Base slot shape (slot.png)
 * 2. Empty slot size indicator (empty-1/2/3.png)
 *
 * No color overlay since slot is empty.
 * Optional Indicator badge shows decoration kind when specified.
 */
export default function EmptyDecorationImage({
  slot,
  kind,
}: {
  slot: DecorationSlot;
  kind?: DecorationKind;
}) {
  return (
    <Indicator
      disabled={!kind}
      color="transparent"
      label={
        <Image
          src={`/icon/ui/${kind}.png`}
          alt={kind ?? "kind"}
          width={ICON_SIZE.XS}
          height={ICON_SIZE.XS}
        />
      }
      offset={2}
    >
      <Box w={ICON_SIZE.MD} h={ICON_SIZE.MD} className="relative">
        {/* Layer 1: Base slot shape */}
        <DecorationLayer src="/icon/decoration/slot.png" alt="slot" />

        {/* Layer 2: Empty slot size indicator */}
        <DecorationLayer
          src={`/icon/decoration/empty-${slot}.png`}
          alt={`empty-${slot}`}
        />
      </Box>
    </Indicator>
  );
}
