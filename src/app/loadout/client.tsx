"use client";

import { Armor, ArmorKind } from "@/app/api/mhdb/armor/Armor";
import { CharmRank } from "@/app/api/mhdb/charms/Charm";
import { DecorationKind } from "@/app/api/mhdb/dataTypes/DecorationKind";
import { Decoration } from "@/app/api/mhdb/decorations/Decoration";
import { Weapon } from "@/app/api/mhdb/weapons/Weapon";
import DecorationModal from "@/app/loadout/DecorationModal";
import { Loadout } from "@/app/loadout/Loadout";
import BasicWeaponInfo from "@/app/weapon/[kind]/[id]/BasicWeaponInfo";
import ArmorBonusBadge from "@/components/ArmorBonusBadge";
import ArmorBonusGroup from "@/components/ArmorBonusGroup";
import SkillBadge from "@/components/SkillBadge";
import SkillRankGroup from "@/components/SkillRankGroup";
import {
  ActionIcon,
  Button,
  Card,
  Grid,
  Group,
  Indicator,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import { useDisclosure, useMap } from "@mantine/hooks";
import Image from "next/image";
import React from "react";
import { ArmorSet, ArmorSetBonus } from "../api/mhdb/armor/sets/ArmorSet";
import { Skill } from "../api/mhdb/skills/Skill";

export default function Client({
  data,
  loadout,
}: {
  data: {
    weapons: Weapon[];
    armors: Armor[];
    armorSets: ArmorSet[];
    charms: CharmRank[];
    decorations: Decoration[];
    skills: Skill[];
  };
  loadout: Loadout;
}) {
  const weaponMap = Object.groupBy(data.weapons, (weapon) => weapon.id);
  const armorMap = Object.groupBy(data.armors, (armors) => armors.kind);
  const armorSetMap = Object.groupBy(data.armorSets, (armorSet) => armorSet.id);
  const armorSetBonusMap = {
    bonus: Object.groupBy(
      data.armorSets.filter((armorSet) => armorSet.bonus),
      (armorSet) => armorSet.bonus!.id
    ),
    groupBonus: Object.groupBy(
      data.armorSets.filter((armorSet) => armorSet.groupBonus),
      (armorSet) => armorSet.groupBonus!.id
    ),
  };
  const charmMap = Object.groupBy(data.charms, (charm) => charm.id);
  const decorationMap = Object.groupBy(
    data.decorations,
    (decoration) => decoration.id
  );
  const skillMap = Object.groupBy(data.skills, (skill) => skill.id);

  const weapon = weaponMap[loadout.weapon[0]]![0];

  const [head, chest, arms, waist, legs] = Object.values(ArmorKind).map(
    (armorKind) =>
      armorMap[armorKind]!.filter(
        (armor) => armor.id === loadout[armorKind][0]
      )[0]
  );
  const charm = charmMap[loadout.charm[0]]![0];

  const loadoutSkillRanks: Record<number, number> = {};
  [
    ...weapon.skills,
    ...[head, chest, arms, waist, legs].flatMap((armor) => armor.skills),
    ...charm.skills,
  ].forEach((skillRank) => {
    const skill = skillMap[skillRank.skill.id!]![0];
    loadoutSkillRanks[skill.id] ??= 0;
    loadoutSkillRanks[skill.id] = Math.min(
      skill.ranks.length,
      loadoutSkillRanks[skill.id] + skillRank.level
    );
  });

  const [setBonusSkills, groupBonusSkills] = ([
    "bonus",
    "groupBonus",
  ] as (keyof typeof armorSetBonusMap)[]).map((bonusKind) =>
    Object.values(armorSetBonusMap[bonusKind]).reduce<Record<number, number>>(
      (acc, armorSets) => {
        const armorSet = armorSets![0];
        const bonus = armorSet[bonusKind] as ArmorSetBonus;
        if (bonus) {
          acc[bonus.id] ??= 0;
          acc[bonus.id] = Math.min(bonus.ranks.length, acc[bonus.id] + 1);
        }
        return acc;
      },
      {}
    )
  );
  console.log(setBonusSkills);

  const [decorationModalOpen, { open, close, toggle }] = useDisclosure();
  const decorationFilter = useMap<string, any>([
    ["kind", DecorationKind.armor],
    ["slot", 1],
  ]);

  return (
    <>
      <Grid className="flex-grow">
        <Grid.Col span="auto" className="overflow-auto">
          <Stack gap="xs">
            <Card padding="md">
              <Card.Section withBorder inheritPadding py="xs">
                <Group>
                  <Image
                    src={`/icon/weapon/${weapon.kind}.png`}
                    alt={weapon.kind}
                    width={24}
                    height={24}
                  />
                  <Text>{weapon.name}</Text>
                </Group>
              </Card.Section>
              <Card.Section p="xs">
                <BasicWeaponInfo
                  weapon={weapon}
                  skills={
                    weapon.skills.map(
                      (skillRank) => skillMap[skillRank.skill.id!]![0]
                    ) ?? []
                  }
                />
              </Card.Section>
            </Card>
            {[head, chest, arms, waist, legs].map((armor) => (
              <Card padding="md">
                <Card.Section withBorder inheritPadding py="xs">
                  <Grid align="center">
                    <Grid.Col span="auto" p="0">
                      <Button
                        className="whitespace-nowrap"
                        variant="default"
                        px="xs"
                        leftSection={
                          <Image
                            src={`/icon/armor/${armor.kind}.png`}
                            alt={armor.kind}
                            width={24}
                            height={24}
                          />
                        }
                      >
                        <Text>{armor.name}</Text>
                      </Button>
                    </Grid.Col>
                    <Grid.Col span="content">
                      <Group gap="4">
                        {armor.slots.toSorted().map((slot, index) => (
                          <Tooltip
                            disabled={!loadout[armor.kind][index + 1]}
                            label={
                              loadout[armor.kind][index + 1]
                                ? decorationMap[
                                    loadout[armor.kind][index + 1]
                                  ]![0].name
                                : ""
                            }
                          >
                            <ActionIcon key={index} variant="default" p="md">
                              <Indicator
                                label={
                                  <Image
                                    src={`/icon/ui/armor.png`}
                                    alt="weapon"
                                    width={16}
                                    height={16}
                                  />
                                }
                                onClick={() => {
                                  decorationFilter.set(
                                    "kind",
                                    DecorationKind.armor
                                  );
                                  decorationFilter.set("slot", slot);
                                  open();
                                }}
                                offset={2}
                              >
                                <Image
                                  src={`/icon/decoration/${slot}.png`}
                                  alt={`decoration_${slot}`}
                                  width={24}
                                  height={24}
                                  style={{
                                    marginBottom: "-0.5rem",
                                    marginLeft: "-0.25rem",
                                  }}
                                />
                              </Indicator>
                            </ActionIcon>
                          </Tooltip>
                        ))}
                      </Group>
                    </Grid.Col>
                  </Grid>
                </Card.Section>
                <Card.Section p="xs">
                  <Group gap="xs">
                    {armor.skills.map((skillRank) => (
                      <SkillBadge
                        key={skillRank.id}
                        skill={skillMap[skillRank.skill.id!]![0]}
                        skillRank={skillRank}
                      />
                    ))}
                    {armorSetMap[armor.armorSet.id]![0].bonus && (
                      <ArmorBonusBadge
                        set
                        armorSet={armorSetMap[armor.armorSet.id]![0]}
                      />
                    )}
                    {armorSetMap[armor.armorSet.id]![0].groupBonus && (
                      <ArmorBonusBadge
                        group
                        armorSet={armorSetMap[armor.armorSet.id]![0]}
                      />
                    )}
                  </Group>
                </Card.Section>
              </Card>
            ))}
            <Card padding="md">
              <Card.Section withBorder inheritPadding py="xs">
                <Group>
                  <Image
                    src={`/icon/armor/charm.png`}
                    alt="charm"
                    width={24}
                    height={24}
                  />
                  <Text>{charm.name}</Text>
                </Group>
              </Card.Section>
              <Card.Section p="xs">
                <Group gap="xs">
                  {charm.skills.map((skillRank) => (
                    <SkillBadge
                      key={skillRank.id}
                      skill={skillMap[skillRank.skill.id!]![0]}
                      skillRank={skillRank}
                    />
                  ))}
                </Group>
              </Card.Section>
            </Card>
          </Stack>
        </Grid.Col>
        <Grid.Col span="content">
          <Stack gap="xs">
            {Object.entries(loadoutSkillRanks)
              .toSorted(([a], [b]) =>
                skillMap[Number(a)]![0].icon.kind >
                skillMap[Number(b)]![0].icon.kind
                  ? 1
                  : -1
              )
              .map(([id, level]) => (
                <SkillRankGroup
                  skill={skillMap[Number(id)]![0]}
                  level={level}
                />
              ))}
            {Object.entries(setBonusSkills).map(([id, pieces]) => (
              <ArmorBonusGroup
                set
                data={{
                  armorSet: armorSetBonusMap.bonus[parseInt(id)]![0],
                }}
                pieces={pieces}
              />
            ))}
            {Object.entries(groupBonusSkills).map(([id, pieces]) => (
              <ArmorBonusGroup
                group
                data={{
                  armorSet: armorSetBonusMap.groupBonus[parseInt(id)]![0],
                }}
                pieces={pieces}
              />
            ))}
          </Stack>
        </Grid.Col>
      </Grid>
      <DecorationModal
        opened={decorationModalOpen}
        onClose={close}
        data={data}
        filter={{
          kind: decorationFilter.get("kind"),
          slot: decorationFilter.get("slot"),
        }}
      />
    </>
  );
}
