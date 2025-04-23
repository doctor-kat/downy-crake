"use client";

import { Armor } from "@/app/api/mhdb/armor/Armor";
import { Rank } from "@/app/api/mhdb/dataTypes/Rank";
import ArmorTable from "@/app/armor/ArmorTable";
import { Autocomplete, Group, MultiSelect, Select, Stack } from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
import { ColumnFilter } from "@tanstack/react-table";
import React, { useState } from "react";
import { ArmorSet, ArmorSetBonus } from "../api/mhdb/armor/sets/ArmorSet";
import { Skill } from "../api/mhdb/skills/Skill";

export default function Client({
  data,
}: {
  data: {
    armors: Armor[];
    armorSets: ArmorSet[];
    skills: Skill[];
    bonusSkills: Skill[];
  };
}) {
  const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([
    { id: "rank", value: ["high"] },
    { id: "name", value: [""] },
  ]);

  const columnFilterMap: Record<string, any> = Object.fromEntries(
    columnFilters.map((columnFilter) => [columnFilter.id, columnFilter.value])
  );

  const setColumnFilter = useDebouncedCallback(
    (key: string, value: string | string[] | null) => {
      setColumnFilters(
        Object.entries({
          ...columnFilterMap,
          [key]: value,
        }).map(([key, value]) => ({
          id: key,
          value: Array.isArray(value) ? value : value ? [value] : null,
        }))
      );
    },
    200
  );

  const bonusSkillIds = new Set<number>();
  (["bonus", "groupBonus"] as (keyof ArmorSet)[]).forEach((bonusKind) =>
    data.armorSets.forEach((armorSet) => {
      const bonus = armorSet[bonusKind] as ArmorSetBonus;
      if (bonus) {
        bonusSkillIds.add(bonus.skill.id);
      }
    })
  );

  return (
    <Stack>
      <Group>
        <Select
          classNames={{ input: "capitalize", option: "capitalize" }}
          placeholder="Rank"
          defaultValue={Rank.high}
          data={Object.values(Rank)}
          onChange={(value) => setColumnFilter("rank", value)}
        />
        <Autocomplete
          placeholder="Name"
          data={data.armorSets.map((armorSet) => armorSet.name)}
          onChange={(value) => setColumnFilter("armorSet.name", value)}
        />
        <MultiSelect
          classNames={{ input: "capitalize", option: "capitalize" }}
          clearable
          searchable
          placeholder="Skills"
          data={data.skills
            .map((skill) => ({
              label: skill.name,
              value: String(skill.id),
            }))
            .toSorted(({ label: a }, { label: b }) => a.localeCompare(b))}
          onChange={(value) => setColumnFilter("skill.id", value)}
        />
        <MultiSelect
          classNames={{ input: "capitalize", option: "capitalize" }}
          clearable
          searchable
          placeholder="Bonus Skills"
          data={data.bonusSkills
            .map((skill) => ({
              label: skill.name,
              value: String(skill.id),
            }))
            .toSorted(({ label: a }, { label: b }) => a.localeCompare(b))}
          onChange={(value) => setColumnFilter("bonus.skill.id", value)}
        />
      </Group>
      <ArmorTable
        data={data}
        columnFiltersState={[columnFilters, setColumnFilters]}
      />
    </Stack>
  );
}
