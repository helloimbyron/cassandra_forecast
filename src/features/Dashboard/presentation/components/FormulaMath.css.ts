import { globalStyle, style } from "@vanilla-extract/css";

export const formulaMath = style({
  boxSizing: "border-box",
  minWidth: "0",
  width: "100%",
  maxWidth: "100%",
  overflow: "auto hidden",
  padding: "var(--space-025) var(--space-025) var(--space-075)",
  color: "var(--text-strong)",
  fontSize: "var(--text-card-fluid)",
  lineHeight: "var(--leading-body)",
  textAlign: "center",
  whiteSpace: "nowrap",
  WebkitOverflowScrolling: "touch",
});

globalStyle(`${formulaMath} .katex-display`, {
  margin: "var(--space-025) 0",
});

globalStyle(`${formulaMath}:focus-visible`, {
  outline: "var(--line-medium) solid var(--primary)",
  outlineOffset: "var(--line-medium)",
  borderRadius: "var(--space-025)",
});

export const formulaMathSubstitution = style({
  color: "var(--primary)",
});

export const formulaNoResult = style({
  margin: "0",
  color: "var(--text-soft)",
  fontSize: "var(--text-meta)",
  lineHeight: "var(--leading-snug)",
});

globalStyle(`${formulaMath} .katex`, {
  color: "inherit",
  fontSize: "var(--text-body)",
});
