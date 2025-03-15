import { BaseWeapon } from "@/app/api/mhdb/weapons/Weapon";
import { WeaponKind } from "@/app/api/mhdb/weapons/WeaponKind";

export interface LongSword extends BaseWeapon {
  kind: WeaponKind.LongSword;
}
