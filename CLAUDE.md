# Monster Hunter Wilds Set Builder - Codebase Documentation

A Next.js application for browsing and managing Monster Hunter Wilds equipment, weapons, skills, and loadouts.

---

## 1. Project Overview

**Name:** Monster Hunter Wilds Set Builder (mhwsb)  
**Framework:** Next.js 15.2.1 with React 19  
**Language:** TypeScript 5  
**Package Manager:** pnpm  
**Main Purpose:** Equipment and loadout management tool for Monster Hunter Wilds

### Key Features:
- Browse armor pieces organized by sets
- Explore all weapon types with detailed stats and crafting trees
- View skills and decorations database
- Build and save loadouts with skill aggregation
- Modal-based detailed views for equipment
- Skill matching and filtering across equipment

---

## 2. Directory Structure

```
src/
├── app/
│   ├── api/mhdb/                          # API layer - wraps Monster Hunter DB
│   │   ├── endpoint.ts                    # Base URL configuration
│   │   ├── dataTypes/                     # Enums and shared types
│   │   │   ├── AmmoKind.ts
│   │   │   ├── Color.ts
│   │   │   ├── CraftingCost.ts
│   │   │   ├── DamageKind.ts
│   │   │   ├── DecorationKind.ts
│   │   │   ├── DecorationSlot.ts
│   │   │   ├── Elderseal.ts
│   │   │   ├── Element.ts
│   │   │   ├── Rank.ts
│   │   │   └── Status.ts
│   │   ├── armor/                        # Armor data models and fetching
│   │   │   ├── Armor.ts                  # Core armor interface
│   │   │   ├── index.ts                  # Fetch functions
│   │   │   ├── route.ts                  # API endpoint
│   │   │   └── sets/
│   │   │       ├── ArmorSet.ts           # Armor set with bonuses
│   │   │       ├── index.ts
│   │   │       └── route.ts
│   │   ├── weapons/                      # 14 weapon types
│   │   │   ├── Weapon.ts                 # Union type + BaseWeapon interface
│   │   │   ├── WeaponKind.ts             # Enum of 14 weapon types
│   │   │   ├── Bow.ts                    # Specific weapon implementations
│   │   │   ├── ChargeBlade.ts
│   │   │   ├── DualBlades.ts
│   │   │   ├── GreatSword.ts
│   │   │   ├── Gunlance.ts
│   │   │   ├── Hammer.ts
│   │   │   ├── HeavyBowgun.ts
│   │   │   ├── HuntingHorn.ts
│   │   │   ├── InsectGlaive.ts
│   │   │   ├── Lance.ts
│   │   │   ├── LightBowgun.ts
│   │   │   ├── LongSword.ts
│   │   │   ├── SwitchAxe.ts
│   │   │   ├── SwordShield.ts
│   │   │   ├── index.ts
│   │   │   └── route.ts
│   │   ├── charms/                       # Charm data
│   │   │   ├── Charm.ts
│   │   │   ├── index.ts
│   │   │   └── route.ts
│   │   ├── decorations/                  # Decoration (jewel) data
│   │   │   ├── Decoration.ts
│   │   │   ├── index.ts
│   │   │   └── route.ts
│   │   ├── skills/                       # Skill data
│   │   │   ├── Skill.ts
│   │   │   ├── index.ts
│   │   │   └── route.ts
│   │   ├── items/                        # Item data
│   │   │   ├── Item.ts
│   │   │   ├── index.ts
│   │   │   └── route.ts
│   │   └── ailments/                     # Ailment data
│   │       ├── Ailment.ts
│   │       ├── index.ts
│   │       └── route.ts
│   ├── armor/                            # Armor pages and components
│   │   ├── page.tsx                      # Server component - fetches data
│   │   ├── client.tsx                    # Client - filters and renders table
│   │   ├── layout.tsx                    # Layout with modal slot
│   │   ├── ArmorTable.tsx                # TanStack table with grouping
│   │   ├── ArmorGroup.tsx                # Display armor pieces in set
│   │   ├── [id]/
│   │   │   ├── page.tsx                  # Detail page
│   │   │   ├── ArmorInfo.tsx             # Armor stats and info
│   │   │   └── data.tsx                  # Data fetching for detail
│   │   └── @modal/                       # Modal slot for detail view
│   │       ├── default.tsx
│   │       └── (.)[id]/
│   │           ├── page.tsx
│   │           └── ArmorModal.tsx
│   ├── weapon/                           # Weapon pages (dynamic by kind)
│   │   └── [kind]/
│   │       ├── page.tsx                  # Server - fetch weapons by kind
│   │       ├── client.tsx                # Client - render table
│   │       ├── layout.tsx                # Layout with modal slot
│   │       ├── WeaponTable.tsx           # TanStack table grouped by series
│   │       ├── WeaponGroup.tsx           # Weapon card grid
│   │       ├── artian.ts                 # Artian weapon overrides
│   │       ├── [id]/
│   │       │   ├── page.tsx
│   │       │   ├── BasicWeaponInfo.tsx   # Weapon stats display
│   │       │   ├── SharpnessBar.tsx      # Sharpness visualization
│   │       │   ├── data.tsx
│   │       │   └── icon/                 # SVG icons for weapon specifics
│   │       └── @modal/                   # Modal slot
│   │           ├── default.tsx
│   │           └── (.)[id]/
│   │               ├── page.tsx
│   │               └── WeaponModal.tsx
│   ├── loadout/                          # Loadout builder
│   │   ├── page.tsx                      # Server - fetch all data
│   │   ├── client.tsx                    # Main loadout builder UI
│   │   ├── default.tsx
│   │   ├── context/
│   │   │   └── LoadoutContext.tsx        # Context + custom hook
│   │   ├── types/
│   │   │   └── Loadout.ts                # Loadout data structures
│   │   └── components/
│   │       ├── LoadoutCard.tsx           # Equipment slot display
│   │       ├── AddToLoadout.tsx          # Add to loadout button
│   │       └── DecorationModal.tsx       # Modal for picking decorations
│   ├── charms/                           # Charms page
│   │   ├── page.tsx
│   │   └── client.tsx
│   ├── decorations/                      # Decorations page
│   │   ├── page.tsx
│   │   └── client.tsx
│   ├── skills/                           # Skills page
│   │   ├── page.tsx
│   │   └── client.tsx
│   ├── @loadout/                         # Modal slot for loadout
│   │   ├── default.tsx
│   │   └── (.)loadout/
│   │       ├── page.tsx
│   │       └── LoadoutModal.tsx
│   ├── RootShell.tsx                     # Main layout shell + navigation
│   ├── layout.tsx                        # Root layout
│   ├── page.tsx                          # Home (redirect to /armor)
│   ├── default.tsx
│   ├── loading.tsx                       # Loading skeleton
│   ├── not-found.tsx                     # 404 page
│   ├── theme.ts                          # Mantine theme configuration
│   ├── utils.ts                          # Color and icon mappings
│   └── globals.css                       # Global styles
├── components/                           # Reusable shared components
│   ├── SkillBadge.tsx                    # Skill display with icon/tooltip
│   ├── SkillRankGroup.tsx                # Skill level display
│   ├── ArmorBonusBadge.tsx               # Set bonus indicator
│   ├── ArmorBonusGroup.tsx               # Set bonus skill display
│   ├── DecorationButton.tsx              # Decoration slot button
│   ├── DecorationImage.tsx               # Decoration icon
│   └── EmptyDecorationImage.tsx          # Empty slot icon
└── public/                               # Static assets
    └── icon/                             # Game icons organized by category
        ├── armor/                        # Armor piece type icons
        ├── weapon/                       # Weapon type icons
        ├── skills/                       # Skill icons by type
        ├── decoration/                   # Decoration slot size icons
        ├── element/                      # Elemental damage icons
        ├── ailment/                      # Status ailment icons
        ├── endemic/                      # Endemic creature icons
        ├── ui/                           # UI element icons
        └── [other categories]
```

