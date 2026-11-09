import { globalStyle } from "@vanilla-extract/css";

globalStyle(".investment-chart", {
  height: "var(--size-15)",
  margin: "var(--space-3) 0 0",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".investment-chart-legend", {
  paddingBottom: "var(--space-3)",
} as unknown as Parameters<typeof globalStyle>[1]);
