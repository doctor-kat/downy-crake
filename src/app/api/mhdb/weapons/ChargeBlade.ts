import { BaseWeapon } from "@/app/api/mhdb/weapons/Weapon";
import { WeaponKind } from "@/app/api/mhdb/weapons/WeaponKind";

export interface ChargeBlade extends BaseWeapon {
  kind: WeaponKind.ChargeBlade;
  phial: ChargeBladePhial;
}

export enum ChargeBladePhial {
  element = "element",
  impact = "impact",
}
