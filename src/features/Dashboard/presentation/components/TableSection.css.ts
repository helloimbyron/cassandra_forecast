import { globalStyle } from "@vanilla-extract/css";
import { breakpoints } from "@/design-system/styles/breakpoints.build";

globalStyle(".table-section", {
  paddingBottom: "var(--space-5)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".table-section .table-section-heading", {
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: "var(--space-3)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".table-controls", {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  width: "100%",
  flexWrap: "wrap",
  gap: "var(--space-2)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".table-column-picker", {
  position: "relative",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".table-column-picker > summary", {
  display: "inline-flex",
  alignItems: "center",
  gap: "var(--space-1)",
  minHeight: "var(--control-height)",
  padding: "var(--space-075) var(--space-2)",
  border: "var(--line-thin) solid var(--border-subtle)",
  borderRadius: "var(--space-2)",
  background: "var(--card)",
  color: "var(--text-soft)",
  fontSize: "var(--text-meta)",
  fontWeight: "var(--font-weight-medium)",
  cursor: "pointer",
  listStyle: "none",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".table-column-picker > summary::-webkit-details-marker", {
  display: "none",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".table-column-picker > summary:hover,\n.table-column-picker[open] > summary", {
  borderColor: "var(--input)",
  background: "var(--surface-soft)",
  color: "var(--text-strong)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".table-column-picker > summary:focus-visible", {
  outline: "var(--line-medium) solid var(--focus-ring)",
  outlineOffset: "var(--line-medium)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".table-column-picker > summary > span", {
  display: "flex",
  alignItems: "baseline",
  gap: "var(--space-075)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".table-column-picker > summary small", {
  color: "var(--text-soft)",
  fontSize: "var(--text-meta)",
  fontWeight: "var(--font-weight-regular)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".table-column-options", {
  position: "absolute",
  zIndex: "var(--layer-foreground)",
  top: "calc(100% + var(--space-075))",
  right: "auto",
  left: "0",
  display: "grid",
  gap: "var(--space-025)",
  width: "min(var(--size-19), calc(100vw - var(--space-5)))",
  maxHeight: "min(var(--size-18), var(--dialog-max-height))",
  overflowY: "auto",
  padding: "var(--space-075)",
  border: "var(--line-thin) solid var(--border-subtle)",
  borderRadius: "var(--space-2)",
  background: "var(--popover)",
  boxShadow: "var(--shadow-card)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".table-column-option", {
  display: "flex",
  alignItems: "center",
  gap: "var(--space-2)",
  minHeight: "var(--control-height)",
  padding: "var(--space-075) var(--space-1)",
  borderRadius: "var(--space-1)",
  color: "var(--text-strong)",
  fontSize: "var(--text-meta)",
  lineHeight: "var(--leading-snug)",
  cursor: "pointer",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".table-column-option:hover", {
  background: "var(--surface-soft)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".table-column-option:focus-within", {
  outline: "var(--line-medium) solid var(--focus-ring)",
  outlineOffset: "calc(-1 * var(--line-medium))",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".table-column-option input", {
  width: "var(--space-3)",
  height: "var(--space-3)",
  flex: "none",
  margin: "0",
  accentColor: "var(--primary)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".table-column-option span", {
  minWidth: "0",
  overflowWrap: "anywhere",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".table-scroll", {
  maxWidth: "100%",
  overflowX: "auto",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".table-section table", {
  borderCollapse: "separate",
  borderSpacing: "0",
  tableLayout: "fixed",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".table-section th,\n.table-section td", {
  textAlign: "left",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".table-section thead th", {
  paddingBlock: "var(--space-2)",
  verticalAlign: "middle",
  color: "var(--text-soft)",
  background: "var(--surface-soft)",
  borderBottom: "var(--line-thin) solid var(--border-subtle)",
  fontSize: "var(--text-meta)",
  fontWeight: "var(--font-weight-medium)",
  letterSpacing: "normal",
  textTransform: "none",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".table-section th:first-child,\n.table-section td:first-child", {
  position: "sticky",
  left: "0",
  zIndex: "var(--layer-content)",
  paddingLeft: "var(--space-4)",
  background: "var(--card)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".table-section thead th:first-child", {
  zIndex: "var(--layer-raised)",
  background: "var(--surface-soft)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".table-section .table-year", {
  color: "var(--text-strong)",
  fontWeight: "var(--font-weight-medium)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".table-section th.table-investment-heading", {
  whiteSpace: "normal",
  overflowWrap: "break-word",
  wordBreak: "normal",
  lineHeight: "var(--leading-snug)",
  verticalAlign: "middle",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".table-section td", {
  fontVariantNumeric: "tabular-nums",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".table-section .abbreviated-value", {
  whiteSpace: "nowrap",
  overflowWrap: "normal",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".table-section .table-total-heading,\n.table-section .table-total", {
  borderLeft: "var(--line-thin) solid var(--border-subtle)",
  paddingLeft: "var(--space-4)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".table-section .table-total-heading", {
  color: "var(--text-strong)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".table-section .table-total", {
  color: "var(--primary)",
  fontWeight: "var(--font-weight-bold)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".table-section tbody tr:hover th,\n.table-section tbody tr:hover td", {
  background: "var(--surface-soft)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(
  ".table-section tbody tr.table-final-row th,\n.table-section tbody tr.table-final-row td",
  {
    background: "var(--surface-soft)",
    borderTop: "var(--line-thin) solid var(--border-subtle)",
    color: "var(--text-strong)",
    fontWeight: "var(--font-weight-semibold)",
  } as unknown as Parameters<typeof globalStyle>[1],
);
globalStyle(".table-section tbody tr.table-final-row td.table-total", {
  color: "var(--primary)",
  fontWeight: "var(--font-weight-bold)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".table-section tbody tr:last-child th,\n.table-section tbody tr:last-child td", {
  borderBottom: "0",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".table-section .table-section-heading", {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      flexDirection: "row",
      alignItems: "center",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".table-controls", {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      justifyContent: "flex-end",
      width: "auto",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".table-column-options", {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      right: "0",
      left: "auto",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
