import { style } from "@vanilla-extract/css";

export const cardFooterRoot = style({
  "@layer": {
    components: {
      display: "flex",
      alignItems: "center",
      padding: "var(--card-spacing)",
      borderTop: "var(--line-thin) solid var(--border-subtle)",
      background: "var(--muted)",
    },
  },
});
