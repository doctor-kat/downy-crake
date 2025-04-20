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
          width={20}
          height={20}
        />
      }
    >
      {value}
    </Badge>
  );
}
