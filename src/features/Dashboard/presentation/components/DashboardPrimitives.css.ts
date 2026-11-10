import { globalStyle, style } from "@vanilla-extract/css";
import { breakpoints } from "@/design-system/styles/breakpoints.build";

export const dashboardCardSurface = style({
  border: "var(--line-thin) solid var(--border-subtle)",
  borderRadius: "var(--radius-card)",
  boxShadow: "var(--shadow-card)",
});

export const eyebrow = style({
  display: "flex",
  alignItems: "center",
  gap: "var(--space-2)",
  color: "var(--primary)",
  fontSize: "var(--text-meta)",
  fontWeight: "var(--font-weight-semibold)",
  letterSpacing: "normal",
  textTransform: "none",
});

export const eyebrowLine = style({
  flex: "none",
  display: "block",
  width: "var(--space-35)",
  height: "var(--line-medium)",
  background: "var(--brand-dot)",
});

export const rangeLabels = style({
  display: "flex",
  justifyContent: "space-between",
  marginTop: "var(--space-1)",
  color: "var(--text-soft)",
  fontSize: "var(--text-meta)",
});

export const panelHeader = style({
  display: "flex",
  alignItems: "start",
  justifyContent: "space-between",
  gap: "var(--space-3)",
  padding: "var(--space-4) var(--space-4) var(--space-3)",
});

export const chartWrap = style({
  height: "var(--size-20)",
});

export const investmentLegend = style({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: "var(--space-1)",
  paddingTop: "var(--space-3)",
});

export const distributionModeToggle = style({
  display: "inline-flex",
  flex: "none",
  gap: "var(--space-025)",
  padding: "var(--space-025)",
  border: "var(--line-thin) solid var(--border-subtle)",
  borderRadius: "var(--radius-full)",
  background: "var(--secondary)",
});

globalStyle(`${distributionModeToggle} button`, {
  minWidth: "var(--space-45)",
  minHeight: "var(--space-5)",
  padding: "0 var(--space-1)",
  border: "var(--line-thin) solid transparent",
  borderRadius: "var(--radius-full)",
  color: "var(--text-soft)",
  background: "transparent",
  fontSize: "var(--text-meta)",
  cursor: "pointer",
});

globalStyle(`${distributionModeToggle} button[aria-pressed="true"]`, {
  minWidth: "var(--space-5)",
  minHeight: "var(--space-5)",
  padding: "0 var(--space-1)",
  borderColor: "transparent",
  borderRadius: "var(--radius-full)",
  color: "var(--primary-foreground)",
  background: "var(--primary)",
  boxShadow: "var(--shadow-card)",
});

globalStyle(`${distributionModeToggle} button:not([aria-pressed="true"]):hover`, {
  color: "var(--text-strong)",
  background: "transparent",
});

globalStyle(`${distributionModeToggle}:has(button:not([aria-pressed="true"]):hover)`, {
  background: "var(--muted)",
});

globalStyle(`${distributionModeToggle} button:focus-visible`, {
  outline: "var(--line-medium) solid var(--focus-ring)",
  outlineOffset: "var(--line-medium)",
});

export const sectionHeading = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "end",
  gap: "var(--space-4)",
  marginBottom: "var(--space-4)",
});

globalStyle(`${sectionHeading} h2`, {
  margin: "var(--space-1) 0 0",
  fontSize: "var(--text-section)",
  fontWeight: "var(--font-weight-semibold)",
  letterSpacing: "var(--tracking-tight)",
  lineHeight: "var(--leading-tight)",
});

export const sourceIconLink = style({
  display: "grid",
  placeItems: "center",
  width: "var(--control-height)",
  height: "var(--control-height)",
  borderRadius: "var(--space-1)",
  color: "var(--text-soft)",
  background: "transparent",
  transition: "color var(--motion-fast) ease,\n    background-color var(--motion-fast) ease",
});

globalStyle(`${sourceIconLink}:hover`, {
  color: "var(--primary)",
  background: "var(--muted)",
});

globalStyle(`${sourceIconLink}:focus-visible`, {
  outline: "var(--line-medium) solid var(--focus-ring)",
  outlineOffset: "var(--line-medium)",
});

export const sliderHeading = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "var(--space-3)",
  marginBottom: "var(--space-2)",
  color: "var(--text-soft)",
  fontSize: "var(--text-body)",
});

globalStyle(`${sliderHeading} strong`, {
  color: "var(--text-strong)",
  fontWeight: "var(--font-weight-semibold)",
});

globalStyle(sectionHeading, {
  flexDirection: "column",
  alignItems: "start",
  gap: "var(--space-2)",
});

globalStyle(panelHeader, {
  flexWrap: "wrap",
});

globalStyle(chartWrap, {
  height: "var(--size-17)",
});

globalStyle(panelHeader, {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      flexWrap: "nowrap",
    },
  },
});

globalStyle(chartWrap, {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      height: "var(--size-20)",
    },
  },
});

globalStyle(sectionHeading, {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      flexDirection: "row",
      alignItems: "end",
      gap: "var(--space-4)",
    },
  },
});
