"use client";

import { Decoration } from "@/app/api/mhdb/decorations/Decoration";
import { Skill } from "@/app/api/mhdb/skills/Skill";
import SkillBadge from "@/components/SkillBadge";
import { Group, Indicator, Stack, Table, Text } from "@mantine/core";
import Image from "next/image";
import React from "react";

export default function Client({
  data,
}: {
  data: {
    decorations: Decoration[];
    skills: Skill[];
  };
}) {
  const skillMap = Object.groupBy(data.skills, (skill) => skill.id);

  return (
    <Table highlightOnHover>
      <Table.Thead>
        <Table.Tr visibleFrom="sm">
          <Table.Th>Slot</Table.Th>
          <Table.Th>Name</Table.Th>
          <Table.Th>Skill</Table.Th>
          <Table.Th>Description</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {data.decorations.map((decoration) => (
          <Table.Tr key={decoration.id}>
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
            <Table.Td visibleFrom="sm">
              {decoration.skills.map((skillRank) => (
                <Text key={skillRank.id}>{skillRank.description}</Text>
              ))}
            </Table.Td>
            <Table.Td hiddenFrom="sm">
              <Stack>
                <Group wrap="nowrap">
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
                  <Text>{decoration.name.match(/^(.*)\s\[\d\]$/)?.[1]}</Text>
                </Group>
                {decoration.skills.map((skillRank) => (
                  <Group key={skillRank.id} gap="xs">
                    <SkillBadge
                      key={skillRank.id}
                      skill={skillMap[skillRank.skill.id!]![0]}
                      skillRank={skillRank}
                    />
                    <Text fz="xs">{skillRank.description}</Text>
                  </Group>
                ))}
              </Stack>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}
