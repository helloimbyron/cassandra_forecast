import { globalStyle } from "@vanilla-extract/css";
import { breakpoints } from "@/design-system/styles/breakpoints.build";

globalStyle(".overview-grid", {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1.55fr) minmax(0, 1fr)",
  gap: "var(--space-4)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".overview-grid", {
  gridTemplateColumns: "1fr",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".overview-grid", {
  "@media": {
    ["(width >= " + breakpoints.wide + ")"]: {
      gridTemplateColumns: "minmax(0, 1.55fr) minmax(0, 1fr)",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
