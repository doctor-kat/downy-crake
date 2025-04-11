"use client";

import { Skill } from "@/app/api/mhdb/skills/Skill";
import { Weapon } from "@/app/api/mhdb/weapons/Weapon";
import { Badge, Group, Stack, Text, ThemeIcon } from "@mantine/core";
import Image from "next/image";
import React from "react";

export default function BaseWeaponInfo({
  weapon,
  skills,
}: {
  weapon: Weapon;
  skills: Skill[];
}) {
  const skillsMap = Object.groupBy(skills, (skill) => skill.id);

  return (
    <Stack gap="sm">
      <Text size="xs" c="dimmed" className="italic">
        {weapon.description}
      </Text>
      {!!weapon.slots.length && (
        <Group>
          {weapon.slots.toSorted().map((slot, index) => (
            <ThemeIcon key={index} variant="outline" color="black">
              <Image
                src={`/icon/decoration_${slot}.png`}
                width={20}
                height={20}
                alt={`decoration_${slot}`}
              />
            </ThemeIcon>
          ))}
        </Group>
      )}
      {weapon.skills && (
        <Group>
          {weapon.skills?.map((skillRank) => (
            <Badge
              key={skillRank.id}
              variant="default"
              rightSection={skillRank.level}
              className="capitalize"
            >
              {skillsMap[skillRank.skill.id!]?.[0].name ?? skillRank.skill.id}
            </Badge>
          ))}
        </Group>
      )}
    </Stack>
  );
}
