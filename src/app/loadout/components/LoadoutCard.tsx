import { DecorationSlot } from "@/app/api/mhdb/dataTypes/DecorationSlot";
import { Decoration } from "@/app/api/mhdb/decorations/Decoration";
import DecorationButton from "@/components/DecorationButton";
import { Card, Grid, Group, Text, Tooltip } from "@mantine/core";
import Image from "next/image";
import React from "react";

export default function LoadoutCard({
  iconUrl,
  title,
  slots,
  decorations,
  decorationOnClick,
  children,
}: {
  iconUrl: string;
  title?: string;
  slots?: DecorationSlot[];
  decorations?: Record<number, Decoration>;
  decorationOnClick?: ({
    decorationIndex,
  }: {
    decorationIndex: number;
  }) => void;
  children: React.ReactNode;
}) {
  return (
    <Card padding="md">
      <Grid>
        <Grid.Col span="auto" p="0">
          <Group wrap="nowrap">
            <Image src={iconUrl} alt="icon" width={24} height={24} />
            <Text>{title ?? "None"}</Text>
          </Group>
        </Grid.Col>
        <Grid.Col span="content">
          <Group gap="4">
            {slots?.toSorted().map((slot, decorationIndex) => (
              <Tooltip
                key={decorationIndex}
                disabled={!decorations?.[decorationIndex]}
                label={decorations?.[decorationIndex]?.name}
              >
                <DecorationButton
                  slot={slot}
                  decoration={decorations?.[decorationIndex]}
                  color="lime"
                  onClick={() => {
                    if (decorationOnClick) {
                      decorationOnClick({
                        decorationIndex,
                      });
                    }
                  }}
                />
              </Tooltip>
            ))}
          </Group>
        </Grid.Col>
      </Grid>
      <Card.Section inheritPadding py="xs">
        {children}
      </Card.Section>
    </Card>
  );
}
