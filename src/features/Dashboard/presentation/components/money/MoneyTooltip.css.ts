import { globalStyle, style } from "@vanilla-extract/css";

export const moneyTooltipTrigger = style({
  display: "inline-flex",
  alignItems: "center",
  minWidth: "var(--space-4)",
  minHeight: "var(--space-4)",
  margin: "0",
  padding: "0",
  border: "0",
  color: "inherit",
  background: "transparent",
  font: "inherit",
  lineHeight: "inherit",
  textAlign: "inherit",
  fontVariantNumeric: "tabular-nums",
  cursor: "help",
});

globalStyle(`${moneyTooltipTrigger}:focus-visible`, {
  outline: "var(--line-medium) solid var(--focus-ring)",
  outlineOffset: "var(--line-medium)",
  borderRadius: "var(--space-05)",
});

export const moneyTooltipContent = style({
  zIndex: "var(--layer-dialog)",
  maxWidth: "min(var(--fluid-max-width), var(--size-34))",
  padding: "var(--space-1) var(--space-2)",
  border: "var(--line-thin) solid var(--input)",
  borderRadius: "var(--space-1)",
  color: "var(--popover-foreground)",
  background: "var(--popover)",
  boxShadow: "var(--shadow-card)",
  fontSize: "var(--text-meta)",
  lineHeight: "var(--leading-snug)",
  fontVariantNumeric: "tabular-nums",
  overflowWrap: "anywhere",
});

export const moneyTooltipArrow = style({
  fill: "var(--popover)",
});
