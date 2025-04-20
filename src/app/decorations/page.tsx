import { DecorationKind } from "@/app/api/mhdb/dataTypes/DecorationKind";
import { getAllDecorations } from "@/app/api/mhdb/decorations";
import { getAllSkills } from "@/app/api/mhdb/skills";
import Client from "@/app/decorations/client";
import React from "react";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { kind } = await searchParams;

  const decorations = await getAllDecorations({
    kind: kind as DecorationKind | undefined,
  });
  const allSkills = await getAllSkills();

  const decorationSkillIds = decorations.reduce<Set<number>>(
    (acc, decoration) => {
      decoration.skills.forEach((skillRank) => acc.add(skillRank.skill.id!));
      return acc;
    },
    new Set()
  );
  const skills = allSkills.filter((skill) => decorationSkillIds.has(skill.id));

  return <Client data={{ decorations, skills }} />;
}
