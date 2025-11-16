import {ICON_SIZE} from "@/app/utils";
import {Box} from "@mantine/core";
import Image from "next/image";
import React from "react";

/**
 * Common positioning styles for absolutely positioned decoration layers.
 * All layers are stacked at the same position (0,0) to create composite effect.
 */
export const LAYER_POSITION = {
  pos: "absolute" as const,
  top: 0,
  left: 0,
};

/**
 * Helper component for a single image layer in the decoration stack.
 * Reduces repetition of absolute positioning and sizing props.
 *
 * Used by both DecorationImage and EmptyDecorationImage to create
 * composite decoration icons by stacking multiple transparent PNGs.
 */
export const DecorationLayer = ({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) => (
  <Box
    component={Image}
    {...LAYER_POSITION}
    src={src}
    alt={alt}
    width={ICON_SIZE.MD}
    height={ICON_SIZE.MD}
  />
);
