import { globalStyle, style } from "@vanilla-extract/css";
import { formulaMath } from "./FormulaMath.css.ts";
import { formulaMathResult } from "./FormulaResult.css.ts";

export const formulaMonthExamples = style({
  display: "grid",
  gap: "var(--space-1)",
  width: "100%",
  minWidth: "0",
});

export const formulaMonthExample = style({
  display: "grid",
  justifyItems: "center",
  gap: "var(--space-025)",
  width: "100%",
  minWidth: "0",
  paddingTop: "var(--space-05)",
});

globalStyle(`${formulaMonthExample} + ${formulaMonthExample}`, {
  borderTop: "var(--line-thin) solid var(--border-subtle)",
});

export const formulaMonthLabel = style({
  color: "var(--text-strong)",
  fontSize: "var(--text-meta)",
  lineHeight: "var(--leading-snug)",
});

export const formulaMonthGap = style({
  margin: "var(--space-05) 0",
  color: "var(--text-soft)",
  fontSize: "var(--text-meta)",
  lineHeight: "var(--leading-snug)",
  textWrap: "pretty",
});

globalStyle(`${formulaMonthExample} ${formulaMath}`, {
  padding: "var(--space-025) var(--space-025) var(--space-025)",
});

globalStyle(`${formulaMonthExample} ${formulaMathResult}`, {
  marginTop: "0",
  borderTop: "0",
});
