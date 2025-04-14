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
  evasion = "evasion", // Evasion & Movement Speed Up
  regen = "regen", // Health Regeneration
  stamina = "stamina", // Stamina Regeneration
  damage = "damage", // Attack & Affinity Up
  defense = "defense", // Defense & Elemental Res Up
  immunity = "immunity", // Ailments/Blights Negated
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
