"use client";

import { Armor } from "@/app/api/mhdb/armor/Armor";
import ArmorGroup from "@/app/armor/ArmorGroup";
import { SimpleGrid, Stack, Text } from "@mantine/core";
import {
  ColumnFiltersState,
  createColumnHelper,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getGroupedRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Image from "next/image";
import React, { useMemo } from "react";
import { ArmorSet } from "../api/mhdb/armor/sets/ArmorSet";
import { Skill } from "../api/mhdb/skills/Skill";

type ArmorTableProps = {
  data: {
    armors: Armor[];
    armorSets: ArmorSet[];
    skills: Skill[];
  };
  columnFiltersState: [
    ColumnFiltersState,
    React.Dispatch<React.SetStateAction<ColumnFiltersState>>
  ];
  onClick: (armor: Armor) => void;
};

export default function ArmorTable({
  data: { armors, armorSets, skills },
  columnFiltersState: [columnFilters, setColumnFilters],
  onClick,
}: ArmorTableProps) {
  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<Armor>();
    return [
      columnHelper.accessor("rank", {
        header: () => "Rank",
      }),
      columnHelper.accessor("kind", {
        header: () => "Kind",
        cell: (cell) => (
          <Image
            src={`/icon/armor_${cell.getValue()}.png`}
            alt={cell.getValue()}
            width={24}
            height={24}
          />
        ),
      }),
      columnHelper.accessor("name", {
        id: "name",
        header: () => "Name",
      }),
      columnHelper.accessor("armorSet.name", {
        id: "armorSet.name",
        header: () => "Armor Set Name",
      }),
    ];
  }, []);

  const data = useMemo(() => armors, []);

  const table = useReactTable({
    autoResetPageIndex: false,
    columns,
    data,
    initialState: {
      grouping: ["armorSet.name"],
      sorting: [
        {
          id: "armorSet.name",
          desc: false,
        },
      ],
      expanded: {},
    },
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  return (
    <Stack gap="md">
      {table?.getExpandedRowModel().rows.map((row) => (
        <SimpleGrid cols={2}>
          <Text>{row.getValue("armorSet.name") as string}</Text>
          <ArmorGroup
            armors={row.subRows.map(({ original }) => original)}
            onClick={onClick}
          />
        </SimpleGrid>
      ))}
    </Stack>
  );
}
