import { globalStyle, style } from "@vanilla-extract/css";
import { breakpoints } from "@/design-system/styles/breakpoints.build";

export const formulaTooltipTrigger = style({
  display: "inline-flex",
  flex: "none",
  alignItems: "center",
  justifyContent: "center",
  width: "var(--space-35)",
  height: "var(--space-35)",
  minWidth: "var(--space-4)",
  minHeight: "var(--space-4)",
  margin: "0 0 0 var(--space-1)",
  padding: "0",
  border: "0",
  color: "var(--primary)",
  background: "transparent",
  font: "inherit",
  lineHeight: "inherit",
  textAlign: "inherit",
  cursor: "pointer",
  opacity: "var(--emphasis-opacity)",
});

globalStyle(`${formulaTooltipTrigger}:focus-visible`, {
  outline: "var(--line-medium) solid var(--focus-ring)",
  outlineOffset: "var(--line-focus)",
  borderRadius: "var(--space-05)",
});

export const investmentGrowthFormulaTrigger = style({});

globalStyle(`${formulaTooltipTrigger}${investmentGrowthFormulaTrigger}`, {
  marginLeft: "0",
});

export const formulaTooltipCopy = style({
  display: "flex",
  flexDirection: "column",
  gap: "var(--space-3)",
  minWidth: "0",
  maxWidth: "100%",
  margin: "0",
  padding: "0",
  listStyle: "none",
  counterReset: "formula-step",
});

export const formulaDialogOverlay = style({
  position: "fixed",
  inset: "0",
  zIndex: "var(--layer-dialog)",
  background: "var(--overlay-scrim)",
});

export const formulaDialogContent = style({
  position: "fixed",
  top: "50%",
  left: "50%",
  zIndex: "var(--layer-overlay)",
  display: "flex",
  flexDirection: "column",
  boxSizing: "border-box",
  width: "calc(100vw - var(--space-3))",
  maxWidth: "calc(100vw - var(--space-3))",
  maxHeight: "calc(100dvh - var(--space-3))",
  minHeight: "0",
  transform: "translate(-50%, -50%)",
  border: "var(--line-thin) solid var(--input)",
  borderRadius: "var(--space-2)",
  color: "var(--popover-foreground)",
  background: "var(--popover)",
  boxShadow: "var(--shadow-card)",
  fontSize: "var(--text-meta)",
  lineHeight: "var(--leading-snug)",
  fontVariantNumeric: "tabular-nums",
  overflowWrap: "anywhere",
  containerType: "inline-size",
});

globalStyle(`${formulaDialogContent}:focus-visible`, {
  outline: "var(--line-medium) solid var(--focus-ring)",
  outlineOffset: "var(--line-medium)",
});

export const formulaTooltipHeading = style({
  position: "relative",
  flex: "none",
  margin: "0 var(--space-2)",
  padding: "var(--space-3) var(--space-525) var(--space-3) 0",
  borderBottom: "var(--line-thin) solid var(--border-subtle)",
});

globalStyle(
  `${formulaTooltipHeading} [data-slot],
${formulaTooltipHeading} h2`,
  {
    margin: "0",
  },
);

globalStyle(`${formulaTooltipHeading} h2`, {
  color: "var(--text-strong)",
  fontSize: "var(--text-body)",
  fontWeight: "var(--font-weight-semibold)",
  lineHeight: "var(--leading-snug)",
});

globalStyle(`${formulaTooltipHeading} p`, {
  margin: "var(--space-075) 0 0",
  color: "var(--text-soft)",
  fontSize: "var(--text-meta)",
  lineHeight: "var(--leading-body)",
});

globalStyle(`${formulaTooltipHeading} .formula-tooltip-example`, {
  color: "var(--text-strong)",
});

export const formulaDialogClose = style({
  position: "absolute",
  top: "var(--space-2)",
  right: "var(--space-2)",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "var(--control-height)",
  height: "var(--control-height)",
  border: "0",
  borderRadius: "var(--space-075)",
  color: "var(--text-soft)",
  background: "transparent",
  cursor: "pointer",
});

globalStyle(`${formulaDialogClose}:hover`, {
  color: "var(--text-strong)",
  background: "var(--surface-soft)",
});

globalStyle(`${formulaDialogClose}:focus-visible`, {
  outline: "var(--line-medium) solid var(--focus-ring)",
  outlineOffset: "var(--line-medium)",
});

export const formulaDialogScroll = style({
  minHeight: "0",
  overflow: "hidden auto",
  overscrollBehavior: "contain",
  padding: "var(--space-3) var(--space-2)",
});

globalStyle(formulaDialogContent, {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      width: "min(var(--size-42), calc(100vw - var(--space-5)))",
      maxHeight: "min(90dvh, var(--size-46))",
    },
  },
});

globalStyle(formulaTooltipHeading, {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      marginInline: "var(--space-3)",
    },
  },
});

globalStyle(formulaDialogScroll, {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      paddingInline: "var(--space-3)",
    },
  },
});
