import { globalStyle } from "@vanilla-extract/css";
import { breakpoints } from "@/design-system/styles/breakpoints.build";

globalStyle(".investments-section", {
  padding: "var(--space-7) 0 var(--space-5)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".investment-grid,\n.investment-growth-values", {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: "var(--space-4)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".investment-grid", {
  gridTemplateColumns: "1fr",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".investment-grid", {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
