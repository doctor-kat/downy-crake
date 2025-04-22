"use client";

import { Armor } from "@/app/api/mhdb/armor/Armor";
import ArmorGroup from "@/app/armor/ArmorGroup";
import { Table } from "@mantine/core";
import {
  ColumnFiltersState,
  createColumnHelper,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getGroupedRowModel,
  getSortedRowModel,
  Row,
  useReactTable,
} from "@tanstack/react-table";
import React, { useMemo } from "react";
import { ArmorSet } from "../api/mhdb/armor/sets/ArmorSet";
import { Skill } from "../api/mhdb/skills/Skill";

function arrIntersection(
  row: Row<Armor>,
  columnId: string,
  filterValue: (string | null)[]
) {
  if (!filterValue?.length) return true;
  return (row.getValue(columnId) as number[]).some((id) =>
    filterValue.includes(String(id))
  );
}

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
};

export default function ArmorTable({
  data: { armors },
  columnFiltersState: [columnFilters, setColumnFilters],
}: ArmorTableProps) {
  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<Armor>();
    return [
      columnHelper.accessor("rank", {
        header: () => "Rank",
      }),
      columnHelper.accessor("kind", {
        header: () => "Kind",
      }),
      columnHelper.accessor("name", {
        id: "name",
        header: () => "Name",
      }),
      columnHelper.accessor("armorSet.name", {
        id: "armorSet.name",
        header: () => "Armor Set Name",
      }),
      columnHelper.accessor(
        (armor) => armor.skills.map((skillRank) => skillRank.skill.id),
        {
          id: "skill.id",
          filterFn: arrIntersection,
        }
      ),
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
    <Table striped highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Name</Table.Th>
          <Table.Th>Armor</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {table?.getRowModel().rows.map((row) => (
          <Table.Tr key={row.id}>
            <Table.Td>{row.getValue("armorSet.name")}</Table.Td>
            <Table.Td>
              <ArmorGroup
                armors={row.subRows.map(({ original }) => original)}
              />
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}
