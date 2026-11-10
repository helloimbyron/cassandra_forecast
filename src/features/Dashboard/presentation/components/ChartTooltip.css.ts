import { globalStyle, style } from "@vanilla-extract/css";

export const chartTooltip = style({
  display: "flex",
  flexDirection: "column",
  gap: "var(--space-1)",
  minWidth: "var(--size-13)",
  padding: "var(--space-3)",
  border: "var(--line-thin) solid var(--input)",
  borderRadius: "var(--radius)",
  background: "var(--popover)",
  boxShadow: "var(--shadow-card)",
  color: "var(--popover-foreground)",
  fontSize: "var(--text-meta)",
});

globalStyle(`${chartTooltip} > span`, {
  paddingBottom: "var(--space-1)",
  borderBottom: "var(--line-thin) solid var(--border-subtle)",
  fontWeight: "var(--font-weight-semibold)",
});

globalStyle(`${chartTooltip} > div`, {
  display: "grid",
  gridTemplateColumns: "var(--space-2) 1fr auto",
  alignItems: "center",
  gap: "var(--space-1)",
});

globalStyle(`${chartTooltip} i`, {
  width: "var(--space-1)",
  height: "var(--space-1)",
  borderRadius: "50%",
});

globalStyle(`${chartTooltip} strong`, {
  color: "var(--text-strong)",
  whiteSpace: "nowrap",
});
