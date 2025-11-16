import { Skill, SkillRank } from "@/app/api/mhdb/skills/Skill";
import { ICON_SIZE } from "@/app/utils";
import { Badge, Tooltip } from "@mantine/core";
import Image from "next/image";
import React from "react";

export default function SkillBadge({
  skill,
  skillRank,
}: {
  skill: Skill;
  skillRank: SkillRank;
}) {
  return (
    <Tooltip key={skillRank.id} label={skillRank.description}>
      <Badge
        leftSection={
          <Image
            src={`/icon/skills/${skill.icon.kind}.png`}
            alt={skill.icon.kind}
            width={ICON_SIZE.SM}
            height={ICON_SIZE.SM}
          />
        }
        rightSection={skillRank.level}
      >
        {skill.name}
      </Badge>
    </Tooltip>
  );
}
