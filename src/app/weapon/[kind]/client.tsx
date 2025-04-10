"use client";

import { Weapon } from "@/app/api/mhdb/weapons/Weapon";
import WeaponTable from "@/app/weapon/[kind]/WeaponTable";
import { ColumnFilter } from "@tanstack/react-table";
import React, { useState } from "react";

export default function Client({
  data,
}: {
  data: {
    weapons: Weapon[];
  };
}) {
  const columnFiltersState = useState<ColumnFilter[]>([]);

  return <WeaponTable data={data} columnFiltersState={columnFiltersState} />;
}
