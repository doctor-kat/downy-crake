import { AmmoKind } from "@/app/api/mhdb/dataTypes/AmmoKind";
import { BaseWeapon } from "@/app/api/mhdb/weapons/Weapon";
import { WeaponKind } from "@/app/api/mhdb/weapons/WeaponKind";

export interface LightBowgun extends BaseWeapon {
  kind: WeaponKind.LightBowgun;
  ammo: LightBowgunAmmo[];
  specialAmmo: LightBowgunSpecialAmmo;
}

export interface LightBowgunAmmo {
  kind: AmmoKind;
  level: number;
  capacity: number;
  rapid: boolean;
}

export enum LightBowgunSpecialAmmo {
  wyvernblast,
  adhesive,
}
