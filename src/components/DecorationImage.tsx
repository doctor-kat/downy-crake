import {Decoration} from "@/app/api/mhdb/decorations/Decoration";
import {color, ICON_SIZE} from "@/app/utils";
import {DecorationLayer, LAYER_POSITION} from "@/components/decorationLayerHelpers";
import {Box, Indicator} from "@mantine/core";
import Image from "next/image";
import React from "react";

/**
 * DecorationImage - Composite decoration icon with colored overlay
 *
 * This component creates a layered decoration icon by stacking multiple images:
 * 1. Base slot image (slot.png) - provides base decoration slot shape
 * 2. Empty slot indicator (empty-1/2/3.png) - shows slot size
 * 3. Filled slot indicator (filled-1/2/3.png) - shows filled state
 * 4. Color overlay - applies decoration-specific color using CSS mask
 *
 * The color overlay uses mix-blend-multiply and maskImage to colorize
 * only the filled portion of the decoration icon.
 *
 * An Indicator badge in the top-right shows the decoration kind (armor/weapon).
 */
export default function DecorationImage({
  decoration,
}: {
  decoration: Decoration;
}) {
  return (
    <Indicator
      color="transparent"
      label={
        <Image
          src={`/icon/ui/${decoration.kind}.png`}
          alt={decoration.kind}
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
          src={`/icon/decoration/empty-${decoration.slot}.png`}
          alt={`empty-${decoration.slot}`}
        />

        {/* Layer 3: Filled slot size indicator */}
        <DecorationLayer
          src={`/icon/decoration/filled-${decoration.slot}.png`}
          alt={`filled-${decoration.slot}`}
        />

        {/* Layer 4: Color overlay with mask */}
        <Box
          {...LAYER_POSITION}
          w={ICON_SIZE.MD}
          h={ICON_SIZE.MD}
          bg={color[decoration.icon.color]}
          className="mix-blend-multiply"
          style={{
            maskImage: `url(/icon/decoration/filled-${decoration.slot}.png)`,
            maskSize: "cover",
          }}
        />
      </Box>
    </Indicator>
  );
}
