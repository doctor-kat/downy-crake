"use client";

import { Badge, Group, Stack, Table, Text } from "@mantine/core";
import React from "react";
import { Charm } from "../api/mhdb/charms/Charm";

export default function Client({
  data,
}: {
  data: {
    charms: Charm[];
  };
}) {
  return (
    <Table striped highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th hiddenFrom="sm">Name/Skill</Table.Th>
          <Table.Th visibleFrom="sm">Name</Table.Th>
          <Table.Th visibleFrom="sm">Skill</Table.Th>
          <Table.Th>Description</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {data.charms.map((charm) =>
          charm.ranks.map((rank) => (
            <Table.Tr key={rank.id}>
              <Table.Td hiddenFrom="sm">
                <Stack>
                  <Text>{rank.name}</Text>
                  {rank.skills.map((skillRank) => (
                    <Badge rightSection={skillRank.level}>
                      {skillRank.skill.name}
                    </Badge>
                  ))}
                </Stack>
              </Table.Td>
              <Table.Td visibleFrom="sm">
                <Text>{rank.name}</Text>
              </Table.Td>
              <Table.Td visibleFrom="sm">
                <Group>
                  {rank.skills.map((skillRank) => (
                    <Badge rightSection={skillRank.level}>
                      {skillRank.skill.name}
                    </Badge>
                  ))}
                </Group>
              </Table.Td>
              <Table.Td>
                <Stack>
                  {rank.skills.map((skillRank) => (
                    <Text key={skillRank.id}>{skillRank.description}</Text>
                  ))}
                </Stack>
              </Table.Td>
            </Table.Tr>
          ))
        )}
      </Table.Tbody>
    </Table>
  );
}
