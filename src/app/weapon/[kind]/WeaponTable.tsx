"use client";

import { Weapon } from "@/app/api/mhdb/weapons/Weapon";
import WeaponGroup from "@/app/weapon/[kind]/WeaponGroup";
import { Badge, Group, Table } from "@mantine/core";
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
import React, { useMemo } from "react";

type WeaponTableProps = {
  data: {
    weapons: Weapon[];
  };
  columnFiltersState: [
    ColumnFiltersState,
    React.Dispatch<React.SetStateAction<ColumnFiltersState>>
  ];
};

export default function WeaponTable({
  data: { weapons },
  columnFiltersState: [columnFilters, setColumnFilters],
}: WeaponTableProps) {
  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<Weapon>();
    return [
      columnHelper.accessor("name", {
        id: "name",
        header: () => "Name",
      }),
      columnHelper.accessor("description", {
        id: "description",
        header: () => "Description",
      }),
      columnHelper.accessor("series.id", {
        id: "series.id",
        header: () => "Series ID",
      }),
      columnHelper.accessor("series.name", {
        id: "series.name",
        header: () => "Weapon Series",
      }),
      columnHelper.accessor("crafting.row", {
        id: "crafting.row",
        header: () => "Row",
      }),
      columnHelper.accessor("crafting.column", {
        id: "crafting.column",
        header: () => "Column",
      }),
    ];
  }, []);

  const data = useMemo(() => weapons, []);

  const table = useReactTable({
    autoResetPageIndex: false,
    columns,
    data,
    initialState: {
      grouping: ["crafting.row"],
      sorting: [
        {
          id: "crafting.row",
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
          <Table.Th>Series</Table.Th>
          <Table.Th>Weapons</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {table?.getRowModel().rows.map((row) => (
          <Table.Tr key={row.id}>
            <Table.Td>{row.subRows[0].getValue("series.name")}</Table.Td>
            <Table.Td>
              <WeaponGroup
                weapons={row.subRows.map(({ original }) => original)}
              />
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}
