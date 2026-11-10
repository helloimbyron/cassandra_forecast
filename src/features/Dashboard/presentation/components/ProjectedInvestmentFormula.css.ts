import { globalStyle, style } from "@vanilla-extract/css";
import { formulaMath } from "./FormulaMath.css.ts";

export const formulaInvestmentExpression = style({});

globalStyle(`${formulaInvestmentExpression} ${formulaMath}`, {
  paddingBlock: "var(--space-075)",
  fontSize: "var(--text-card-fluid)",
  fontWeight: "var(--font-weight-semibold)",
});
