"use client";

import { SimpleGrid, Card, Stack, Text, Group, Badge, Button, Divider } from "@mantine/core";
import Image from "next/image";
import { Armor, ArmorKind } from "@/app/api/mhdb/armor/Armor";
import { useLoadout } from "@/app/loadout/context/LoadoutContext";
import SkillBadge from "@/components/SkillBadge";

interface Props {
  combinations: {
    head: number;
    chest: number;
    arms: number;
    waist: number;
    legs: number;
  }[];
  armors: Armor[];
}

export default function CombinationResults({ combinations, armors }: Props) {
  const { setLoadout } = useLoadout();

  // Create a map for quick armor lookup
  const armorMap = new Map(armors.map((a) => [a.id, a]));

  const loadToLoadout = (combo: (typeof combinations)[0]) => {
    const head = armorMap.get(combo.head);
    const chest = armorMap.get(combo.chest);
    const arms = armorMap.get(combo.arms);
    const waist = armorMap.get(combo.waist);
    const legs = armorMap.get(combo.legs);

    if (head) setLoadout({ kind: ArmorKind.head, data: head });
    if (chest) setLoadout({ kind: ArmorKind.chest, data: chest });
    if (arms) setLoadout({ kind: ArmorKind.arms, data: arms });
    if (waist) setLoadout({ kind: ArmorKind.waist, data: waist });
    if (legs) setLoadout({ kind: ArmorKind.legs, data: legs });
  };

  return (
    <Stack gap="md">
      <Text fw={500} size="lg">
        Armor Combinations ({combinations.length})
      </Text>

      <SimpleGrid cols={{ base: 1, md: 2 }}>
        {combinations.map((combo, index) => {
          const head = armorMap.get(combo.head);
          const chest = armorMap.get(combo.chest);
          const arms = armorMap.get(combo.arms);
          const waist = armorMap.get(combo.waist);
          const legs = armorMap.get(combo.legs);

          const pieces = [head, chest, arms, waist, legs].filter(Boolean) as Armor[];

          // Calculate total defense
          const totalDefense = pieces.reduce((sum, p) => sum + p.defense.base, 0);

          // Calculate total skills
          const skillMap = new Map<number, number>();
          for (const piece of pieces) {
            for (const skillRank of piece.skills) {
              const current = skillMap.get(skillRank.skill.id) || 0;
              skillMap.set(skillRank.skill.id, current + skillRank.level);
            }
          }

          // Count total decoration slots
          const totalSlots = pieces.reduce(
            (sum, p) => sum + p.slots.reduce((s, slot) => s + (slot > 0 ? 1 : 0), 0),
            0
          );

          return (
            <Card key={index} shadow="sm" padding="md" radius="md" withBorder>
              <Stack gap="sm">
                {/* Armor pieces */}
                {pieces.map((piece) => (
                  <Group key={piece.id} gap="xs">
                    <Image
                      src={`/icon/armor/${piece.kind}.png`}
                      alt={piece.kind}
                      width={20}
                      height={20}
                    />
                    <Text size="sm">{piece.name}</Text>
                  </Group>
                ))}

                <Divider />

                {/* Stats */}
                <Group gap="md">
                  <Badge variant="light" color="blue">
                    Defense: {totalDefense}
                  </Badge>
                  <Badge variant="light" color="grape">
                    Slots: {totalSlots}
                  </Badge>
                </Group>

                {/* Skills */}
                <div>
                  <Text size="xs" fw={500} mb="xs">
                    Skills:
                  </Text>
                  <Group gap="xs">
                    {Array.from(skillMap.entries()).map(([skillId, level]) => {
                      // Find skill from any armor piece
                      const skillRank = pieces
                        .flatMap((p) => p.skills)
                        .find((sr) => sr.skill.id === skillId);

                      if (!skillRank) return null;

                      return (
                        <SkillBadge
                          key={skillId}
                          skillRank={{ ...skillRank, level }}
                          size="xs"
                        />
                      );
                    })}
                  </Group>
                </div>

                <Button
                  variant="light"
                  fullWidth
                  onClick={() => loadToLoadout(combo)}
                  mt="xs"
                >
                  Load to Loadout
                </Button>
              </Stack>
            </Card>
          );
        })}
      </SimpleGrid>
    </Stack>
  );
}
