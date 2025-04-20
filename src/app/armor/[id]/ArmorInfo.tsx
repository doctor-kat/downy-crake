"use client";

import { Armor } from "@/app/api/mhdb/armor/Armor";
import { ArmorSet } from "@/app/api/mhdb/armor/sets/ArmorSet";
import { Skill } from "@/app/api/mhdb/skills/Skill";
import SkillBadge from "@/components/SkillBadge";
import {
  Badge,
  Group,
  Indicator,
  Stack,
  Text,
  ThemeIcon,
  Tooltip,
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
  const skillMap = Object.groupBy(skills, (skill) => skill.id);

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
            <ThemeIcon key={index} p="md">
              <Indicator
                label={
                  <Image
                    src={`/icon/ui/armor.png`}
                    alt="weapon"
                    width={16}
                    height={16}
                  />
                }
                offset={2}
              >
                <Image
                  src={`/icon/decoration/${slot}.png`}
                  alt={`decoration_${slot}`}
                  width={24}
                  height={24}
                  style={{ marginBottom: "-0.5rem", marginLeft: "-0.25rem" }}
                />
              </Indicator>
            </ThemeIcon>
          ))}
        </Group>
      )}
      <Group>
        {armor.skills.map((skillRank) => (
          <SkillBadge
            key={skillRank.id}
            skill={skillMap[skillRank.skill.id!]![0]}
            skillRank={skillRank}
          />
        ))}
        {armorSet.bonus && (
          <Tooltip
            label={
              <Stack gap="0">
                {skillMap[armorSet.bonus.skill.id]?.[0].ranks.map(
                  (skillRank) => (
                    <span>
                      {skillRank.name}: {skillRank.description}
                    </span>
                  )
                )}
              </Stack>
            }
          >
            <Badge
              leftSection={
                <Image
                  src={`/icon/skills/group.png`}
                  alt="group"
                  width={20}
                  height={20}
                />
              }
            >
              {skillMap[armorSet.bonus.skill.id]?.[0].name}
            </Badge>
          </Tooltip>
        )}
        {armorSet.groupBonus && (
          <Tooltip
            label={
              <Stack gap="0">
                {skillMap[armorSet.groupBonus.skill.id]?.[0].ranks.map(
                  (skillRank) => (
                    <span>
                      {skillRank.name}: {skillRank.description}
                    </span>
                  )
                )}
              </Stack>
            }
          >
            <Badge
              leftSection={
                <Image
                  src={`/icon/skills/set.png`}
                  alt="group"
                  width={20}
                  height={20}
                />
              }
            >
              {skillMap[armorSet.groupBonus.skill.id]?.[0].name}
            </Badge>
          </Tooltip>
        )}
      </Group>
    </Stack>
  );
}
