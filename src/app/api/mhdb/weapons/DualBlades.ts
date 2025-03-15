import { BaseWeapon } from "@/app/api/mhdb/weapons/Weapon";
import { WeaponKind } from "@/app/api/mhdb/weapons/WeaponKind";

export interface DualBlades extends BaseWeapon {
  kind: WeaponKind.DualBlades;
}
