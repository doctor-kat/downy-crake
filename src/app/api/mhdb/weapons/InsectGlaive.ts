import { BaseWeapon } from "@/app/api/mhdb/weapons/Weapon";
import { WeaponKind } from "@/app/api/mhdb/weapons/WeaponKind";

export interface InsectGlaive extends BaseWeapon {
  kind: WeaponKind.InsectGlaive;
  kinsectLevel: number;
}