---

## 3. Key Architectural Patterns

### 3.1 Server/Client Component Architecture

The app uses Next.js 15 App Router with strategic separation:

**Server Components (pages with async functions):**
- Fetch all data from Monster Hunter DB API
- Pass props to Client components
- Examples: `armor/page.tsx`, `weapon/[kind]/page.tsx`, `loadout/page.tsx`

**Client Components ("use client"):**
- Handle filtering, sorting, and user interactions
- Use TanStack React Table for complex tables
- Examples: `armor/client.tsx`, `weapon/[kind]/client.tsx`, `loadout/client.tsx`

**Pattern:**
```typescript
// page.tsx (Server)
const data = await fetchData();
return <Client data={data} />;

// client.tsx ("use client")
export default function Client({ data }) {
  const [filters, setFilters] = useState();
  // Handle interactivity
}
```

### 3.2 Parallel Routes (Modals)

Uses Next.js parallel routes (`@slot` syntax) for overlay modals:

```
/armor/@modal/(.)id/  -> ArmorModal
/weapon/[kind]/@modal/(.)id/  -> WeaponModal
/@loadout/(.)loadout/  -> LoadoutModal
```

Benefits:
- URL-based modal state
- Soft navigation with browser history
- Content persists while modal opens/closes
- Deep linking to specific modals

