import { globalStyle } from "@vanilla-extract/css";

globalStyle('[data-slot="card-header"],\n  [data-slot="card-content"]', {
  "@layer": {
    components: {
      paddingInline: "var(--card-spacing)",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle('[data-slot="card-header"]', {
  "@layer": {
    components: {
      display: "grid",
      alignItems: "start",
      gap: "var(--space-1)",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
