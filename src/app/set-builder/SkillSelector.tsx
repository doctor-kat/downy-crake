"use client";

import { useState } from "react";
import { Stack, TextInput, SimpleGrid, Card, Text, Badge, Group } from "@mantine/core";
import { Skill } from "@/app/api/mhdb/skills/Skill";
import { skillColor } from "@/app/utils";

interface Props {
  skills: Skill[];
  possibleSkills: Record<number, number[]>;
  onSelectSkill: (skillId: number, level: number) => void;
}

export default function SkillSelector({ skills, possibleSkills, onSelectSkill }: Props) {
  const [search, setSearch] = useState("");

  // Filter skills by search and only show possible skills
  const possibleSkillIds = Object.keys(possibleSkills).map(Number);
  const filteredSkills = skills.filter((skill) => {
    if (!possibleSkillIds.includes(skill.id)) return false;
    if (search && !skill.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <Stack gap="md">
      <TextInput
        placeholder="Search skills..."
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
        size="md"
      />

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }}>
        {filteredSkills.map((skill) => {
          const levels = possibleSkills[skill.id] || [];
          const color = skillColor[skill.icon.kind];

          return (
            <Card key={skill.id} shadow="sm" padding="sm" radius="md" withBorder>
              <Stack gap="xs">
                <Text fw={500} size="sm">
                  {skill.name}
                </Text>

                <Group gap="xs">
                  {levels.map((level) => (
                    <Badge
                      key={level}
                      color={color}
                      variant="light"
                      style={{ cursor: "pointer" }}
                      onClick={() => onSelectSkill(skill.id, level)}
                    >
                      Lv{level}
                    </Badge>
                  ))}
                </Group>

                {skill.description && (
                  <Text size="xs" c="dimmed" lineClamp={2}>
                    {skill.description}
                  </Text>
                )}
              </Stack>
            </Card>
          );
        })}
      </SimpleGrid>

      {filteredSkills.length === 0 && (
        <Text c="dimmed" ta="center">
          No skills available. Try adjusting your selections.
        </Text>
      )}
    </Stack>
  );
}