### 3.3 TanStack React Table Integration

Used for complex data display with filtering and grouping:

**Features:**
- Column filtering with custom filter functions
- Grouping (e.g., group armor by set name, weapons by series)
- Sorting (e.g., sort by rarity, name)
- Expanded row states for hierarchical data

**Example - Armor Table:**
- Groups armor by armor set
- Filters by rank, name, skills, set bonuses
- Displays only the most relevant armor per set

### 3.4 Context API for State Management

**LoadoutContext:**
- Centralizes loadout state (weapon, armor pieces, charm, decorations)
- Uses Mantine's `useMap` hook for Map-based state
- Persists to localStorage automatically
- Provides `useLoadout()` custom hook for components

**State Structure:**
```typescript
Map<LoadoutSlotKind, LoadoutSlot>

LoadoutSlot = {
  data?: Weapon | Armor | CharmRank,
  decorations?: Record<number, Decoration>
}
```

---

## 4. Main Features and Functionality

### 4.1 Armor Browser
- View all armor pieces grouped by armor sets
- Filter by:
  - Rank (low/high)
  - Name/armor set
  - Skills provided
  - Set bonuses (2-piece, group bonuses)
- Detail modal with carousel navigation between armor pieces in a set
- Add armor to loadout from detail view
- Shows defense stats, elemental resistances, decoration slots, skills

### 4.2 Weapon Browser
- Browse 14 weapon types separately:
  - Great Sword, Long Sword, Sword & Shield, Dual Blades, Hammer, Hunting Horn
  - Lance, Gunlance, Insect Glaive, Charge Blade, Switch Axe
  - Bow, Light Bowgun, Heavy Bowgun
- Weapons grouped by series/crafting tree
- Weapon details:
  - Raw/display damage
  - Sharpness bar visualization
  - Element/status with hidden values
  - Affinity
  - Decoration slots
  - Special weapon mechanics (ammo types, bow coatings, hunting horn notes, etc.)
  - Crafting/upgrade materials and costs

### 4.3 Loadout Builder
- Build complete loadout: weapon + 5 armor pieces + charm
- Decoration slot management per armor piece
- Real-time skill aggregation from all equipped items
- Set bonus tracking (2-piece bonuses, group bonuses)
- Drag-and-drop decoration selection from modal
- Persisted to localStorage
- Visual display of total skills and bonuses

### 4.4 Skills Browser
- Browse all armor skills
- Filter by multiple skills
- Shows skill descriptions and ranks

### 4.5 Decorations Browser
- Browse all decorations (jewels)
- Filter by decoration kind and slot size
- Shows decoration skills and crafting materials

### 4.6 Charms Browser
- Browse all charm ranks
- Filter and search
- Shows charm skills and crafting materials

---

## 5. Important Configuration Files

### 5.1 `next.config.ts`
```typescript
- Image optimization: Remote patterns for docs.wilds.mhdb.io
- Minimum cache TTL: 31 days for remote images
- SVG handling: SVGR webpack plugin for SVG-as-React-component imports
- Package import optimization for @mantine/core and @mantine/hooks
```

### 5.2 `tsconfig.json`
```
- Target: ESNext
- Module: esnext
- Strict mode enabled
- Path alias: @/* -> ./src/*
```

### 5.3 `tailwind.config.js`
```
- Basic configuration pointing to src/**/*.tsx
- No custom theme extensions (Mantine is primary UI library)
```

### 5.4 `postcss.config.mjs`
```
- Tailwind CSS v4 (@tailwindcss/postcss)
- Mantine PostCSS preset (postcss-preset-mantine)
- PostCSS simple vars for Mantine breakpoints
- Breakpoints: xs (36em), sm (48em), md (62em), lg (75em), xl (88em)
```

