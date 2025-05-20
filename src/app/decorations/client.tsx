"use client";

import { Decoration } from "@/app/api/mhdb/decorations/Decoration";
import { Skill } from "@/app/api/mhdb/skills/Skill";
import { skillColor } from "@/app/utils";
import DecorationButton from "@/components/DecorationButton";
import SkillBadge from "@/components/SkillBadge";
import { Group, Stack, Table, Text } from "@mantine/core";
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
          <Table.Th>Skill</Table.Th>
          <Table.Th>Description</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {data.decorations.map((decoration) => (
          <Table.Tr key={decoration.id}>
            <Table.Td visibleFrom="sm">
              <DecorationButton
                slot={decoration.slot}
                decoration={decoration}
                color={
                  skillColor[
                    skillMap[decoration.skills[0].skill.id]![0].icon.kind
                  ]
                }
              />
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
              <Stack align="flex-start">
                <DecorationButton
                  slot={decoration.slot}
                  decoration={decoration}
                  color={
                    skillColor[
                      skillMap[decoration.skills[0].skill.id]![0].icon.kind
                    ]
                  }
                />
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
