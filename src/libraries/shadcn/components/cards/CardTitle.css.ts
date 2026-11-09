import { globalStyle } from "@vanilla-extract/css";

globalStyle('[data-slot="card-title"]', {
  "@layer": {
    components: {
      fontSize: "var(--text-card-title)",
      fontWeight: "var(--font-weight-semibold)",
      lineHeight: "var(--leading-tight)",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
