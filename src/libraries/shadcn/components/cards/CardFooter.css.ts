import { globalStyle } from "@vanilla-extract/css";

globalStyle('[data-slot="card-footer"]', {
  "@layer": {
    components: {
      display: "flex",
      alignItems: "center",
      padding: "var(--card-spacing)",
      borderTop: "var(--line-thin) solid var(--border-subtle)",
      background: "var(--muted)",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
