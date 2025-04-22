"use client";

import { Skill } from "@/app/api/mhdb/skills/Skill";
import { Card, Checkbox, Group, Stack, Text } from "@mantine/core";
import Image from "next/image";
import React from "react";

export default function SkillRankGroup({
  skill,
  level,
}: {
  skill: Skill;
  level: number;
}) {
  return (
    <Card p="xs">
      <Group>
        <Image
          src={`/icon/skills/${skill.icon.kind}.png`}
          alt="elemental"
          width={48}
          height={48}
        />
        <Stack gap="4" mt={-4}>
          <Text>{skill.name}</Text>
          <Group justify="space-between">
            <Group gap="4">
              {new Array(level).fill(null).map((_, index) => (
                <Checkbox
                  key={index}
                  size="xs"
                  radius="xs"
                  icon={() => null}
                  checked={true}
                  color="yellow"
                  onChange={() => {}}
                  classNames={{ input: "box-border border-2 border-red-500" }}
                />
              ))}
              {new Array(skill.ranks.length - level)
                .fill(null)
                .map((_, index) => (
                  <Checkbox
                    key={index}
                    size="xs"
                    radius="xs"
                    icon={() => null}
                    checked={false}
                    onChange={() => {}}
                    classNames={{ input: "border-2" }}
                  />
                ))}
            </Group>
          </Group>
        </Stack>
      </Group>
    </Card>
  );
}
