"use client";

import { DecorationKind } from "@/app/api/mhdb/dataTypes/DecorationKind";
import { DecorationSlot } from "@/app/api/mhdb/dataTypes/DecorationSlot";
import { Decoration } from "@/app/api/mhdb/decorations/Decoration";
import { Skill } from "@/app/api/mhdb/skills/Skill";
import { useLoadout } from "@/app/loadout/context/LoadoutContext";
import { LoadoutSlotKind } from "@/app/loadout/types/Loadout";
import SkillBadge from "@/components/SkillBadge";
import {
  Group,
  Indicator,
  Modal,
  ModalProps,
  SimpleGrid,
  Table,
  Text,
} from "@mantine/core";
import Image from "next/image";
import React from "react";

export default function DecorationModal({
  data,
  filter,
  selection,
  ...modalProps
}: ModalProps & {
  data: { decorations: Decoration[]; skills: Skill[] };
  filter: { kind: DecorationKind; slot: DecorationSlot };
  selection?: {
    loadoutSlot: LoadoutSlotKind;
    decorationIndex: number;
  };
}) {
  const { setDecoration } = useLoadout();
  const skillMap = Object.groupBy(data.skills, (skill) => skill.id);
  const decorations = data.decorations
    .filter(
      (decoration) =>
        decoration.kind === filter.kind && decoration.slot <= filter.slot
    )
    .toSorted((a, b) => b.slot - a.slot);

  return (
    <Modal
      {...modalProps}
      title={
        <SimpleGrid cols={2}>
          <Text fw={500}>Decorations</Text>
        </SimpleGrid>
      }
    >
      <Table highlightOnHover>
        <Table.Thead>
          <Table.Tr visibleFrom="sm">
            <Table.Th>Slot</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Skill</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {decorations.map((decoration) => (
            <Table.Tr
              key={decoration.id}
              onClick={() => {
                setDecoration({
                  slot: selection!.loadoutSlot,
                  data: decoration,
                  index: selection!.decorationIndex,
                });
                modalProps.onClose();
              }}
            >
              <Table.Td visibleFrom="sm">
                <Indicator
                  color="transparent"
                  label={
                    <Image
                      src={`/icon/ui/${decoration.kind}.png`}
                      alt={decoration.kind}
                      width={16}
                      height={16}
                    />
                  }
                  offset={2}
                >
                  <Image
                    src={`/icon/decoration/${decoration.slot}.png`}
                    alt={`decoration_${decoration.slot}`}
                    width={24}
                    height={24}
                  />
                </Indicator>
              </Table.Td>
              <Table.Td visibleFrom="sm">
                <Text>{decoration.name.match(/^(.*)\s\[\d\]$/)?.[1]}</Text>
              </Table.Td>
              <Table.Td visibleFrom="sm">
                <Group>
                  {decoration.skills.map((skillRank) => (
                    <SkillBadge
                      key={skillRank.id}
                      skill={skillMap[skillRank.skill.id!]![0]}
                      skillRank={skillRank}
                    />
                  ))}
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Modal>
  );
}
