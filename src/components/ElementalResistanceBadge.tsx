import { ICON_SIZE } from "@/app/utils";
import { Badge } from "@mantine/core";
import Image from "next/image";
import React from "react";

export default function ElementalResistanceBadge({
  element,
  value,
}: {
  element: string;
  value: number;
}) {
  return (
    <Badge
      leftSection={
        <Image
          src={`/icon/element/${element}.png`}
          alt={element}
          width={ICON_SIZE.SM}
          height={ICON_SIZE.SM}
        />
      }
    >
      {value}
    </Badge>
  );
}
