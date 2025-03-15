import { BaseWeapon } from "@/app/api/mhdb/weapons/Weapon";
import { WeaponKind } from "@/app/api/mhdb/weapons/WeaponKind";

export interface GreatSword extends BaseWeapon {
  kind: WeaponKind.GreatSword;
}
