import { BaseWeapon } from "@/app/api/mhdb/weapons/Weapon";
import { WeaponKind } from "@/app/api/mhdb/weapons/WeaponKind";

export interface Gunlance extends BaseWeapon {
  kind: WeaponKind.Gunlance;
  shell: GunlanceShell;
  shellLevel: number;
}

export enum GunlanceShell {
  normal,
  wide,
  long,
}
