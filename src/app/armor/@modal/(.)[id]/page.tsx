import ArmorModal from "@/app/armor/@modal/(.)[id]/ArmorModal";
import { getData } from "@/app/armor/[id]/page";
import React from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const data = await getData({ id });

  return <ArmorModal {...data} />;
}
