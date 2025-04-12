"use client";

import { Armor } from "@/app/api/mhdb/armor/Armor";
import { ArmorSet } from "@/app/api/mhdb/armor/sets/ArmorSet";
import { Skill } from "@/app/api/mhdb/skills/Skill";
import { rarityColor } from "@/app/utils";
import {
  Badge,
  Group,
  Modal,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
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
            variant="default"
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
          <Badge
            key={skillRank.id}
            variant="default"
            rightSection={skillRank.level}
            className="capitalize"
          >
            {skillsMap[skillRank.skill.id!]?.[0].name ?? skillRank.skill.id}
          </Badge>
        ))}
        {armorSet.bonus && (
          <Badge variant="default" className="capitalize">
            {skillsMap[armorSet.bonus.id]?.[0].name}
          </Badge>
        )}
        {armorSet.groupBonus && (
          <Badge variant="default" className="capitalize">
            {skillsMap[armorSet.groupBonus.id]?.[0].name}
          </Badge>
        )}
      </Group>
    </Stack>
  );
}
