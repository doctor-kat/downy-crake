import { CraftingCost } from "@/app/api/mhdb/dataTypes/CraftingCost";
import { DecorationSlot } from "@/app/api/mhdb/dataTypes/DecorationSlot";
import { Elderseal } from "@/app/api/mhdb/dataTypes/Elderseal";
import { Status } from "@/app/api/mhdb/dataTypes/Status";
import { SkillRank } from "@/app/api/mhdb/skills/Skill";
import { Bow } from "@/app/api/mhdb/weapons/Bow";
import { ChargeBlade } from "@/app/api/mhdb/weapons/ChargeBlade";
import { DualBlades } from "@/app/api/mhdb/weapons/DualBlades";
import { GreatSword } from "@/app/api/mhdb/weapons/GreatSword";
import { Gunlance } from "@/app/api/mhdb/weapons/Gunlance";
import { Hammer } from "@/app/api/mhdb/weapons/Hammer";
import { HeavyBowgun } from "@/app/api/mhdb/weapons/HeavyBowgun";
import { HuntingHorn } from "@/app/api/mhdb/weapons/HuntingHorn";
import { InsectGlaive } from "@/app/api/mhdb/weapons/InsectGlaive";
import { Lance } from "@/app/api/mhdb/weapons/Lance";
import { LightBowgun } from "@/app/api/mhdb/weapons/LightBowgun";
import { LongSword } from "@/app/api/mhdb/weapons/LongSword";
import { SwitchAxe } from "@/app/api/mhdb/weapons/SwitchAxe";
import { SwordShield } from "@/app/api/mhdb/weapons/SwordShield";
import { WeaponKind } from "@/app/api/mhdb/weapons/WeaponKind";

export type Weapon =
  | Bow
  | ChargeBlade
  | DualBlades
  | GreatSword
  | Gunlance
  | Hammer
  | HeavyBowgun
  | HuntingHorn
  | InsectGlaive
  | Lance
  | LightBowgun
  | LongSword
  | SwitchAxe
  | SwordShield;

export interface BaseWeapon {
  id: number;
  gameId: string;
  kind: WeaponKind;
  name: string;
  description: string;
  rarity: number;
  damage: WeaponDamage;
  specials: WeaponSpecial[];
  sharpness: Sharpness;
  handicraft: number[];
  skills?: SkillRank[];
  defenseBonus: number;
  elderseal: Elderseal;
  affinity: number;
  slots: DecorationSlot[];
  crafting: WeaponCrafting;
  series: WeaponSeries;
}

export interface WeaponDamage {
  raw: number;
  display: number;
}

export interface WeaponSpecial {
  id: number;
  damage: WeaponDamage;
  hidden: boolean;
  kind: SpecialKind;
}

export type SpecialKind = WeaponElement | WeaponStatus;

export interface WeaponElement {
  element: Element;
}

export interface WeaponStatus {
  status: Status;
}

export interface Sharpness {
  red: number;
  orange: number;
  yellow: number;
  green: number;
  blue: number;
  white: number;
  purple: number;
}

export interface WeaponCrafting {
  id: number;
  column: number;
  row: number;
  craftable: boolean;
  previous: BaseWeapon;
  branches: BaseWeapon[];
  craftingZennyCost: number;
  craftingMaterials: CraftingCost[];
  upgradeZennyCost: number;
  upgradeMaterials: CraftingCost[];
}

export interface WeaponSeries {
  id: number;
  gameId: string;
  name: string;
}