### 5.5 `svgr.config.mjs`
```
- Preserves viewBox on SVG imports
- Used for weapon-specific icons in BasicWeaponInfo
```

### 5.6 `.gitignore`
```
Standard Next.js ignores: node_modules, .next, .env*, .vercel
IDE: .idea/
```

---

## 6. Data Models and Types

### 6.1 Core Equipment Types

**Armor**
```typescript
interface Armor {
  id: number;
  name: string;
  kind: "head" | "chest" | "arms" | "waist" | "legs";
  rank: "low" | "high";
  rarity: 1-9;
  defense: { base: number; max: number };
  resistances: { fire, water, ice, thunder, dragon: number };
  slots: DecorationSlot[];  // 1-3
  skills: SkillRank[];
  armorSet: { id: number; name: string };
  crafting: { zennyCost, materials: CraftingCost[] };
}

interface ArmorSet {
  id: number;
  name: string;
  pieces: Armor[];
  bonus?: ArmorSetBonus;      // 2-piece bonus
  groupBonus?: ArmorSetBonus; // Group bonus (multiple sets)
}
```

**Weapons**
```typescript
type Weapon = Bow | ChargeBlade | DualBlades | GreatSword | Gunlance
            | Hammer | HeavyBowgun | HuntingHorn | InsectGlaive | Lance
            | LightBowgun | LongSword | SwitchAxe | SwordShield;

interface BaseWeapon {
  id: number;
  kind: WeaponKind;
  name: string;
  rarity: 1-9;
  damage: { raw: number; display: number };
  specials: WeaponElement[] | WeaponStatus[];  // Element or status effect
  sharpness: { red, orange, yellow, green, blue, white, purple: number };
  handicraft: number[];
  skills: SkillRank[];
  affinity: number;
  defenseBonus: number;
  elderseal: "none" | "low" | "high";
  slots: DecorationSlot[];
  crafting: {
    craftable: boolean;
    previous?: BaseWeapon;
    branches: BaseWeapon[];
    materials: CraftingCost[];
  };
  series: { id: number; name: string };
}

// Weapon-specific properties:
interface Bow extends BaseWeapon {
  coatings: BowCoating[];
}

interface HeavyBowgun extends BaseWeapon {
  ammo: { kind: AmmoKind; level: number; capacity: number }[];
}

interface HuntingHorn extends BaseWeapon {
  melody: { notes: HuntingHornNote[] };
  echoBubble: { name: string };
}

interface ChargeBlade extends BaseWeapon {
  phial: string;
}

interface InsectGlaive extends BaseWeapon {
  kinsectLevel: number;
}
```

**Skills**
```typescript
interface Skill {
  id: number;
  name: string;
  description?: string;
  kind: "armor" | "weapon" | "set" | "group";
  icon: { kind: SkillIconKind; id: string };
  ranks: SkillRank[];
}

interface SkillRank {
  id: number;
  level: number;
  description: string;
  skill: Omit<Partial<Skill>, "id"> & { id: number };
}

enum SkillIconKind {
  affinity, attack, defense, element, gathering, group, handicraft,
  health, item, offense, ranged, set, stamina, utility
}
```

**Decorations (Jewels)**
```typescript
interface Decoration {
  id: number;
  name: string;
  description: string;
  slot: 1 | 2 | 3;  // Slot size required
  rarity: 1-9;
  kind: "armor" | "weapon";
  skills: SkillRank[];
  icon: { color: Color; colorId: string };
}

enum DecorationKind {
  armor = "armor",
  weapon = "weapon"
}

enum DecorationSlot {
  1, 2, 3  // Slot sizes
}
```

**Charms**
```typescript
interface Charm {
  id: number;
  ranks: CharmRank[];
}

interface CharmRank {
  id: number;
  name: string;
  level: number;
  rarity: 1-9;
  skills: SkillRank[];
  crafting: {
    craftable: boolean;
    zennyCost: number;
    materials: CraftingCost[];
  };
}
```

**Loadout**
```typescript
type Loadout = Map<LoadoutSlotKind, LoadoutSlot>;

type LoadoutSlotKind = "weapon" | "head" | "chest" | "arms" | "waist" | "legs" | "charm";

type LoadoutSlot = {
  data?: Weapon | Armor | CharmRank;
  decorations?: Record<number, Decoration>;  // Index -> Decoration
};
```

