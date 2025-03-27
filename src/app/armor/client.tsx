"use client";

import { Armor } from "@/app/api/mhdb/armor/Armor";
import { Rank } from "@/app/api/mhdb/dataTypes/Rank";
import { Skill } from "@/app/api/mhdb/skills/Skill";
import { Stack, Table, Text } from "@mantine/core";
import {
  ColumnFilter,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getGroupedRowModel,
  GroupingState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import React, { useMemo } from "react";

export default function Client({
  armors,
  skills,
}: {
  armors: Armor[];
  skills: Skill[];
}) {
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
      // columnHelper.accessor("skills.id", {
      //   header: () => "Skill",
      // }),
      columnHelper.accessor("armorSet.name", {
        id: "armorSet.name",
        header: () => "Armor Set Name",
      }),
    ];
  }, []);

  const [columnFilters, setColumnFilters] = React.useState<ColumnFilter[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([
    {
      id: "groupName",
      desc: false,
    },
  ]);
  const [grouping, setGrouping] = React.useState<GroupingState>([
    "armorSet.name",
  ]);

  const table = useReactTable({
    debugTable: true,
    columns,
    data: armors,
    state: {
      columnFilters,
      sorting,
      grouping,
    },
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onGroupingChange: setGrouping,
    getCoreRowModel: getCoreRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <Stack>
      <Text>{JSON.stringify(table.getState())}</Text>
      <Table>
        <Table.Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Tr key={headerGroup.id}>
              {headerGroup.headers.map((
                header // map over the headerGroup headers array
              ) => (
                <Table.Th key={header.id} colSpan={header.colSpan}>
                  {header.id}
                </Table.Th>
              ))}
            </Table.Tr>
          ))}
        </Table.Thead>
        <Table.Tbody>
          {table.getExpandedRowModel().rows.map((row) => (
            <Table.Tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Table.Td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Table.Td>
              ))}
            </Table.Tr>
          ))}
        </Table.Tbody>
        <Table.Caption>Scroll page to see sticky thead</Table.Caption>
      </Table>
      {/*<Stack gap="md">*/}
      {/*  {table.getExpandedRowModel().rows.map((row) => (*/}
      {/*    <Stack key={row.id} gap="lg">*/}
      {/*      {row.getVisibleCells().map((cell) => (*/}
      {/*        <Text key={cell.id}>*/}
      {/*          {flexRender(cell.column.columnDef.cell, cell.getContext())}*/}
      {/*        </Text>*/}
      {/*        // <Text>{JSON.stringify(Object.keys(row))}</Text>*/}
      {/*      ))}*/}
      {/*      /!*<Group gap={2}>*!/*/}
      {/*      /!*  {Object.values(ArmorKind).map((kind) => {*!/*/}
      {/*      /!*    const armor = table.?.filter((armor) => armor.kind === kind)[0];*!/*/}
      {/*      /!*    return (*!/*/}
      {/*      /!*      <Tooltip label={armor?.name} disabled={!armor}>*!/*/}
      {/*      /!*        <Badge*!/*/}
      {/*      /!*          variant="outline"*!/*/}
      {/*      /!*          circle*!/*/}
      {/*      /!*          color={*!/*/}
      {/*      /!*            armors?.some((armor) => armor.kind === kind)*!/*/}
      {/*      /!*              ? "blue"*!/*/}
      {/*      /!*              : "red"*!/*/}
      {/*      /!*          }*!/*/}
      {/*      /!*          classNames={{*!/*/}
      {/*      /!*            root: "rounded-none",*!/*/}
      {/*      /!*            label: "capitalize",*!/*/}
      {/*      /!*          }}*!/*/}
      {/*      /!*        >*!/*/}
      {/*      /!*          {kind.slice(0, 1)}*!/*/}
      {/*      /!*        </Badge>*!/*/}
      {/*      /!*      </Tooltip>*!/*/}
      {/*      /!*    );*!/*/}
      {/*      /!*  })}*!/*/}
      {/*      /!*</Group>*!/*/}
      {/*    </Stack>*/}
      {/*  ))}*/}
      {/*</Stack>*/}
    </Stack>
  );
}
