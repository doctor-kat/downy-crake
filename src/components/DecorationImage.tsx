import {Decoration} from "@/app/api/mhdb/decorations/Decoration";
import {color, ICON_SIZE} from "@/app/utils";
import {Box, Indicator} from "@mantine/core";
import Image from "next/image";
import React from "react";

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
        <Box
          component={Image}
          pos="absolute"
          top={0}
          left={0}
          src={`/icon/decoration/slot.png`}
          alt="slot"
          width={ICON_SIZE.MD}
          height={ICON_SIZE.MD}
        />
        <Box
          component={Image}
          pos="absolute"
          top={0}
          left={0}
          src={`/icon/decoration/empty-${decoration.slot}.png`}
          alt={`empty-${decoration.slot}`}
          width={ICON_SIZE.MD}
          height={ICON_SIZE.MD}
        />
        <Box
          component={Image}
          pos="absolute"
          top={0}
          left={0}
          src={`/icon/decoration/filled-${decoration.slot}.png`}
          alt={`filled-${decoration.slot}`}
          width={ICON_SIZE.MD}
          height={ICON_SIZE.MD}
        />
        <Box
          pos="absolute"
          top={0}
          left={0}
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
