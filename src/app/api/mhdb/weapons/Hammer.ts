import { BaseWeapon } from "@/app/api/mhdb/weapons/Weapon";
import { WeaponKind } from "@/app/api/mhdb/weapons/WeaponKind";

export interface Hammer extends BaseWeapon {
  kind: WeaponKind.Hammer;
}
