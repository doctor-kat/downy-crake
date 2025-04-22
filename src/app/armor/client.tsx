"use client";

import { Armor } from "@/app/api/mhdb/armor/Armor";
import { Rank } from "@/app/api/mhdb/dataTypes/Rank";
import ArmorTable from "@/app/armor/ArmorTable";
import { Autocomplete, Group, MultiSelect, Select, Stack } from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
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
          placeholder="Skill"
          data={data.skills
            .map((skill) => ({
              label: skill.name,
              value: String(skill.id),
            }))
            .toSorted(({ label: a }, { label: b }) => a.localeCompare(b))}
          onChange={(value) => setColumnFilter("skill.id", value)}
        />
      </Group>
      <ArmorTable
        data={data}
        columnFiltersState={[columnFilters, setColumnFilters]}
      />
    </Stack>
  );
}
