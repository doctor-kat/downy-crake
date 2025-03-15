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
  purple,
  red,
  orange,
  yellow,
  green,
  blue,
  aqua,
  white,
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
  evasion, // Evasion & Movement Speed Up
  regen, // Health Regeneration
  stamina, // Stamina Regeneration
  damage, // Attack & Affinity Up
  defense, // Defense & Elemental Res Up
  immunity, // Ailments/Blights Negated
}

export interface HunterHornWave {
  id: number;
  gameId: string;
  kind: HuntingHornWaveKind;
  name: string;
}

export enum HuntingHornWaveKind {
  thunder,
  ice,
  dragon,
  poison,
  paralyze,
  sleep,
  blast,
}
