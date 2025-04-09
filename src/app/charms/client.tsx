"use client";

import { Badge, Stack, Table, Text } from "@mantine/core";
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
          <Table.Th>Name</Table.Th>
          <Table.Th>Skill</Table.Th>
          <Table.Th>Description</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {data.charms.map((charm) =>
          charm.ranks.map((rank) => (
            <Table.Tr key={rank.id}>
              <Table.Td>
                <Text>{rank.name}</Text>
              </Table.Td>
              <Table.Td>
                <Stack>
                  {rank.skills.map((skillRank) => (
                    <Badge
                      variant="default"
                      className="capitalize"
                      rightSection={skillRank.level}
                    >
                      {skillRank.skill.name}
                    </Badge>
                  ))}
                </Stack>
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
