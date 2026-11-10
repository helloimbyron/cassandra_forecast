import { globalStyle, style } from "@vanilla-extract/css";

export const metricCard = style({});

export const metricPositive = style({});

export const metricValueRow = style({
  display: "flex",
  alignItems: "center",
  gap: "var(--space-075)",
  minWidth: "0",
  marginTop: "var(--space-2)",
});

globalStyle(`${metricCard} ${metricValueRow} strong`, {
  marginTop: "0",
});

export const metricLabel = style({
  display: "flex",
  alignItems: "flex-start",
  flexWrap: "nowrap",
  gap: "var(--space-1)",
  color: "var(--text-soft)",
  fontSize: "var(--text-meta)",
  fontWeight: "var(--font-weight-medium)",
});

export const metricLabelIcon = style({
  display: "inline-flex",
  flex: "none",
  marginTop: "var(--space-025)",
  color: "var(--primary)",
});

export const metricLabelText = style({
  minWidth: "0",
});

globalStyle(`${metricCard} strong`, {
  display: "block",
  marginTop: "var(--space-2)",
  color: "var(--text-strong)",
  fontSize: "var(--text-xl)",
  fontWeight: "var(--font-weight-semibold)",
  letterSpacing: "var(--tracking-subtle)",
  overflowWrap: "anywhere",
});

globalStyle(`${metricCard} strong${metricPositive}`, {
  color: "var(--primary)",
});

globalStyle(`.metrics-grid ${metricCard} strong${metricPositive}`, {
  color: "var(--text-strong)",
});

globalStyle(`${metricCard} small`, {
  display: "block",
  marginTop: "var(--space-05)",
  color: "var(--text-soft)",
  fontSize: "var(--text-meta)",
});
