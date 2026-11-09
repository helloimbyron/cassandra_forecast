import { globalStyle } from "@vanilla-extract/css";
import { breakpoints } from "@/design-system/styles/breakpoints.build";

globalStyle(
  ".chart-wrap .recharts-surface:focus,\n.chart-wrap .recharts-surface :focus,\n.donut-wrap .recharts-surface:focus,\n.donut-wrap .recharts-surface :focus",
  {
    outline: "none",
  } as unknown as Parameters<typeof globalStyle>[1],
);
globalStyle(".allocation-panel .panel-header", {
  paddingBottom: "0",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".donut-wrap", {
  position: "relative",
  height: "var(--size-15)",
  marginBottom: "var(--space-4)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".donut-center", {
  position: "absolute",
  inset: "0",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  pointerEvents: "none",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".allocation-panel .recharts-tooltip-wrapper", {
  zIndex: "var(--layer-raised)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".donut-center strong", {
  fontSize: "var(--text-xl)",
  fontWeight: "var(--font-weight-semibold)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".donut-center span", {
  color: "var(--text-soft)",
  fontSize: "var(--text-meta)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".allocation-list", {
  display: "flex",
  flexDirection: "column",
  gap: "var(--space-2)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".allocation-row", {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) minmax(var(--space-7), auto) minmax(var(--size-6), auto)",
  alignItems: "center",
  gap: "var(--space-2)",
  minWidth: "0",
  paddingTop: "var(--space-2)",
  borderTop: "var(--line-thin) solid var(--border-subtle)",
  color: "var(--text-soft)",
  fontSize: "var(--text-meta)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".allocation-name", {
  display: "inline-flex",
  alignItems: "center",
  gap: "var(--space-1)",
  minWidth: "0",
  color: "var(--foreground)",
  overflowWrap: "anywhere",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".allocation-row > span:not(.allocation-name)", {
  textAlign: "right",
  whiteSpace: "nowrap",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".allocation-row strong", {
  color: "var(--text-strong)",
  fontWeight: "var(--font-weight-semibold)",
  whiteSpace: "nowrap",
  textAlign: "right",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".donut-wrap", {
  height: "var(--size-13)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".donut-wrap", {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      height: "var(--size-15)",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
