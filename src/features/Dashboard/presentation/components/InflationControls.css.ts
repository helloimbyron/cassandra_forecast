import { globalStyle } from "@vanilla-extract/css";
import { breakpoints } from "@/design-system/styles/breakpoints.build";

globalStyle(".inflation-controls-heading", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "var(--space-2)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".inflation-slider-control", {
  display: "grid",
  gap: "var(--space-075)",
  minWidth: "0",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".inflation-slider-wrap", {
  position: "relative",
  minWidth: "0",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".inflation-controls-card .inflation-slider-wrap", {
  paddingBottom: "var(--space-5)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".inflation-slider-tooltip", {
  top: "var(--space-55)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".inflation-controls-inline .inflation-controls-heading", {
  justifyContent: "flex-start",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".inflation-controls-inline .inflation-slider-control", {
  gap: "var(--space-05)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".inflation-slider-heading", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "var(--space-2)",
  color: "var(--text-muted)",
  fontSize: "var(--text-meta)",
  lineHeight: "var(--leading-tight)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".inflation-slider-heading strong", {
  color: "var(--text-strong)",
  whiteSpace: "nowrap",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".inflation-controls-inline .inflation-slider-heading strong", {
  gridColumn: "1",
  gridRow: "1",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".inflation-controls-inline .inflation-slider-wrap", {
  gridColumn: "2",
  gridRow: "1",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".inflation-controls-inline .inflation-slider-heading strong", {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      gridColumn: "auto",
      gridRow: "auto",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".inflation-controls-inline .inflation-slider-wrap", {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      gridColumn: "auto",
      gridRow: "auto",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
