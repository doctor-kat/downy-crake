import { Skill, SkillRank } from "@/app/api/mhdb/skills/Skill";
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
            width={20}
            height={20}
          />
        }
        rightSection={skillRank.level}
      >
        {skill.name}
      </Badge>
    </Tooltip>
  );
}
