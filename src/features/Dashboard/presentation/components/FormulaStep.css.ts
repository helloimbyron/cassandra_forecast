import { globalStyle, style } from "@vanilla-extract/css";

export const formulaStep = style({
  position: "relative",
  display: "grid",
  justifyItems: "center",
  gap: "var(--space-1)",
  boxSizing: "border-box",
  width: "100%",
  minWidth: "0",
  padding: "var(--space-075) var(--space-025) var(--space-1) var(--space-45)",
  textAlign: "center",
  counterIncrement: "formula-step",
});

globalStyle(`${formulaStep}::before`, {
  position: "absolute",
  top: "var(--space-075)",
  left: "var(--space-025)",
  content: 'counter(formula-step) "."',
  color: "var(--primary)",
  fontWeight: "var(--font-weight-bold)",
  fontSize: "var(--text-meta)",
});

export const formulaStepDescription = style({
  color: "var(--text-soft)",
  fontSize: "var(--text-meta)",
  lineHeight: "var(--leading-snug)",
  textWrap: "pretty",
});

globalStyle(`${formulaStep} + ${formulaStep}`, {
  paddingTop: "var(--space-3)",
  borderTop: "var(--line-thin) solid var(--border-subtle)",
});

globalStyle(`${formulaStep} + ${formulaStep}::before`, {
  top: "var(--space-3)",
});
