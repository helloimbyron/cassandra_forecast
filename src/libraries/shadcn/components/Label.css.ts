import { globalStyle } from "@vanilla-extract/css";

globalStyle('[data-slot="label"]', {
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
} as unknown as Parameters<typeof globalStyle>[1]);