### 6.2 Enums and Value Types

```typescript
enum Rank { low = "low", high = "high" }
enum ArmorKind { head, chest, arms, waist, legs }
enum WeaponKind { "great-sword", "long-sword", ... (14 total) }
enum Color { white, gray, rose, pink, red, ... (30+ colors) }
enum Element { fire, water, ice, thunder, dragon }
enum Status { poison, paralysis, sleep, blast, exhaust }
enum Elderseal { none, low, high }
enum AmmoKind { normal, pierce, spread, slicing, sticky, ... (20+ types) }
enum BowCoating { "close-range", power, pierce, paralysis, poison, sleep, blast, exhaust }
enum HuntingHornNote { purple, red, orange, yellow, green, blue, aqua, white }
```

---

## 7. Styling Approach

### 7.1 Mantine UI Components
**Primary UI library:** @mantine/core v8.0.0

**Core components used:**
- Layouts: AppShell, Container, Grid, Stack, Group, Card
- Navigation: NavLink, Burger
- Tables: Table (with TanStack React Table)
- Forms: Select, MultiSelect, Autocomplete
- Modals: Modal
- Display: Badge, Tooltip, Indicator, ThemeIcon, Text
- Navigation: Carousel (from @mantine/carousel with embla-carousel)

### 7.2 Tailwind CSS v4
- Used alongside Mantine
- Global utilities (spacing, colors, animations)
- Custom CSS variables in globals.css
- PostCSS integration with Tailwind v4

### 7.3 Global Styles (globals.css)
```css
- Mantine carousel styles import
- Tailwind base, components, utilities
- Custom CSS variables: --background, --foreground
- Font families: --font-geist-sans, --font-geist-mono
- Dark mode media queries
- Custom @keyframes spin animation for loading
```

### 7.4 Mantine Theme Configuration (theme.ts)
```typescript
- autoContrast: true (automatic color contrast adjustment)
- Component defaults:
  - Badge: variant="default", capitalized labels
  - Divider: margin "sm"
  - Indicator: transparent color
  - NavLink: variant="default"
  - ThemeIcon: variant="default"
  - Tooltip: multiline enabled
```

### 7.5 Color System (utils.ts)
Comprehensive color mappings:
- **rarityColor:** Array of 9 colors (gray → violet) for rarity 1-9
- **skillColor:** Mapping SkillIconKind → MantineColor
- **coatingColor:** Bow coating types → colors
- **ammoColor:** Ammo kinds → colors
- **color:** Decoration colors → Mantine colors

---

## 8. State Management

### 8.1 Context API (LoadoutContext)
**Location:** `src/app/loadout/context/LoadoutContext.tsx`

**Architecture:**
```typescript
type LoadoutContextType = {
  loadout: Loadout;  // Map<LoadoutSlotKind, LoadoutSlot>
  setLoadout: (options) => void;
  setDecoration: (options) => void;
};

const LoadoutProvider: React.FC<{ children }> = ({ children }) => {
  const [storage, setStorage] = useLocalStorage({ key: "loadout" });
  const loadout = useMap<LoadoutSlotKind, LoadoutSlot>(initialLoadout);
  
  // Auto-persist to localStorage on any loadout change
  const saveToStorage = () => setStorage(JSON.stringify(loadout.entries().toArray()));
  
  // Provide context to children
};
```

**Usage:**
```typescript
const { loadout, setLoadout, setDecoration } = useLoadout();
```

### 8.2 Local Storage Persistence
- Key: `"loadout"`
- Format: JSON serialized Map entries
- Persisted on every change (via `saveToStorage`)
- Loaded on component mount (via `useEffect` in LoadoutProvider)

### 8.3 Mantine Hooks
- `useLocalStorage`: Persist loadout to browser storage
- `useMap`: Efficient Map-based state for loadout slots
- `useDisclosure`: Modal open/close state
- `useDebouncedCallback`: Debounce filter changes (200ms)

### 8.4 Client-Side Filtering
Uses React state with debouncing:
```typescript
const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>();
const setColumnFilter = useDebouncedCallback(
  (key: string, value) => { /* update filter */ },
  200
);
```

---

## 9. Key Conventions

### 9.1 Naming Conventions

