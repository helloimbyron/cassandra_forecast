import { globalStyle, style } from "@vanilla-extract/css";

export const formulaGrowthComparison = style({
  display: "grid",
  gap: "var(--space-075)",
  width: "100%",
  margin: "0",
  padding: "0",
  listStyle: "none",
  textAlign: "left",
});

globalStyle(`${formulaGrowthComparison} li`, {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "baseline",
  gap: "var(--space-2)",
  minWidth: "0",
  padding: "var(--space-05) var(--space-075)",
  borderRadius: "var(--space-05)",
  color: "var(--text-soft)",
});

globalStyle(`${formulaGrowthComparison} li span`, {
  minWidth: "0",
  overflowWrap: "anywhere",
});

globalStyle(`${formulaGrowthComparison} li strong`, {
  flex: "none",
  color: "var(--text-strong)",
  fontVariantNumeric: "tabular-nums",
});

globalStyle(`${formulaGrowthComparison} li.is-leading`, {
  background: "var(--surface-soft)",
  color: "var(--text-strong)",
});

globalStyle(`${formulaGrowthComparison} li.is-leading strong`, {
  color: "var(--primary)",
});
