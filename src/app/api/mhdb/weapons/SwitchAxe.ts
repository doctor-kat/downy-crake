import { BaseWeapon, WeaponDamage } from "@/app/api/mhdb/weapons/Weapon";
import { WeaponKind } from "@/app/api/mhdb/weapons/WeaponKind";

export interface SwitchAxe extends BaseWeapon {
  kind: WeaponKind.SwitchAxe;
  phial: Phial;
}

export interface Phial {
  kind: SwitchAxePhial;
  damage: WeaponDamage;
}

export enum SwitchAxePhial {
  power = "power",
  element = "element",
  dragon = "dragon",
  exhaust = "exhaust",
  paralyze = "paralyze",
  poison = "poison",
}
