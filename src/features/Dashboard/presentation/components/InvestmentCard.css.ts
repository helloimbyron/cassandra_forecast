import { globalStyle, style } from "@vanilla-extract/css";
import { breakpoints } from "@/design-system/styles/breakpoints.build";
import { investmentGrowthFormulaTrigger } from "./FormulaTooltip.css.ts";

export const investmentCardHeader = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "start",
  justifyContent: "space-between",
  gap: "var(--space-3)",
  padding: "var(--space-4) var(--space-4) 0",
});

export const investmentIdentity = style({
  display: "flex",
  alignItems: "center",
  gap: "var(--space-2)",
  minWidth: "0",
});

globalStyle(`${investmentIdentity} > div`, {
  minWidth: "0",
});

export const investmentHeaderActions = style({
  display: "flex",
  alignItems: "center",
  gap: "var(--space-2)",
  flex: "none",
});

export const investmentIcon = style({
  display: "grid",
  placeItems: "center",
  flex: "none",
  width: "var(--space-575)",
  height: "var(--space-575)",
  borderRadius: "var(--space-2)",
  background: "color-mix(in srgb, var(--investment-accent) var(--mix-20), var(--card))",
  color: "var(--investment-accent)",
});

globalStyle(`${investmentIcon} svg`, {
  width: "var(--investment-symbol-size)",
  height: "var(--investment-symbol-size)",
});

export const investmentCardContent = style({
  padding: "var(--space-4) var(--space-4) var(--space-1)",
});

export const investmentMetrics = style({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.2fr)",
  alignItems: "center",
  gap: "var(--space-4)",
});

export const investmentPrimaryMetric = style({
  minWidth: "0",
  textAlign: "left",
});

export const investmentSecondaryMetrics = style({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr)",
});

export const investmentSecondaryMetric = style({
  minWidth: "0",
  textAlign: "center",
});

export const investmentValueLabel = style({
  color: "var(--text-soft)",
  fontSize: "var(--text-meta)",
  fontWeight: "var(--font-weight-semibold)",
  textTransform: "none",
  letterSpacing: "normal",
});

export const investmentValue = style({
  marginTop: "var(--space-05)",
  fontSize: "var(--text-subsection)",
  fontWeight: "var(--font-weight-semibold)",
  lineHeight: "var(--leading-tight)",
  letterSpacing: "var(--tracking-tight)",
  overflowWrap: "anywhere",
});

export const investmentValueRow = style({
  display: "flex",
  alignItems: "center",
  minWidth: "0",
  gap: "var(--space-075)",
});

globalStyle(`${investmentSecondaryMetric} ${investmentValueRow}`, {
  justifyContent: "center",
});

globalStyle(`${investmentValueRow} ${investmentValue}`, {
  minWidth: "0",
});

globalStyle(`${investmentSecondaryMetric} ${investmentValueLabel}`, {
  marginBottom: "var(--space-05)",
});

export const investmentSecondaryHeading = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "var(--space-05)",
});

export const investmentGrowthValue = style({
  display: "flex",
  alignItems: "center",
  minWidth: "0",
  gap: "var(--space-05)",
  color: "var(--text-strong)",
  fontSize: "var(--text-body)",
  fontWeight: "var(--font-weight-semibold)",
  lineHeight: "var(--leading-tight)",
  overflowWrap: "anywhere",
});

globalStyle(`${investmentGrowthValue} .abbreviated-value`, {
  color: "inherit",
});

export const investmentGrowthRow = style({});

globalStyle(`${investmentGrowthRow} ${investmentGrowthFormulaTrigger}`, {
  flex: "none",
});

export const growthArrow = style({
  display: "flex",
  color: "var(--primary)",
});

export const sliderBlock = style({
  padding: "var(--space-4) 0",
  borderTop: "var(--line-thin) solid var(--border-subtle)",
});

globalStyle(`${sliderBlock} > .slider-heading`, {
  marginBottom: "0",
});

globalStyle(`${sliderBlock} > .range-labels`, {
  marginTop: "0",
});

export const rateEditRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: "var(--space-3)",
  padding: "var(--space-4) 0",
  borderTop: "var(--line-thin) solid var(--border-subtle)",
  color: "var(--text-soft)",
});

export const rateInputControls = style({
  display: "flex",
  alignItems: "center",
  gap: "var(--space-2)",
});

export const holdingList = style({
  borderTop: "var(--line-thin) solid var(--border-subtle)",
});

globalStyle(".holding-table-header,\n.holding-row", {
  display: "grid",
  gridTemplateColumns:
    "minmax(0, 1.15fr) minmax(0, 0.85fr) minmax(var(--size-7-5), 0.95fr)\n    minmax(0, 0.9fr) minmax(0, 1fr)",
  alignItems: "center",
  gap: "var(--space-2)",
});

export const holdingTableHeader = style({
  padding: "var(--space-2) 0",
  color: "var(--text-soft)",
  fontSize: "var(--text-meta)",
  fontWeight: "var(--font-weight-medium)",
});

globalStyle(
  `${holdingTableHeader} > span,
.holding-cell`,
  {
    minWidth: "0",
  },
);

globalStyle(investmentCardHeader, {
  flexWrap: "wrap",
});

globalStyle(investmentMetrics, {
  gridTemplateColumns: "minmax(0, 1fr)",
  gap: "var(--space-3)",
});

globalStyle(investmentPrimaryMetric, {
  textAlign: "center",
});

globalStyle(`${investmentPrimaryMetric} ${investmentValueRow}`, {
  justifyContent: "center",
});

export const investmentGrowthValues = style({
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: "var(--space-4)",
});

globalStyle(holdingTableHeader, {
  position: "absolute",
  width: "var(--line-thin)",
  height: "var(--line-thin)",
  overflow: "hidden",
  whiteSpace: "nowrap",
  clipPath: "inset(50%)",
});

globalStyle(investmentCardHeader, {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      flexWrap: "nowrap",
    },
  },
});

globalStyle(investmentMetrics, {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.2fr)",
      gap: "var(--space-4)",
    },
  },
});

globalStyle(investmentPrimaryMetric, {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      textAlign: "left",
    },
  },
});

globalStyle(`${investmentPrimaryMetric} ${investmentValueRow}`, {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      justifyContent: "flex-start",
    },
  },
});

globalStyle(investmentGrowthValues, {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      gap: "var(--space-4)",
    },
  },
});

globalStyle(holdingTableHeader, {
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
});
