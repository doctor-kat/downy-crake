/**
 * Component Variant Usage Guide
 *
 * This file documents the standard usage patterns for Mantine component variants
 * throughout the Monster Hunter Wilds Set Builder application.
 */

/**
 * BUTTON VARIANTS
 * ---------------
 *
 * variant="default"
 * - Primary action buttons that perform main operations
 * - Examples: "Add To Loadout", "View Loadout"
 * - Visual: Subtle background with border, stands out from content
 * - When to use: Main CTAs, form submissions, navigation to key features
 *
 * variant="transparent"
 * - Secondary/utility buttons that should blend with content
 * - Examples: Decoration slot buttons, inline controls
 * - Visual: No background until hover, minimal visual weight
 * - When to use: Icon buttons, inline actions, decorative elements
 *
 * variant="filled"
 * - High-emphasis actions (use sparingly)
 * - Visual: Solid background color, maximum contrast
 * - When to use: Critical actions, primary submit buttons
 * - Note: Not currently used in the app (prefer "default")
 *
 * variant="light"
 * - Medium-emphasis actions
 * - Visual: Light tinted background
 * - When to use: Secondary actions in button groups
 * - Note: Not currently used in the app
 *
 * variant="outline"
 * - Tertiary actions with clear boundaries
 * - Visual: Border only, no background
 * - When to use: Alternative actions, cancel buttons
 * - Note: Used in ActionIcon, see below
 */

/**
 * ACTIONICON VARIANTS
 * ------------------
 *
 * variant="outline" with className="bg-transparent"
 * - Standard pattern for equipment/weapon grid icons
 * - Examples: Armor piece icons in ArmorGroup, weapon icons in WeaponGroup
 * - Visual: Icon with border, transparent background
 * - When to use: Clickable icons in grids/tables representing game items
 * - Pattern: Combined with color prop for rarity indication
 *
 * variant="transparent"
 * - Pure icon buttons without visual container
 * - Visual: Icon only, background on hover
 * - When to use: Toolbar icons, minimal UI controls
 * - Note: Not currently used (prefer "outline" for consistency)
 *
 * variant="default"
 * - Icon button with subtle background
 * - Visual: Light background with hover state
 * - When to use: Icon buttons that need slight emphasis
 * - Note: Not currently used (prefer "outline" for consistency)
 */

/**
 * BADGE VARIANTS
 * -------------
 *
 * variant="default" (theme default)
 * - Standard badges for displaying information
 * - Examples: Skill badges, elemental resistance badges
 * - Visual: Subtle background matching theme
 * - When to use: Default for all informational badges
 *
 * variant="filled"
 * - Emphasized badges for active/selected states
 * - Examples: Active armor set bonus indicators
 * - Visual: Solid background color
 * - When to use: Active states, completion indicators
 * - Pattern: Often combined with color prop (e.g., color="yellow")
 */

/**
 * COMMON PATTERNS
 * --------------
 *
 * 1. Equipment/Item Selection:
 *    - ActionIcon with variant="outline" + className="bg-transparent"
 *    - Color based on rarity: color={`${rarityColor[item.rarity]}.9`}
 *    - Shows border when available, disabled state when not
 *
 * 2. Primary Actions:
 *    - Button with variant="default"
 *    - leftSection with icon (24x24)
 *    - rightSection for status indicators (✓, counts)
 *
 * 3. Inline Utility Buttons:
 *    - Button with variant="transparent"
 *    - leftSection with icon
 *    - Minimal visual weight, blends with content
 *
 * 4. Status Indicators:
 *    - Badge with variant="default" (info)
 *    - Badge with variant="filled" + color="yellow" (active)
 *    - Badge circle for numbers/counts
 *
 * IMPLEMENTATION EXAMPLES
 * ----------------------
 *
 * // Equipment grid icon
 * <ActionIcon
 *   component={Link}
 *   href={`/armor/${armor.id}`}
 *   size={36}
 *   variant="outline"
 *   className="bg-transparent"
 *   color={`${rarityColor[armor.rarity]}.9`}
 * >
 *   <Image src="/icon/armor/head.png" width={ICON_SIZE.MD} height={ICON_SIZE.MD} />
 * </ActionIcon>
 *
 * // Primary action button
 * <Button
 *   variant="default"
 *   onClick={handleAddToLoadout}
 *   leftSection={<Image src="/icon/armor/head.png" width={ICON_SIZE.MD} height={ICON_SIZE.MD} />}
 * >
 *   Add To Loadout
 * </Button>
 *
 * // Utility/decoration button
 * <Button
 *   variant="transparent"
 *   onClick={handleDecorationClick}
 *   leftSection={<DecorationImage decoration={decoration} />}
 * >
 *   {decoration.name}
 * </Button>
 */

export const COMPONENT_VARIANTS = {
  BUTTON: {
    DEFAULT: "default" as const,
    TRANSPARENT: "transparent" as const,
    FILLED: "filled" as const,
    LIGHT: "light" as const,
    OUTLINE: "outline" as const,
  },
  ACTION_ICON: {
    OUTLINE: "outline" as const,
    TRANSPARENT: "transparent" as const,
    DEFAULT: "default" as const,
  },
  BADGE: {
    DEFAULT: "default" as const,
    FILLED: "filled" as const,
  },
} as const;
