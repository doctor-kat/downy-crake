import { getAllArmor } from "@/app/api/mhdb/armor";
import { getAllArmorSets } from "@/app/api/mhdb/armor/sets";
import { getAllCharms } from "@/app/api/mhdb/charms";
import { getAllDecorations } from "@/app/api/mhdb/decorations";
import { getAllSkills } from "@/app/api/mhdb/skills";
import { getAllWeapons } from "@/app/api/mhdb/weapons";
import Client from "@/app/loadout/client";
import { Loadout } from "@/app/loadout/Loadout";
import React from "react";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const loadout: Loadout = {
    weapon: [1],
    head: [561, 8],
    chest: [37, 8],
    arms: [206, 8, 8],
    waist: [519, 8],
    legs: [555, 8, 8, 8],
    charm: [1],
  };

  const loadoutIds = (await searchParams).l;

  if (loadoutIds) {
    const [weapon, head, chest, arms, waist, legs, charm] = (Array.isArray(
      loadoutIds
    )
      ? loadoutIds
      : loadoutIds.split(",")
    ).map((id) => id.split("|").map((id) => parseInt(id)));

    loadout.weapon = weapon;
    loadout.head = head;
    loadout.chest = chest;
    loadout.arms = arms;
    loadout.waist = waist;
    loadout.legs = legs;
    loadout.charm = charm;
  }

  const weapons = await getAllWeapons();
  const armors = await getAllArmor();
  const armorSets = await getAllArmorSets();
  const charms = await getAllCharms();
  const decorations = await getAllDecorations();
  const skills = await getAllSkills();

  return (
    <Client
      data={{
        weapons,
        armors,
        armorSets,
        charms: charms.flatMap((charm) => charm.ranks),
        decorations,
        skills,
      }}
      loadout={loadout}
    />
  );
}
