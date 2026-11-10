import { globalStyle, style } from "@vanilla-extract/css";
import { breakpoints } from "@/design-system/styles/breakpoints.build";

export const dashboardHeading = style({
  position: "relative",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "end",
  flexWrap: "wrap",
  gap: "var(--space-3)",
  padding: "var(--space-6) 0 var(--space-4)",
});

export const dashboardError = style({
  flexBasis: "100%",
});

globalStyle(dashboardHeading, {
  paddingTop: "var(--space-5)",
  alignItems: "start",
});

globalStyle(dashboardHeading, {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      alignItems: "end",
    },
  },
});

globalStyle(dashboardHeading, {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      paddingTop: "var(--space-6)",
    },
  },
});
