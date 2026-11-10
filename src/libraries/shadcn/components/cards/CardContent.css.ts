import { globalStyle, style } from "@vanilla-extract/css";
import { breakpoints } from "@/design-system/styles/breakpoints.build";

export const cardContentRoot = style({
  "@layer": {
    components: {
      paddingInline: "var(--card-spacing)",
    },
  },
});

globalStyle(`.metric-card > ${cardContentRoot}`, {
  padding: "var(--space-4)",
});

globalStyle(`.chart-panel ${cardContentRoot}`, {
  padding: "0 var(--space-4) var(--space-4)",
});

globalStyle(`.allocation-panel ${cardContentRoot}`, {
  padding: "0 var(--space-4) var(--space-4)",
});

globalStyle(`.distribution-panel ${cardContentRoot}`, {
  padding: "0 var(--space-4) var(--space-4)",
});

globalStyle(`.table-section .panel-card > ${cardContentRoot}`, {
  paddingBlock: "var(--space-4)",
});

globalStyle(`.allocation-panel ${cardContentRoot}`, {
  display: "block",
  gridTemplateColumns: "minmax(0, var(--size-18)) minmax(0, 1fr)",
  alignItems: "center",
  gap: "var(--space-4)",
});

globalStyle(`.allocation-panel ${cardContentRoot}`, {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      display: "grid",
    },
  },
});

globalStyle(`.allocation-panel ${cardContentRoot}`, {
  "@media": {
    ["(width >= " + breakpoints.wide + ")"]: {
      display: "block",
      gridTemplateColumns: "none",
      alignItems: "stretch",
      gap: "0",
    },
  },
});
