import { Decoration } from "@/app/api/mhdb/decorations/Decoration";
import { Box, Indicator, MantineColor } from "@mantine/core";
import Image from "next/image";
import React from "react";

export default function DecorationImage({
  decoration,
  color,
}: {
  decoration: Decoration;
  color: MantineColor;
}) {
  return (
    <Indicator
      color="transparent"
      label={
        <Image
          src={`/icon/ui/${decoration.kind}.png`}
          alt={decoration.kind}
          width={16}
          height={16}
        />
      }
      offset={2}
    >
      <Box w={24} h={24} className="relative">
        <Box
          component={Image}
          pos="absolute"
          top={0}
          left={0}
          src={`/icon/decoration/slot.png`}
          alt="slot"
          width={24}
          height={24}
        />
        <Box
          component={Image}
          pos="absolute"
          top={0}
          left={0}
          src={`/icon/decoration/empty-${decoration.slot}.png`}
          alt={`empty-${decoration.slot}`}
          width={24}
          height={24}
        />
        <Box
          component={Image}
          pos="absolute"
          top={0}
          left={0}
          src={`/icon/decoration/filled-${decoration.slot}.png`}
          alt={`filled-${decoration.slot}`}
          width={24}
          height={24}
        />
        <Box
          pos="absolute"
          top={0}
          left={0}
          w={24}
          h={24}
          bg={color}
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
