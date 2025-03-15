import { BaseWeapon } from "@/app/api/mhdb/weapons/Weapon";
import { WeaponKind } from "@/app/api/mhdb/weapons/WeaponKind";

export interface Bow extends BaseWeapon {
  kind: WeaponKind.Bow;
  coatings: BowCoating[];
}

export enum BowCoating {
  "close-range" = "close-range",
  power = "power",
  pierce = "pierce",
  paralysis = "paralysis",
  poison = "poison",
  sleep = "sleep",
  blast = "blast",
  exhaust = "exhaust",
}
