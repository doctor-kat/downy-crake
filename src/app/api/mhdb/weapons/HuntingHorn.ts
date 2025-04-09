import { BaseWeapon } from "@/app/api/mhdb/weapons/Weapon";
import { WeaponKind } from "@/app/api/mhdb/weapons/WeaponKind";

export interface HuntingHorn extends BaseWeapon {
  kind: WeaponKind.HuntingHorn;
  melody: HuntingHornMelody;
  echoBubble: HuntingHornBubble;
  echoWave: HunterHornWave;
}

export interface HuntingHornMelody {
  id: number;
  gameId: string;
  notes: HuntingHornNote[];
  songs: HuntingHornSong[];
}

export enum HuntingHornNote {
  purple = "purple",
  red = "red",
  orange = "orange",
  yellow = "yellow",
  green = "green",
  blue = "blue",
  aqua = "aqua",
  white = "white",
}

export interface HuntingHornSong {
  id: number;
  effectId: number;
  sequence: HuntingHornNote[];
  name: string;
}

export interface HuntingHornBubble {
  id: number;
  gameId: string;
  kind: HunterHornBubbleKind;
  name: string;
}

export enum HunterHornBubbleKind {
  evasion = "evasion", // Evasion & Movement Speed Upregen="regen", // Health Regenerationstamina="stamina", // Stamina Regenerationdamage="damage", // Attack & Affinity Updefense="defense", // Defense & Elemental Res Upimmunity="immunity", // Ailments/Blights Negated
}

export interface HunterHornWave {
  id: number;
  gameId: string;
  kind: HuntingHornWaveKind;
  name: string;
}

export enum HuntingHornWaveKind {
  thunder = "thunder",
  ice = "ice",
  dragon = "dragon",
  poison = "poison",
  paralyze = "paralyze",
  sleep = "sleep",
  blast = "blast",
}
