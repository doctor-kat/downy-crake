import { getAllCharms } from "@/app/api/mhdb/charms";
import Client from "@/app/charms/client";
import React from "react";

export default async function Page() {
  const charms = await getAllCharms();

  return <Client data={{ charms }} />;
}
