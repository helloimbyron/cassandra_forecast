import { style } from "@vanilla-extract/css";

export const cardHeaderRoot = style({
  "@layer": {
    components: {
      display: "grid",
      alignItems: "start",
      gap: "var(--space-1)",
      paddingInline: "var(--card-spacing)",
    },
  },
});
