import { style } from "@vanilla-extract/css";

export const labelRoot = style({
  "@layer": {
    components: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-1)",
      color: "var(--foreground)",
      fontSize: "var(--text-body)",
      fontWeight: "var(--font-weight-medium)",
      lineHeight: "var(--leading-body)",
    },
  },
});
