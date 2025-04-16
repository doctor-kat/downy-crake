import {
  Badge,
  createTheme,
  Divider,
  Indicator,
  NavLink,
  ThemeIcon,
  Tooltip,
} from "@mantine/core";

export const theme = createTheme({
  autoContrast: true,
  components: {
    Badge: Badge.extend({
      defaultProps: {
        variant: "default",
        classNames: { label: "capitalize" },
      },
    }),
    Divider: Divider.extend({
      defaultProps: {
        m: "sm",
      },
    }),
    Indicator: Indicator.extend({
      defaultProps: {
        color: "transparent",
      },
    }),
    NavLink: NavLink.extend({
      defaultProps: {
        variant: "default",
      },
    }),
    ThemeIcon: ThemeIcon.extend({
      defaultProps: {
        variant: "default",
      },
    }),
    Tooltip: Tooltip.extend({
      defaultProps: {
        multiline: true,
      },
    }),
  },
});
