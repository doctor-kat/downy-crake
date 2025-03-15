import { DecorationKind } from "@/app/api/mhdb/dataTypes/DecorationKind";
import { DecorationSlot } from "@/app/api/mhdb/dataTypes/DecorationSlot";
import { SkillRank } from "@/app/api/mhdb/skills/Skill";

export interface Decoration {
  id: number;
  gameId: string;
  name: string;
  description: string;
  slot: DecorationSlot;
  rarity: number;
  kind: DecorationKind;
  skills: SkillRank[];
}
