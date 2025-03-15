import { BaseWeapon } from "@/app/api/mhdb/weapons/Weapon";
import { WeaponKind } from "@/app/api/mhdb/weapons/WeaponKind";

export interface SwordShield extends BaseWeapon {
  kind: WeaponKind.SwordShield;
}
