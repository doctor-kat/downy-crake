"use client";

import { Armor, ArmorKind } from "@/app/api/mhdb/armor/Armor";
import { ArmorSet, ArmorSetBonus } from "@/app/api/mhdb/armor/sets/ArmorSet";
import { CharmRank } from "@/app/api/mhdb/charms/Charm";
import { DecorationKind } from "@/app/api/mhdb/dataTypes/DecorationKind";
import { Decoration } from "@/app/api/mhdb/decorations/Decoration";
import { Skill } from "@/app/api/mhdb/skills/Skill";
import { Weapon } from "@/app/api/mhdb/weapons/Weapon";
import DecorationModal from "@/app/loadout/components/DecorationModal";
import LoadoutCard from "@/app/loadout/components/LoadoutCard";
import { useLoadout } from "@/app/loadout/context/LoadoutContext";
import { LoadoutSlotKind } from "@/app/loadout/types/Loadout";
import BasicWeaponInfo from "@/app/weapon/[kind]/[id]/BasicWeaponInfo";
import ArmorBonusBadge from "@/components/ArmorBonusBadge";
import ArmorBonusGroup from "@/components/ArmorBonusGroup";
import SkillBadge from "@/components/SkillBadge";
import SkillRankGroup from "@/components/SkillRankGroup";
import { Grid, Group, Stack } from "@mantine/core";
import { useDisclosure, useMap } from "@mantine/hooks";
import React, { useState } from "react";

export default function Client({
  data,
}: {
  data: {
    // weapons: Weapon[];
    // armors: Armor[];
    armorSets: ArmorSet[];
    // charms: CharmRank[];
    decorations: Decoration[];
    skills: Skill[];
  };
}) {
  const { loadout, setDecoration } = useLoadout();
  const [selectedSlot, setSelectedSlot] = useState<
    | {
        loadoutSlot: LoadoutSlotKind;
        decorationIndex: number;
      }
    | undefined
  >();

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
  const skillMap = Object.groupBy(data.skills, (skill) => skill.id);

  const weapon = loadout.get("weapon")!.data as Weapon | undefined;
  const charm = loadout.get("charm")!.data as CharmRank | undefined;

  const loadoutSkillRanks: Record<number, number> = {};
  loadout
    .values()
    .map(({ data, decorations }) => [
      ...(data?.skills ?? []),
      ...Object.values(decorations ?? {})
        .filter((d) => !!d)
        .flatMap((decoration) => decoration.skills),
    ])
    .flatMap((skillRanks) => skillRanks)
    .forEach((skillRank) => {
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

  const [decorationModalOpen, { open, close, toggle }] = useDisclosure();
  const decorationFilter = useMap<string, any>([
    ["kind", DecorationKind.armor],
    ["slot", 1],
  ]);

  return (
    <>
      <Grid className="flex-grow">
        <Grid.Col span={{ base: 12, md: "auto" }} className="overflow-auto">
          <Stack gap="xs">
            <LoadoutCard
              iconUrl={`/icon/weapon/${weapon?.kind ?? "great-sword"}.png`}
              title={weapon?.name}
            >
              {weapon && (
                <BasicWeaponInfo
                  weapon={weapon}
                  skills={
                    weapon.skills.map(
                      (skillRank) => skillMap[skillRank.skill.id!]![0]
                    ) ?? []
                  }
                />
              )}
            </LoadoutCard>
            {Object.values(ArmorKind).map((armorKind, index) => {
              const armor = loadout.get(armorKind)?.data as Armor | undefined;
              return (
                <LoadoutCard
                  key={armorKind}
                  iconUrl={`/icon/armor/${armorKind}.png`}
                  title={armor?.name}
                  slots={armor?.slots}
                  decorationOnClick={({ decorationIndex }) => {
                    decorationFilter.set("kind", DecorationKind.armor);
                    decorationFilter.set(
                      "slot",
                      armor?.slots?.[decorationIndex]
                    );
                    setSelectedSlot({
                      loadoutSlot: armorKind,
                      decorationIndex,
                    });
                    open();
                  }}
                  decorations={
                    armor ? loadout.get(armor.kind)?.decorations : undefined
                  }
                >
                  <Group gap="xs">
                    {armor?.skills.map((skillRank) => (
                      <SkillBadge
                        key={skillRank.id}
                        skill={skillMap[skillRank.skill.id!]![0]}
                        skillRank={skillRank}
                      />
                    ))}
                    {armor && armorSetMap[armor.armorSet.id]![0].bonus && (
                      <ArmorBonusBadge
                        set
                        armorSet={armorSetMap[armor.armorSet.id]![0]}
                      />
                    )}
                    {armor && armorSetMap[armor.armorSet.id]![0].groupBonus && (
                      <ArmorBonusBadge
                        group
                        armorSet={armorSetMap[armor.armorSet.id]![0]}
                      />
                    )}
                  </Group>
                </LoadoutCard>
              );
            })}
            <LoadoutCard iconUrl={`/icon/armor/charm.png`} title={charm?.name}>
              <Group gap="xs">
                {charm?.skills.map((skillRank) => (
                  <SkillBadge
                    key={skillRank.id}
                    skill={skillMap[skillRank.skill.id!]![0]}
                    skillRank={skillRank}
                  />
                ))}
              </Group>
            </LoadoutCard>
          </Stack>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: "content" }}>
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
                  key={id}
                  skill={skillMap[Number(id)]![0]}
                  level={level}
                />
              ))}
            {Object.entries(setBonusSkills).map(([id, pieces]) => (
              <ArmorBonusGroup
                key={id}
                set
                data={{
                  armorSet: armorSetBonusMap.bonus[parseInt(id)]![0],
                }}
                pieces={pieces}
              />
            ))}
            {Object.entries(groupBonusSkills).map(([id, pieces]) => (
              <ArmorBonusGroup
                key={id}
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
        onClose={() => {
          setSelectedSlot(undefined);
          close();
        }}
        data={data}
        filter={{
          kind: decorationFilter.get("kind"),
          slot: decorationFilter.get("slot"),
        }}
        selection={selectedSlot!}
      />
    </>
  );
}
