import { globalStyle } from "@vanilla-extract/css";

globalStyle(".formula-growth-comparison", {
  display: "grid",
  gap: "var(--space-075)",
  width: "100%",
  margin: "0",
  padding: "0",
  listStyle: "none",
  textAlign: "left",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".formula-growth-comparison li", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "baseline",
  gap: "var(--space-2)",
  minWidth: "0",
  padding: "var(--space-05) var(--space-075)",
  borderRadius: "var(--space-05)",
  color: "var(--text-soft)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".formula-growth-comparison li span", {
  minWidth: "0",
  overflowWrap: "anywhere",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".formula-growth-comparison li strong", {
  flex: "none",
  color: "var(--text-strong)",
  fontVariantNumeric: "tabular-nums",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".formula-growth-comparison li.is-leading", {
  background: "var(--surface-soft)",
  color: "var(--text-strong)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".formula-growth-comparison li.is-leading strong", {
  color: "var(--primary)",
} as unknown as Parameters<typeof globalStyle>[1]);
