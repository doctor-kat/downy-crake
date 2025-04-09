import { getAllDecorations } from "@/app/api/mhdb/decorations/route";
import Client from "@/app/decorations/client";
import React from "react";

export default async function Page() {
  const decorations = await getAllDecorations();

  return <Client data={{ decorations }} />;
}
