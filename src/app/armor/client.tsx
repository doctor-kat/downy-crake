"use client";

import { Armor } from "@/app/api/mhdb/armor/Armor";
import ArmorModal from "@/app/armor/ArmorModal";
import ArmorTable from "@/app/armor/ArmorTable";
import { useDisclosure } from "@mantine/hooks";
import { ColumnFilter } from "@tanstack/react-table";
import React, { useState } from "react";
import { ArmorSet } from "../api/mhdb/armor/sets/ArmorSet";
import { Skill } from "../api/mhdb/skills/Skill";

export default function Client({
  data,
}: {
  data: {
    armors: Armor[];
    armorSets: ArmorSet[];
    skills: Skill[];
  };
}) {
  const armorSets = Object.groupBy(data.armorSets, (armorSet) => armorSet.id);
  const skills = Object.groupBy(data.skills, (skill) => skill.id);

  const columnFiltersState = useState<ColumnFilter[]>([
    { id: "rank", value: ["high"] },
  ]);
  const [selected, setSelected] = useState<Armor>(data.armors[0]);
  const [opened, { open, close }] = useDisclosure();

  return (
    <>
      <ArmorTable
        data={data}
        columnFiltersState={columnFiltersState}
        onClick={(armor) => {
          setSelected(armor);
          open();
        }}
      />
      <ArmorModal
        modal={{ opened, close }}
        data={{
          armor: selected,
          armorSet: armorSets[selected.armorSet.id]![0],
          skills: [
            ...selected.skills.map((skill) => skill.id),
            armorSets[selected.armorSet.id]![0].bonus?.id,
            armorSets[selected.armorSet.id]![0].groupBonus?.id,
          ]
            .filter(
              (id): id is number => id !== undefined && skills[id] !== undefined
            )
            .map((id) => skills[id]![0]),
        }}
      />
    </>
  );
}
