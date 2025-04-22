"use client";

import { DecorationKind } from "@/app/api/mhdb/dataTypes/DecorationKind";
import { DecorationSlot } from "@/app/api/mhdb/dataTypes/DecorationSlot";
import { Decoration } from "@/app/api/mhdb/decorations/Decoration";
import { Skill } from "@/app/api/mhdb/skills/Skill";
import { Modal, ModalProps, SimpleGrid, Stack, Text } from "@mantine/core";
import React from "react";

export default function DecorationModal({
  data,
  filter,
  ...modalProps
}: ModalProps & {
  data: { decorations: Decoration[]; skills: Skill[] };
  filter: { kind: DecorationKind; slot: DecorationSlot };
}) {
  const skillMap = Object.groupBy(data.skills, (skill) => skill.id);
  const decorations = data.decorations.filter(
    (decoration) =>
      decoration.kind === filter.kind && decoration.slot <= filter.slot
  );

  return (
    <Modal
      {...modalProps}
      title={
        <SimpleGrid cols={2}>
          <Text fw={500}>Decorations</Text>
        </SimpleGrid>
      }
    >
      <Stack>
        {decorations.map((decoration) => (
          <Text>{decoration.name}</Text>
        ))}
      </Stack>
    </Modal>
  );
}
