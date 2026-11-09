import { globalStyle } from "@vanilla-extract/css";

globalStyle('[data-slot="card"]', {
  "@layer": {
    components: {
      "--card-spacing": "var(--space-4)",
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
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle('[data-slot="card"][data-size="sm"]', {
  "@layer": {
    components: {
      "--card-spacing": "var(--space-3)",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
