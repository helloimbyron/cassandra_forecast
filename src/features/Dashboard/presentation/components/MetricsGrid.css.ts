import { globalStyle } from "@vanilla-extract/css";
import { breakpoints } from "@/design-system/styles/breakpoints.build";

globalStyle(".metrics-grid", {
  display: "grid",
  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  gap: "var(--space-3)",
  margin: "var(--space-4) 0 var(--space-5)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".metrics-grid > .metric-card:nth-child(1)", {
  order: "2",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".metrics-grid > .metric-card:nth-child(2)", {
  order: "3",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".metrics-grid > .metric-card:nth-child(3)", {
  order: "1",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".metrics-grid > .metric-card:nth-child(4)", {
  order: "4",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".metrics-grid", {
  gridTemplateColumns: "1fr",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".metrics-grid", {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".metrics-grid", {
  "@media": {
    ["(width >= " + breakpoints.wide + ")"]: {
      gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
