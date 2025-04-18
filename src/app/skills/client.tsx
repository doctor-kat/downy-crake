"use client";

import { Skill } from "@/app/api/mhdb/skills/Skill";
import { Badge, Group, List, ListItem, Table, Text } from "@mantine/core";
import Image from "next/image";
import React from "react";

export default function Client({
  data,
}: {
  data: {
    skills: Skill[];
  };
}) {
  return (
    <Table highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Name</Table.Th>
          <Table.Th>Ranks</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {data.skills.map((skill) => (
          <Table.Tr key={skill.id}>
            <Table.Td>
              <Group gap="xs" wrap="nowrap">
                <Image
                  src={`/icon/skills/${skill.icon.kind}.png`}
                  alt={skill.icon.kind}
                  width={24}
                  height={24}
                />
                <Text>{skill.name}</Text>
              </Group>
            </Table.Td>
            <Table.Td>
              <List>
                {skill.ranks.map((skillRank) => (
                  <ListItem
                    key={skillRank.id}
                    icon={<Badge circle>{skillRank.level}</Badge>}
                  >
                    {skillRank.description.replace(/<[^>]*>/g, "")}
                  </ListItem>
                ))}
              </List>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}
