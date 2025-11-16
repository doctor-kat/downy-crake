import { DecorationKind } from "@/app/api/mhdb/dataTypes/DecorationKind";
import { DecorationSlot } from "@/app/api/mhdb/dataTypes/DecorationSlot";
import { ICON_SIZE } from "@/app/utils";
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
          src={`/icon/decoration/empty-${slot}.png`}
          alt={`empty-${slot}`}
          width={ICON_SIZE.MD}
          height={ICON_SIZE.MD}
        />
      </Box>
    </Indicator>
  );
}
