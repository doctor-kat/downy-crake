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
      <Group>
        <Badge
          variant="default"
          leftSection={
            <Image
              src={`/icon/skills/attack.png`}
              width={20}
              height={20}
              alt="raw"
            />
          }
        >
          {weapon.damage.raw}
        </Badge>
        {weapon.affinity !== 0 && (
          <Badge
            variant="default"
            leftSection={
              <Image
                src={`/icon/skills/affinity.png`}
                width={20}
                height={20}
                alt="affinity"
              />
            }
          >
            {weapon.affinity}
          </Badge>
        )}
        {weapon.specials.map((special) => (
          <Badge
            variant="default"
            leftSection={
              "element" in special ? (
                <Image
                  src={`/icon/element/${special.element}.png`}
                  width={20}
                  height={20}
                  alt="element"
                />
              ) : (
                <Image
                  src={`/icon/ailment/${special.status}.png`}
                  width={20}
                  height={20}
                  alt="status"
                />
              )
            }
          >
            {special.damage.raw}
          </Badge>
        ))}
      </Group>
      {!!weapon.slots.length && (
        <Group>
          {weapon.slots.toSorted().map((slot, index) => (
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
