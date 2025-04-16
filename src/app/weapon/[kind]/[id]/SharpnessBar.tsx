import { Sharpness } from "@/app/api/mhdb/weapons/Weapon";
import { Box, Progress } from "@mantine/core";
import Image from "next/image";
import React from "react";

const sharpnessColors = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "white",
  "purple",
];

export default function SharpnessBar({
  sharpness,
  handicraft,
  height = 30,
}: {
  sharpness: Sharpness;
  handicraft: number[];
  height?: number;
}) {
  const baseSharpness = Object.entries(sharpness).filter(
    ([, value]) => value > 0
  );
  const handicraftExtension: [string, number][] = handicraft.map(
    (value, index) => {
      const nextColorIndex = baseSharpness.length - 1 + index;
      const nextColor = sharpnessColors[nextColorIndex];
      return [nextColor, value * 10];
    }
  );

  return (
    <Box className="relative self-start" h={height}>
      <Image
        className="absolute"
        src="/sharpness_bar.png"
        alt="sharpness_bar"
        width={height * 5}
        height={height}
      />
      <Box
        className="absolute z-10"
        w={(207 / 60) * height}
        h={(26 / 60) * height}
        style={{
          top: (21 / 60) * height,
          left: (63 / 60) * height,
          boxShadow: `inset 0px 0px ${(5 / 60) * height}px ${
            (3 / 60) * height
          }px black`,
        }}
      />
      <Progress.Root
        className="absolute"
        w={(207 / 60) * height}
        h={(26 / 60) * height}
        style={{
          top: (21 / 60) * height,
          left: (63 / 60) * height,
        }}
      >
        {baseSharpness.map(([color, value]) => (
          <Progress.Section key={color} value={value} color={color} />
        ))}
        {handicraftExtension.map(([color, value]) => (
          <Progress.Section
            key={color}
            value={value}
            color={color}
            className="h-1/3 self-end z-0"
            style={{ zIndex: 0 }}
          />
        ))}
        <Progress.Section
          value={
            400 -
            Object.values(sharpness).reduce(
              (acc, sharpness) => acc + sharpness,
              0
            )
          }
          color="transparent"
        />
      </Progress.Root>
    </Box>
  );
}