**Files:**
- Components: PascalCase (e.g., `ArmorTable.tsx`, `LoadoutCard.tsx`)
- Utilities: camelCase (e.g., `utils.ts`, `endpoint.ts`)
- Pages: lowercase or bracket syntax (e.g., `page.tsx`, `[id]`, `[kind]`)

**Types/Interfaces:**
- Interfaces: PascalCase (e.g., `Armor`, `WeaponDamage`, `SkillRank`)
- Enums: PascalCase with values lowercase (e.g., `Rank`, `ArmorKind`)
- Type unions: Compound PascalCase (e.g., `Weapon`, `WeaponSpecial`)

**Variables:**
- camelCase for functions, variables, constants
- SCREAMING_SNAKE_CASE rarely used
- Boolean prefixes: `is`, `has`, `can`, `should` (e.g., `isInLoadout`, `craftable`)

### 9.2 Component Organization

**Pattern - Page with Server/Client Split:**
```typescript
// page.tsx (Server)
export default async function Page() {
  const data = await fetchData();
  return <Client data={data} />;
}

// client.tsx (Client)
"use client";
export default function Client({ data }) { /* interactivity */ }
```

**Pattern - Detail Pages with Modal:**
```
[id]/
├── page.tsx           (Server: fetch & render detail)
├── [Detail].tsx       (Client: display logic)
└── layout.tsx         (Server: layout with @modal slot)

@modal/(.)id/
├── page.tsx           (Server: no content)
└── [Detail]Modal.tsx  (Client: modal wrapper)
```

### 9.3 Data Fetching Pattern

All data fetching in `api/mhdb/**/index.ts`:
```typescript
export async function getItem({ id }) {
  const response = await fetch(`${baseUrl}/item/${id}`, {
    cache: "force-cache",  // ISR (static except on rebuild)
  });
  return response.json();
}

export async function getAllItems() {
  const response = await fetch(`${baseUrl}/items`, {
    cache: "force-cache",
  });
  return response.json();
}
```

