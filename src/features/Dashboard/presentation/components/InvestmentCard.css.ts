import { globalStyle } from "@vanilla-extract/css";
import { breakpoints } from "@/design-system/styles/breakpoints.build";

globalStyle(".investment-card-header", {
  display: "flex",
  flexDirection: "row",
  alignItems: "start",
  justifyContent: "space-between",
  gap: "var(--space-3)",
  padding: "var(--space-4) var(--space-4) 0",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".investment-identity", {
  display: "flex",
  alignItems: "center",
  gap: "var(--space-2)",
  minWidth: "0",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".investment-identity > div", {
  minWidth: "0",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".investment-header-actions", {
  display: "flex",
  alignItems: "center",
  gap: "var(--space-2)",
  flex: "none",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".investment-icon", {
  display: "grid",
  placeItems: "center",
  flex: "none",
  width: "var(--space-575)",
  height: "var(--space-575)",
  borderRadius: "var(--space-2)",
  background: "color-mix(in srgb, var(--investment-accent) var(--mix-20), var(--card))",
  color: "var(--investment-accent)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".investment-icon svg", {
  width: "var(--investment-symbol-size)",
  height: "var(--investment-symbol-size)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".investment-card-content", {
  padding: "var(--space-4) var(--space-4) var(--space-1)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".investment-metrics", {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.2fr)",
  alignItems: "center",
  gap: "var(--space-4)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".investment-primary-metric", {
  minWidth: "0",
  textAlign: "left",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".investment-secondary-metrics", {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".investment-secondary-metric", {
  minWidth: "0",
  textAlign: "center",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".investment-value-label", {
  color: "var(--text-soft)",
  fontSize: "var(--text-meta)",
  fontWeight: "var(--font-weight-semibold)",
  textTransform: "none",
  letterSpacing: "normal",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".investment-value", {
  marginTop: "var(--space-05)",
  fontSize: "var(--text-subsection)",
  fontWeight: "var(--font-weight-semibold)",
  lineHeight: "var(--leading-tight)",
  letterSpacing: "var(--tracking-tight)",
  overflowWrap: "anywhere",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".investment-value-row", {
  display: "flex",
  alignItems: "center",
  minWidth: "0",
  gap: "var(--space-075)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".investment-secondary-metric .investment-value-row", {
  justifyContent: "center",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".investment-value-row .investment-value", {
  minWidth: "0",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".investment-secondary-metric .investment-value-label", {
  marginBottom: "var(--space-05)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".investment-secondary-heading", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "var(--space-05)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".investment-growth-value", {
  display: "flex",
  alignItems: "center",
  minWidth: "0",
  gap: "var(--space-05)",
  color: "var(--text-strong)",
  fontSize: "var(--text-body)",
  fontWeight: "var(--font-weight-semibold)",
  lineHeight: "var(--leading-tight)",
  overflowWrap: "anywhere",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".investment-growth-value .abbreviated-value", {
  color: "inherit",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".investment-growth-row .investment-growth-formula-trigger", {
  flex: "none",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".growth-arrow", {
  display: "flex",
  color: "var(--primary)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".slider-block", {
  padding: "var(--space-4) 0",
  borderTop: "var(--line-thin) solid var(--border-subtle)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".slider-block > .slider-heading", {
  marginBottom: "0",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".slider-block > .range-labels", {
  marginTop: "0",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".rate-edit-row", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: "var(--space-3)",
  padding: "var(--space-4) 0",
  borderTop: "var(--line-thin) solid var(--border-subtle)",
  color: "var(--text-soft)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".rate-input-controls", {
  display: "flex",
  alignItems: "center",
  gap: "var(--space-2)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".holding-list", {
  borderTop: "var(--line-thin) solid var(--border-subtle)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".holding-table-header,\n.holding-row", {
  display: "grid",
  gridTemplateColumns:
    "minmax(0, 1.15fr) minmax(0, 0.85fr) minmax(var(--size-7-5), 0.95fr)\n    minmax(0, 0.9fr) minmax(0, 1fr)",
  alignItems: "center",
  gap: "var(--space-2)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".holding-table-header", {
  padding: "var(--space-2) 0",
  color: "var(--text-soft)",
  fontSize: "var(--text-meta)",
  fontWeight: "var(--font-weight-medium)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".holding-table-header > span,\n.holding-cell", {
  minWidth: "0",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".investment-card-header", {
  flexWrap: "wrap",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".investment-metrics", {
  gridTemplateColumns: "minmax(0, 1fr)",
  gap: "var(--space-3)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".investment-primary-metric", {
  textAlign: "center",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".investment-primary-metric .investment-value-row", {
  justifyContent: "center",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".investment-growth-values", {
  gap: "var(--space-3)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".holding-table-header", {
  position: "absolute",
  width: "var(--line-thin)",
  height: "var(--line-thin)",
  overflow: "hidden",
  whiteSpace: "nowrap",
  clipPath: "inset(50%)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".investment-card-header", {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      flexWrap: "nowrap",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".investment-metrics", {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.2fr)",
      gap: "var(--space-4)",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".investment-primary-metric", {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      textAlign: "left",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".investment-primary-metric .investment-value-row", {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      justifyContent: "flex-start",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".investment-growth-values", {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      gap: "var(--space-4)",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".holding-table-header", {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      position: "static",
      width: "auto",
      height: "auto",
      overflow: "visible",
      whiteSpace: "normal",
      clipPath: "none",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
