"use client";

import { Armor } from "@/app/api/mhdb/armor/Armor";
import { ArmorSet } from "@/app/api/mhdb/armor/sets/ArmorSet";
import { Skill } from "@/app/api/mhdb/skills/Skill";
import { Badge, Group, Stack, Text, ThemeIcon, Tooltip } from "@mantine/core";
import Image from "next/image";
import React from "react";

export default function ArmorInfo({
  armor,
  skills,
  armorSet,
}: {
  armor: Armor;
  armorSet: ArmorSet;
  skills: Skill[];
}) {
  const skillsMap = Object.groupBy(skills, (skill) => skill.id);

  return (
    <Stack gap="sm">
      <Text size="xs" c="dimmed" className="italic">
        {armor.description}
      </Text>
      <Group>
        {Object.entries(armor.resistances).map(([element, value]) => (
          <Badge
            key={element}
            leftSection={
              <Image
                src={`/icon/element/${element}.png`}
                alt={element}
                width={24}
                height={24}
              />
            }
          >
            {value}
          </Badge>
        ))}
      </Group>
      {!!armor.slots.length && (
        <Group>
          {armor.slots.toSorted().map((slot, index) => (
            <ThemeIcon key={index} variant="outline" color="black">
              <Image
                src={`/icon/decoration/${slot}.png`}
                width={20}
                height={20}
                alt={`decoration_${slot}`}
              />
            </ThemeIcon>
          ))}
        </Group>
      )}
      <Group>
        {armor.skills.map((skillRank) => (
          <Tooltip key={skillRank.id} label={skillRank.description}>
            <Badge rightSection={skillRank.level}>
              {skillsMap[skillRank.skill.id!]?.[0].name ?? skillRank.skill.id}
            </Badge>
          </Tooltip>
        ))}
        {armorSet.bonus && (
          <Tooltip label={skillsMap[armorSet.bonus.id]?.[0].description}>
            <Badge>{skillsMap[armorSet.bonus.id]?.[0].name}</Badge>
          </Tooltip>
        )}
        {armorSet.groupBonus && (
          <Tooltip label={skillsMap[armorSet.groupBonus.id]?.[0].description}>
            <Badge>{skillsMap[armorSet.groupBonus.id]?.[0].name}</Badge>
          </Tooltip>
        )}
      </Group>
    </Stack>
  );
}
