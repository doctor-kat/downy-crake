"use client";

import { Decoration } from "@/app/api/mhdb/decorations/Decoration";
import { Badge, Group, Stack, Table, Text, Tooltip } from "@mantine/core";
import Image from "next/image";
import React from "react";

export default function Client({
  data,
}: {
  data: {
    decorations: Decoration[];
  };
}) {
  return (
    <Table highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Slot</Table.Th>
          <Table.Th>Name</Table.Th>
          <Table.Th>Skill</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {data.decorations.map((decoration) => (
          <Table.Tr key={decoration.id}>
            <Table.Td>
              <Image
                src={`/icon/decoration/${decoration.slot}.png`}
                alt={`decoration_${decoration.slot}`}
                width={24}
                height={24}
              />
            </Table.Td>
            <Table.Td>
              <Text>{decoration.name.match(/^(.*)\s\[\d\]$/)?.[1]}</Text>
            </Table.Td>
            <Table.Td>
              <Group>
                {decoration.skills.map((skillRank) => (
                  <Tooltip key={skillRank.id} label={skillRank.description}>
                    <Badge
                      variant="default"
                      className="capitalize"
                      rightSection={skillRank.level}
                    >
                      {skillRank.skill.name}
                    </Badge>
                  </Tooltip>
                ))}
              </Group>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}
