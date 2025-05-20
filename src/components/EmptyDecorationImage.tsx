import { DecorationKind } from "@/app/api/mhdb/dataTypes/DecorationKind";
import { DecorationSlot } from "@/app/api/mhdb/dataTypes/DecorationSlot";
import { Box, Indicator } from "@mantine/core";
import Image from "next/image";
import React from "react";

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
          src={`/icon/decoration/empty-${slot}.png`}
          alt={`empty-${slot}`}
          width={24}
          height={24}
        />
      </Box>
    </Indicator>
  );
}
