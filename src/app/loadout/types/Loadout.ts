import { Armor } from "@/app/api/mhdb/armor/Armor";
import { CharmRank } from "@/app/api/mhdb/charms/Charm";
import { Decoration } from "@/app/api/mhdb/decorations/Decoration";
import { Weapon } from "@/app/api/mhdb/weapons/Weapon";

export type LoadoutSlotKind =
  | "weapon"
  | "head"
  | "chest"
  | "arms"
  | "waist"
  | "legs"
  | "charm";

export type LoadoutSlot = {
  data?: Weapon | Armor | CharmRank;
  decorations?: Record<number, Decoration>;
};

export type Loadout = Map<LoadoutSlotKind, LoadoutSlot>;
