"use client";

import { getAllArmor } from "@/app/api/mhdb/armor";
import { Armor } from "@/app/api/mhdb/armor/Armor";
import { getAllArmorSets } from "@/app/api/mhdb/armor/sets";
import { ArmorSet } from "@/app/api/mhdb/armor/sets/ArmorSet";
import { getAllCharms } from "@/app/api/mhdb/charms";
import { CharmRank } from "@/app/api/mhdb/charms/Charm";
import { getAllDecorations } from "@/app/api/mhdb/decorations";
import { Decoration } from "@/app/api/mhdb/decorations/Decoration";
import { getAllSkills } from "@/app/api/mhdb/skills";
import { Skill } from "@/app/api/mhdb/skills/Skill";
import { getAllWeapons } from "@/app/api/mhdb/weapons";
import { Weapon } from "@/app/api/mhdb/weapons/Weapon";
import Loading from "@/app/loading";
import Client from "@/app/loadout/client";
import React, { useEffect } from "react";

export default function Data() {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<{
    weapons: Weapon[];
    armors: Armor[];
    armorSets: ArmorSet[];
    charms: CharmRank[];
    decorations: Decoration[];
    skills: Skill[];
  }>({
    weapons: [],
    armors: [],
    armorSets: [],
    charms: [],
    decorations: [],
    skills: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const [
        weapons,
        armors,
        armorSets,
        charms,
        decorations,
        skills,
      ] = await Promise.all([
        getAllWeapons(),
        getAllArmor(),
        getAllArmorSets(),
        getAllCharms(),
        getAllDecorations(),
        getAllSkills(),
      ]);

      setData({
        weapons,
        armors,
        armorSets,
        charms: charms.flatMap((charm) => charm.ranks),
        decorations,
        skills,
      });
      setLoading(false);
    };

    fetchData();
  }, []);

  return loading ? <Loading /> : <Client data={data} />;
}
