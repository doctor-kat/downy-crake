import {Decoration} from "@/app/api/mhdb/decorations/Decoration";
import DecorationImage from "@/components/DecorationImage";
import EmptyDecorationImage from "@/components/EmptyDecorationImage";
import {Button, Tooltip} from "@mantine/core";
import React, {MouseEventHandler} from "react";

/**
 * Inline utility button for decoration slot management.
 * Uses variant="transparent" to blend with content and minimize visual weight.
 * See: src/app/componentVariants.ts for variant usage guidelines.
 */
export default function DecorationButton({
  slot,
  decoration,
  onClick,
  ...props
}: {
  slot: 1 | 2 | 3;
  decoration?: Decoration;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}) {
  return (
    <Tooltip disabled={!decoration} label={decoration?.description}>
      <Button
        onClick={onClick}
        variant="transparent"
        leftSection={
          decoration ? (
            <DecorationImage decoration={decoration} />
          ) : (
            <EmptyDecorationImage slot={slot} />
          )
        }
        {...props}
      >
        {decoration ? decoration.name.match(/^(.*)\s\[\d\]$/)?.[1] : "Empty"}
      </Button>
    </Tooltip>
  );
}
