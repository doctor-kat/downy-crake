"use client";

import { Skill } from "@/app/api/mhdb/skills/Skill";
import { Weapon } from "@/app/api/mhdb/weapons/Weapon";
import { rarityColor } from "@/app/utils";
import WeaponInfo from "@/app/weapon/[kind]/[id]/WeaponInfo";
import { Modal, SimpleGrid, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import React from "react";

export default function WeaponModal({
  weapon,
  skills,
}: {
  weapon: Weapon;
  skills: Skill[];
}) {
  const router = useRouter();

  return (
    <Modal
      opened
      onClose={() => router.back()}
      title={
        <SimpleGrid cols={2}>
          <Text fw={500} c={`${rarityColor[weapon.rarity]}.9`}>
            {weapon.name}
          </Text>
        </SimpleGrid>
      }
    >
      <WeaponInfo weapon={weapon} skills={skills} />
    </Modal>
  );
}
