import { globalStyle, style } from "@vanilla-extract/css";
import { breakpoints } from "@/design-system/styles/breakpoints.build";
import { formulaTooltipTrigger } from "./FormulaTooltip.css.ts";

export const distributionSection = style({
  margin: "var(--space-6) 0 0",
});

export const distributionHeading = style({
  alignItems: "end",
});

globalStyle(`${distributionHeading} h2`, {
  margin: "var(--space-1) 0 0",
  fontSize: "var(--text-section)",
  fontWeight: "var(--font-weight-semibold)",
  letterSpacing: "var(--tracking-tight)",
  lineHeight: "var(--leading-tight)",
});

globalStyle(`${distributionHeading} h2.eyebrow`, {
  margin: "0",
  fontSize: "var(--text-meta)",
  fontWeight: "inherit",
  letterSpacing: "normal",
  lineHeight: "normal",
});

export const distributionTitleRow = style({
  display: "flex",
  alignItems: "center",
  gap: "var(--space-075)",
});

export const distributionHeadingInfoTrigger = style({});

globalStyle(`${formulaTooltipTrigger}${distributionHeadingInfoTrigger}`, {
  width: "var(--space-35)",
  height: "var(--space-35)",
  margin: "0",
});

export const distributionPanel = style({
  overflow: "hidden",
});

globalStyle(`${distributionPanel}.distribution-panel .panel-header`, {
  alignItems: "center",
});

export const distributionControls = style({
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: "var(--space-4)",
  marginTop: "var(--space-4)",
  paddingTop: "var(--space-4)",
  borderTop: "var(--line-thin) solid var(--border-subtle)",
});

export const distributionControl = style({
  display: "grid",
  alignContent: "start",
  gap: "var(--space-2)",
  minWidth: "0",
});

export const distributionControlHeading = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "var(--space-2)",
  minHeight: "var(--control-height)",
  color: "var(--text-soft)",
  fontSize: "var(--text-meta)",
});

globalStyle(`${distributionControlHeading} label`, {
  minWidth: "0",
  fontSize: "var(--text-meta)",
});

export const distributionLabelGroup = style({
  display: "flex",
  alignItems: "center",
  gap: "var(--space-075)",
  minWidth: "0",
});

globalStyle(`${distributionControlHeading} > strong`, {
  color: "var(--text-strong)",
  fontWeight: "var(--font-weight-semibold)",
  whiteSpace: "nowrap",
});

export const distributionWithdrawalHeading = style({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) auto",
  gridTemplateRows: "auto auto",
  justifyContent: "initial",
});

globalStyle(`${distributionWithdrawalHeading} ${distributionLabelGroup}`, {
  gridColumn: "1 / -1",
  gridRow: "1",
});

globalStyle(`${distributionWithdrawalHeading} .distribution-mode-toggle`, {
  gridColumn: "1",
  gridRow: "2",
  justifySelf: "start",
});

globalStyle(`${distributionWithdrawalHeading} .numeric-unit-input`, {
  gridColumn: "2",
  gridRow: "2",
});

export const distributionNote = style({
  margin: "var(--space-3) 0 0",
  color: "var(--primary)",
  fontSize: "var(--text-meta)",
  lineHeight: "var(--leading-snug)",
});

export const distributionInsights = style({
  display: "grid",
  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  gap: "var(--space-3)",
  margin: "var(--space-4) 0 0",
});

globalStyle(`${distributionInsights} .metric-card`, {
  minWidth: "0",
});

globalStyle(`${distributionInsights} .metric-card strong`, {
  fontSize: "var(--text-metric)",
});

globalStyle(`${distributionInsights} .metric-value-row`, {
  alignItems: "center",
});

globalStyle(distributionInsights, {
  gridTemplateColumns: "1fr",
});

globalStyle(distributionControls, {
  gridTemplateColumns: "1fr",
});

globalStyle(`:where(${distributionPanel}) .panel-header`, {
  alignItems: "start",
});

globalStyle(`${distributionControl} .numeric-unit-input`, {
  width: "var(--size-6-25)",
});

globalStyle(distributionInsights, {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    },
  },
});

globalStyle(distributionControls, {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    },
  },
});

globalStyle(distributionInsights, {
  "@media": {
    ["(width >= " + breakpoints.wide + ")"]: {
      gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    },
  },
});

globalStyle(distributionControls, {
  "@media": {
    ["(width >= " + breakpoints.wide + ")"]: {
      gridTemplateColumns: "minmax(0, 0.9fr) minmax(0, 1.35fr) minmax(0, 0.9fr)",
    },
  },
});

globalStyle(distributionWithdrawalHeading, {
  "@media": {
    ["(width >= " + breakpoints.wide + ")"]: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-1)",
    },
  },
});

globalStyle(`${distributionWithdrawalHeading} ${distributionLabelGroup}`, {
  "@media": {
    ["(width >= " + breakpoints.wide + ")"]: {
      flex: "1",
    },
  },
});
