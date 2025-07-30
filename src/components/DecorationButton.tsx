import {Decoration} from "@/app/api/mhdb/decorations/Decoration";
import DecorationImage from "@/components/DecorationImage";
import EmptyDecorationImage from "@/components/EmptyDecorationImage";
import {Button, Tooltip} from "@mantine/core";
import React, {MouseEventHandler} from "react";

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
