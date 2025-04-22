"use client";

import { Skill } from "@/app/api/mhdb/skills/Skill";
import { Weapon } from "@/app/api/mhdb/weapons/Weapon";
import { ammoColor, ammoIcon, coatingColor, noteIcon } from "@/app/utils";
import SharpnessBar from "@/app/weapon/[kind]/[id]/SharpnessBar";
import SkillBadge from "@/components/SkillBadge";
import {
  Badge,
  Group,
  Indicator,
  Stack,
  Table,
  Text,
  ThemeIcon,
  Tooltip,
} from "@mantine/core";
import Image from "next/image";
import React from "react";
import IconAmmo1 from "./icon/ammo_1.svg";
import IconAmmo2 from "./icon/ammo_2.svg";
import IconAmmo3 from "./icon/ammo_3.svg";
import IconAmmo4 from "./icon/ammo_4.svg";
import IconAmmo5 from "./icon/ammo_5.svg";
import IconBowCoating from "./icon/bow_coating.svg";
import IconHuntingHornNote1 from "./icon/hunting-horn_note_1.svg";
import IconHuntingHornNote2 from "./icon/hunting-horn_note_2.svg";
import IconHuntingHornNote3 from "./icon/hunting-horn_note_3.svg";

export default function BasicWeaponInfo({
  weapon,
  skills,
}: {
  weapon: Weapon;
  skills: Skill[];
}) {
  const skillMap = Object.groupBy(skills, (skill) => skill.id);

  return (
    <Stack gap="sm">
      <Group>
        <Badge
          leftSection={
            <Image
              src={`/icon/ui/attack.png`}
              width={20}
              height={20}
              alt="raw"
            />
          }
        >
          {weapon.damage.raw} ({weapon.damage.display})
        </Badge>
        {weapon.affinity !== 0 && (
          <Badge
            leftSection={
              <Image
                src={`/icon/ui/affinity.png`}
                width={20}
                height={20}
                alt="affinity"
              />
            }
          >
            {weapon.affinity}%
          </Badge>
        )}
        {weapon.specials &&
          weapon.specials.map((special) => (
            <Badge
              key={special.id}
              leftSection={
                "element" in special ? (
                  <Image
                    src={`/icon/ui/${special.element}.png`}
                    width={20}
                    height={20}
                    alt="element"
                  />
                ) : (
                  <Image
                    src={`/icon/ui/${special.status}.png`}
                    width={20}
                    height={20}
                    alt="status"
                  />
                )
              }
            >
              {special.damage.raw} ({special.damage.display})
            </Badge>
          ))}
      </Group>
      {weapon.sharpness && <SharpnessBar {...weapon} height={32} />}
      {!!weapon.slots.length && (
        <Group>
          {weapon.slots.toSorted().map((slot, index) => (
            <ThemeIcon key={index} p="md">
              <Indicator
                label={
                  <Image
                    src={`/icon/ui/weapon.png`}
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
      {!!weapon.skills.length && (
        <Group>
          {weapon.skills.map((skillRank) => (
            <SkillBadge
              key={skillRank.id}
              skill={skillMap[skillRank.skill.id!]![0]}
              skillRank={skillRank}
            />
          ))}
        </Group>
      )}
      {weapon.kind === "bow" && (
        <Group>
          {weapon.coatings.map((bowCoating) => (
            <Badge
              key={bowCoating}
              c={coatingColor[bowCoating]}
              leftSection={<IconBowCoating width={20} height={20} />}
            >
              {bowCoating.replace("-", " ")}
            </Badge>
          ))}
        </Group>
      )}
      {weapon.kind === "hunting-horn" && (
        <Group>
          <Badge
            leftSection={
              <Image
                src={`/icon/ui/hunting-horn_notes.png`}
                width={20}
                height={20}
                alt="notes"
              />
            }
            rightSection={weapon.melody.notes.map((note) =>
              noteIcon[note] === 1 ? (
                <IconHuntingHornNote1
                  key={note}
                  width={20}
                  height={20}
                  color={note}
                />
              ) : noteIcon[note] === 2 ? (
                <IconHuntingHornNote2
                  key={note}
                  width={20}
                  height={20}
                  color={note}
                />
              ) : (
                <IconHuntingHornNote3
                  key={note}
                  width={20}
                  height={20}
                  color={note}
                />
              )
            )}
          >
            Notes
          </Badge>
          <Badge
            leftSection={
              <Image
                src={`/icon/ui/hunting-horn_echo_bubble.png`}
                width={20}
                height={20}
                alt="echo_bubble"
              />
            }
          >
            {weapon.echoBubble.name}
          </Badge>
        </Group>
      )}
      {weapon.kind === "charge-blade" && (
        <Badge
          leftSection={
            <Image
              src={`/icon/ui/phial_type.png`}
              width={20}
              height={20}
              alt="phial_type"
            />
          }
        >
          {weapon.phial}
        </Badge>
      )}
      {weapon.kind === "insect-glaive" && (
        <Badge
          leftSection={
            <Image
              src={`/icon/ui/kinsect.png`}
              width={20}
              height={20}
              alt="kinsect"
            />
          }
          rightSection={weapon.kinsectLevel}
        >
          Kinsect Level
        </Badge>
      )}
      {weapon.kind === "dual-blades"}
      {weapon.kind === "lance"}
      {weapon.kind === "great-sword"}
      {weapon.kind === "light-bowgun"}
      {weapon.kind === "gunlance"}
      {weapon.kind === "long-sword"}
      {weapon.kind === "hammer"}
      {weapon.kind === "switch-axe"}
      {"ammo" in weapon && (
        <Table highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Ammo</Table.Th>
              <Table.Th>Level</Table.Th>
              <Table.Th>Capacity</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {weapon.ammo.map((ammo) => (
              <Table.Tr key={ammo.kind}>
                <Table.Td>
                  <Group wrap="nowrap" c={ammoColor[ammo.kind]}>
                    {ammoIcon[ammo.kind] === 1 ? (
                      <IconAmmo1 width={20} height={20} />
                    ) : ammoIcon[ammo.kind] === 2 ? (
                      <IconAmmo2 width={20} height={20} />
                    ) : ammoIcon[ammo.kind] === 3 ? (
                      <IconAmmo3 width={20} height={20} />
                    ) : ammoIcon[ammo.kind] === 4 ? (
                      <IconAmmo4 width={20} height={20} />
                    ) : ammoIcon[ammo.kind] === 5 ? (
                      <IconAmmo5 width={20} height={20} />
                    ) : null}
                    <Text className="capitalize">{ammo.kind}</Text>
                  </Group>
                </Table.Td>
                <Table.Td>{ammo.level}</Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    <Text>{ammo.capacity}</Text>
                    {"rapid" in ammo && ammo.rapid && (
                      <Tooltip label="Rapid Fire">
                        <Image
                          src={`/icon/ui/ammo_rapid.png`}
                          width={20}
                          height={20}
                          alt="rapid_fire"
                        />
                      </Tooltip>
                    )}
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      )}
      {weapon.kind === "sword-shield"}
    </Stack>
  );
}