**Caching Strategy:**
- `cache: "force-cache"` for all external API calls
- Content from Monster Hunter DB (https://wilds.mhdb.io)
- No runtime fetching (all at build/server time)

### 9.4 Component Composition

**Shared Components (src/components/):**
- Small, reusable, often "use client"
- Take data and simple callbacks
- Examples: SkillBadge, DecorationButton, ArmorBonusGroup

**Page/Feature Components:**
- Larger, feature-specific components
- Can be server or client
- Examples: ArmorTable, LoadoutCard, BasicWeaponInfo

**Layout Components:**
- RootShell (main navigation and layout)
- Page-specific layouts with modal slots

### 9.5 Mantine Integration Patterns

**Using Mantine components:**
```typescript
import { Stack, Group, Card, Badge, Tooltip } from "@mantine/core";

<Stack gap="xs">
  <Group>
    <Badge leftSection={<Icon />}>{value}</Badge>
  </Group>
</Stack>
```

**Styling with classNames:**
```typescript
<Select classNames={{ input: "capitalize", option: "capitalize" }} />
```

**Using hooks:**
```typescript
const [opened, { open, close, toggle }] = useDisclosure();
const [map, mapHandlers] = useMap();
```

### 9.6 URL/Navigation Patterns

**Dynamic routes:**
- `/armor/[id]` → Individual armor details
- `/weapon/[kind]/[id]` → Individual weapon details
- `@modal/(.)id` → Intercepting routes for modals

**Modal navigation:**
```typescript
const router = useRouter();
const closeModal = () => router.push("/parent-page");  // Soft navigation
```

**URL-based state:**
```typescript
// Modal open based on URL
<Modal opened={pathname !== "/armor"} onClose={closeModal} />
```

### 9.7 Error Handling

**Pattern - Data loading errors:**
- Server components handle fetch errors (Next.js error boundaries)
- Client components have optional chaining for data safety
- Example: `loadout.get(armorKind)?.data?.id`

**Fallbacks:**
- `loading.tsx` for suspense boundaries
- `not-found.tsx` for 404 handling
- Modal uses URL state for graceful degradation

### 9.8 Code Organization Best Practices

**Single Responsibility:**
- Each component focuses on one feature
- Utilities separated from components
- Data fetching in dedicated `index.ts` files

**Prop Drilling Minimization:**
- LoadoutContext used for shared state
- Large data objects passed from server components
- Mantine hooks for local UI state

**Import Organization:**
```typescript
// 1. Third-party imports
import { Component } from "@mantine/core";

// 2. Internal absolute imports (@/)
import { Type } from "@/app/api/...";
import Component from "@/components/...";

// 3. Relative imports (minimal)
import { localUtility } from "./utils";
```

### 9.9 Asset Management

**Icons:**
- Organized by category in `/public/icon/`
- Referenced by path in Image components
- SVG imports via SVGR for inline components

**Image Components:**
```typescript
import Image from "next/image";

<Image
  src="/icon/armor/head.png"
  alt="armor_head"
  width={24}
  height={24}
/>
```

### 9.10 Type Safety

**Strict TypeScript:**
- All functions have return types
- Interfaces for all data structures
- Union types for polymorphic data (e.g., Weapon types)
- No `any` type unless necessary

**Generic Components:**
```typescript
interface Props<T> {
  data: T[];
  onSelect: (item: T) => void;
}
```

---

## 10. API/Data Source

**External Data Source:** Monster Hunter Database API  
**Base URL:** `https://wilds.mhdb.io/en`  
**Endpoints Used:**
- `/armor` - All armor pieces
- `/armor/{id}` - Individual armor
- `/armor/sets` - Armor sets with bonuses
- `/weapons` - All weapons
- `/weapons/{id}` - Individual weapon
- `/charms` - All charms
- `/decorations` - All decorations (jewels)
- `/skills` - All skills
- `/items` - Crafting materials
- `/ailments` - Status ailments

**Caching:** All requests use `cache: "force-cache"` (static at build time)

---

## 11. Notable Implementation Details

### 11.1 Armor Set Bonus Tracking
The loadout calculates armor set bonuses by checking which armor set pieces are equipped:
```typescript
// In loadout/client.tsx
const setBonusSkills = armorSetBonusMap.bonus
  .filter(set => pieces in loadout)
  .map(bonus => aggregateSkillRanks(bonus));
```

### 11.2 Weapon Series Tree
Weapons display crafting trees via `crafting.previous` and `crafting.branches`:
```typescript
interface WeaponCrafting {
  previous?: BaseWeapon;  // Upgrade from
  branches: BaseWeapon[];  // Upgrade to
}
```

### 11.3 Decoration Slot Management
Each armor piece has slots (1-3), decorations must match slot size:
```typescript
// In loadout/client.tsx
const slot = armor?.slots?.[decorationIndex];
// Filter decorations by this slot size
```

### 11.4 Soft Modal Navigation
Uses `window.history.pushState` for modal navigation without full page reload:
```typescript
onSlideChange={(i) => {
  if (pathname !== `/armor/${id}`) {
    window.history.pushState(null, "", `/armor/${id}`);
  }
}}
```

### 11.5 Artian Weapons
Special handling for Artian weapons (post-game weapons):
- `artian.ts` contains Artian weapon IDs
- Overrides fake crafting/series data for Artian weapons
- Applied in weapon page before rendering

---

## 12. Testing & Development

**Commands:**
```bash
pnpm dev      # Start dev server
pnpm build    # Build for production
pnpm start    # Run production server
pnpm lint     # Run Next.js linter
```

**Development Server:** http://localhost:3000

---

## 13. Future Extensibility

**Designed for:**
- Additional weapon types (if game adds more)
- New equipment categories (hunting tools, etc.)
- Set finder algorithm
- Loadout sharing/export
- Build guides/templates
- Multiplayer loadout coordination

**Integration Points:**
- Monster Hunter DB API updates
- Additional filtering criteria
- Craft/upgrade cost calculator
- Damage formula calculator

---

## 14. Performance Optimizations

1. **Image Optimization:**
   - Next.js Image component with remote URL support
   - 31-day cache TTL for remote images
   - Lazy loading by default

2. **Package Optimization:**
   - Mantine core/hooks optimized with `optimizePackageImports`

3. **Debounced Filtering:**
   - 200ms debounce on filter changes (prevents re-renders)

4. **Static Generation:**
   - All external API calls use `cache: "force-cache"`
   - Built at compile time, no runtime API calls to Monster Hunter DB

5. **Code Splitting:**
   - Lazy modal components via parallel routes
   - Tree-shakeable Mantine imports

