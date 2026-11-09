import { globalStyle } from "@vanilla-extract/css";

globalStyle('[data-slot="card-description"]', {
  "@layer": {
    components: {
      color: "var(--muted-foreground)",
      fontSize: "var(--text-meta)",
      lineHeight: "var(--leading-body)",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
