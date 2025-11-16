import {AmmoKind} from "@/app/api/mhdb/dataTypes/AmmoKind";
import {Color} from "@/app/api/mhdb/dataTypes/Color";
import {SkillIconKind} from "@/app/api/mhdb/skills/Skill";
import {BowCoating} from "@/app/api/mhdb/weapons/Bow";
import {HuntingHornNote} from "@/app/api/mhdb/weapons/HuntingHorn";
import {MantineColor} from "@mantine/core";

// Standard icon sizes used throughout the application
export const ICON_SIZE = {
  XS: 16,   // Indicator labels, small UI elements
  SM: 20,   // Badge leftSection icons
  MD: 24,   // Default icons (armor, weapons, navigation)
  LG: 30,   // App logo
  XL: 48,   // Large display icons (skill groups, armor bonus groups)
} as const;

export const rarityColor: MantineColor[] = [
  "gray",
  "gray",
  "white",
  "yellow",
  "green",
  "cyan",
  "blue",
  "violet",
  "orange",
];

export const skillColor: Record<SkillIconKind, MantineColor> = {
  affinity: "purple",
  attack: "red.7",
  defense: "yellow",
  element: "yellow",
  gathering: "yellow",
  group: "cyan",
  handicraft: "yellow",
  health: "green",
  item: "cyan",
  offense: "red",
  ranged: "pink.4",
  set: "brown",
  stamina: "yellow",
  utility: "blue",
};

export const coatingColor: Record<BowCoating, MantineColor> = {
  [BowCoating["close-range"]]: "white",
  [BowCoating.power]: "red",
  [BowCoating.pierce]: "blue",
  [BowCoating.paralysis]: "yellow",
  [BowCoating.poison]: "violet",
  [BowCoating.sleep]: "cyan",
  [BowCoating.blast]: "orange",
  [BowCoating.exhaust]: "indigo",
};

export const noteIcon: Record<HuntingHornNote, number> = {
  [HuntingHornNote.purple]: 1,
  [HuntingHornNote.red]: 2,
  [HuntingHornNote.orange]: 3,
  [HuntingHornNote.yellow]: 3,
  [HuntingHornNote.green]: 2,
  [HuntingHornNote.blue]: 3,
  [HuntingHornNote.aqua]: 3,
  [HuntingHornNote.white]: 1,
};

export const ammoIcon: Record<AmmoKind, number> = {
  [AmmoKind.normal]: 1,
  [AmmoKind.pierce]: 2,
  [AmmoKind.spread]: 3,
  [AmmoKind.slicing]: 4,
  [AmmoKind.sticky]: 4,
  [AmmoKind.cluster]: 5,
  [AmmoKind.wyvern]: 5,
  [AmmoKind.poison]: 1,
  [AmmoKind.paralysis]: 1,
  [AmmoKind.sleep]: 1,
  [AmmoKind.flaming]: 2,
  [AmmoKind.water]: 2,
  [AmmoKind.freeze]: 2,
  [AmmoKind.thunder]: 2,
  [AmmoKind.dragon]: 2,
  [AmmoKind.recover]: 4,
  [AmmoKind.demon]: 4,
  [AmmoKind.armor]: 4,
  [AmmoKind.exhaust]: 1,
  [AmmoKind.tranq]: 1,
};

export const ammoColor: Record<AmmoKind, MantineColor> = {
  [AmmoKind.normal]: "white",
  [AmmoKind.pierce]: "blue",
  [AmmoKind.spread]: "green",
  [AmmoKind.slicing]: "white",
  [AmmoKind.sticky]: "orange",
  [AmmoKind.cluster]: "red",
  [AmmoKind.wyvern]: "orange",
  [AmmoKind.poison]: "purple",
  [AmmoKind.paralysis]: "yellow",
  [AmmoKind.sleep]: "cyan",
  [AmmoKind.flaming]: "red",
  [AmmoKind.water]: "aqua",
  [AmmoKind.freeze]: "blue",
  [AmmoKind.thunder]: "yellow",
  [AmmoKind.dragon]: "red",
  [AmmoKind.recover]: "green",
  [AmmoKind.demon]: "red",
  [AmmoKind.armor]: "orange",
  [AmmoKind.exhaust]: "indigo",
  [AmmoKind.tranq]: "pink",
};

export const color: Record<Color, MantineColor> = {
  [Color.white]: "white",
  [Color.gray]: "gray.5",
  [Color.rose]: "pink.6",
  [Color.pink]: "pink.4",
  [Color.red]: "red",
  [Color.vermilion]: "red.6",
  [Color.orange]: "orange",
  [Color.brown]: "brown",
  [Color.ivory]: "gray.2",
  [Color.yellow]: "yellow",
  [Color.lemon]: "yellow.5",
  [Color["sage-green"]]: "green.3",
  [Color["moss-green"]]: "green.6",
  [Color.green]: "green",
  [Color.emerald]: "green.7",
  [Color.sky]: "blue.3",
  [Color.blue]: "blue",
  [Color.ultramarine]: "blue.8",
  [Color["blue-purple"]]: "violet.5",
  [Color.purple]: "violet",
  [Color["dark-purple"]]: "violet.9",
};
