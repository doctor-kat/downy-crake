"use client";

import { Armor } from "@/app/api/mhdb/armor/Armor";
import { ArmorSet } from "@/app/api/mhdb/armor/sets/ArmorSet";
import { Skill } from "@/app/api/mhdb/skills/Skill";
import ArmorBonusBadge from "@/components/ArmorBonusBadge";
import ElementalResistanceBadge from "@/components/ElementalResistanceBadge";
import SkillBadge from "@/components/SkillBadge";
import { Group, Indicator, Stack, Text, ThemeIcon } from "@mantine/core";
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
          <ElementalResistanceBadge
            key={element}
            element={element}
            value={value}
          />
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
        {armorSet.bonus && <ArmorBonusBadge set armorSet={armorSet} />}
        {armorSet.groupBonus && <ArmorBonusBadge group armorSet={armorSet} />}
      </Group>
    </Stack>
  );
}
