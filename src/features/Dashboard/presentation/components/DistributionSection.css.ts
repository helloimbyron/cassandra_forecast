import { globalStyle } from "@vanilla-extract/css";
import { breakpoints } from "@/design-system/styles/breakpoints.build";

globalStyle(".distribution-section", {
  margin: "var(--space-6) 0 0",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".distribution-heading", {
  alignItems: "end",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".distribution-heading h2", {
  margin: "var(--space-1) 0 0",
  fontSize: "var(--text-section)",
  fontWeight: "var(--font-weight-semibold)",
  letterSpacing: "var(--tracking-tight)",
  lineHeight: "var(--leading-tight)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".distribution-heading h2.eyebrow", {
  margin: "0",
  fontSize: "var(--text-meta)",
  fontWeight: "inherit",
  letterSpacing: "normal",
  lineHeight: "normal",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".distribution-title-row", {
  display: "flex",
  alignItems: "center",
  gap: "var(--space-075)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".formula-tooltip-trigger.distribution-heading-info-trigger", {
  width: "var(--space-35)",
  height: "var(--space-35)",
  margin: "0",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".distribution-panel", {
  overflow: "hidden",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".distribution-panel.distribution-panel .panel-header", {
  alignItems: "center",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".distribution-controls", {
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: "var(--space-4)",
  marginTop: "var(--space-4)",
  paddingTop: "var(--space-4)",
  borderTop: "var(--line-thin) solid var(--border-subtle)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".distribution-control", {
  display: "grid",
  alignContent: "start",
  gap: "var(--space-2)",
  minWidth: "0",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".distribution-control-heading", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "var(--space-2)",
  minHeight: "var(--control-height)",
  color: "var(--text-soft)",
  fontSize: "var(--text-meta)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".distribution-control-heading label", {
  minWidth: "0",
  fontSize: "var(--text-meta)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".distribution-label-group", {
  display: "flex",
  alignItems: "center",
  gap: "var(--space-075)",
  minWidth: "0",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".distribution-control-heading > strong", {
  color: "var(--text-strong)",
  fontWeight: "var(--font-weight-semibold)",
  whiteSpace: "nowrap",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".distribution-withdrawal-heading", {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) auto",
  gridTemplateRows: "auto auto",
  justifyContent: "initial",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".distribution-withdrawal-heading .distribution-label-group", {
  gridColumn: "1 / -1",
  gridRow: "1",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".distribution-withdrawal-heading .distribution-mode-toggle", {
  gridColumn: "1",
  gridRow: "2",
  justifySelf: "start",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".distribution-withdrawal-heading .numeric-unit-input", {
  gridColumn: "2",
  gridRow: "2",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".distribution-note", {
  margin: "var(--space-3) 0 0",
  color: "var(--primary)",
  fontSize: "var(--text-meta)",
  lineHeight: "var(--leading-snug)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".distribution-insights", {
  display: "grid",
  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  gap: "var(--space-3)",
  margin: "var(--space-4) 0 0",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".distribution-insights .metric-card", {
  minWidth: "0",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".distribution-insights .metric-card strong", {
  fontSize: "var(--text-metric)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".distribution-insights .metric-value-row", {
  alignItems: "center",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".distribution-insights", {
  gridTemplateColumns: "1fr",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".distribution-controls", {
  gridTemplateColumns: "1fr",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(":where(.distribution-panel) .panel-header", {
  alignItems: "start",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".distribution-control .numeric-unit-input", {
  width: "var(--size-6-25)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".distribution-insights", {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".distribution-controls", {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".distribution-insights", {
  "@media": {
    ["(width >= " + breakpoints.wide + ")"]: {
      gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".distribution-controls", {
  "@media": {
    ["(width >= " + breakpoints.wide + ")"]: {
      gridTemplateColumns: "minmax(0, 0.9fr) minmax(0, 1.35fr) minmax(0, 0.9fr)",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".distribution-withdrawal-heading", {
  "@media": {
    ["(width >= " + breakpoints.wide + ")"]: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-1)",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".distribution-withdrawal-heading .distribution-label-group", {
  "@media": {
    ["(width >= " + breakpoints.wide + ")"]: {
      flex: "1",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
