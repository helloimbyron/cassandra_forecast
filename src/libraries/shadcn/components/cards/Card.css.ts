import { globalStyle, style } from "@vanilla-extract/css";

export const cardRoot = style({
  "@layer": {
    components: {
      vars: { "--card-spacing": "var(--space-4)" },
      display: "flex",
      flexDirection: "column",
      gap: "var(--card-spacing)",
      overflow: "hidden",
      paddingBlock: "0",
      border: "var(--line-thin) solid var(--border-subtle)",
      borderRadius: "var(--radius-card)",
      background: "var(--card)",
      color: "var(--card-foreground)",
      fontSize: "var(--text-body)",
    },
  },
});

globalStyle(`${cardRoot}[data-size="sm"]`, {
  "@layer": {
    components: {
      vars: { "--card-spacing": "var(--space-3)" },
    },
  },
});
