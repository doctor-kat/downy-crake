"use client";

import { ArmorSet } from "@/app/api/mhdb/armor/sets/ArmorSet";
import { Decoration } from "@/app/api/mhdb/decorations/Decoration";
import { Skill } from "@/app/api/mhdb/skills/Skill";
import Client from "@/app/loadout/client";
import { Modal } from "@mantine/core";
import { useRouter } from "next/navigation";
import React from "react";

export default function LoadoutModal({
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
  const router = useRouter();
  const closeModal = () => router.back();

  return (
    <Modal opened onClose={closeModal} title="Loadout" size="xl">
      <Client data={data} />
    </Modal>
  );
}
