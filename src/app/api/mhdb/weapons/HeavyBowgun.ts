import { AmmoKind } from "@/app/api/mhdb/dataTypes/AmmoKind";
import { BaseWeapon } from "@/app/api/mhdb/weapons/Weapon";
import { WeaponKind } from "@/app/api/mhdb/weapons/WeaponKind";

export interface HeavyBowgun extends BaseWeapon {
  kind: WeaponKind.HeavyBowgun;
  ammo: HeavyBowgunAmmo[];
}

export interface HeavyBowgunAmmo {
  kind: AmmoKind;
  level: number;
  capacity: number;
}
