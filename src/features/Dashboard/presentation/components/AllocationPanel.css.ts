import { globalStyle, style } from "@vanilla-extract/css";
import { breakpoints } from "@/design-system/styles/breakpoints.build";
import { chartWrap, panelHeader } from "./DashboardPrimitives.css.ts";

export const allocationPanel = style({});

globalStyle(`${allocationPanel} ${panelHeader}`, {
  paddingBottom: "0",
});

export const donutWrap = style({
  position: "relative",
  height: "var(--size-15)",
  marginBottom: "var(--space-4)",
});

globalStyle(
  `${chartWrap} .recharts-surface:focus,\n${chartWrap} .recharts-surface :focus,\n${donutWrap} .recharts-surface:focus,\n${donutWrap} .recharts-surface :focus`,
  { outline: "none" },
);

export const donutCenter = style({
  position: "absolute",
  inset: "0",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  pointerEvents: "none",
});

globalStyle(`${allocationPanel} .recharts-tooltip-wrapper`, {
  zIndex: "var(--layer-raised)",
});

globalStyle(`${donutCenter} strong`, {
  fontSize: "var(--text-xl)",
  fontWeight: "var(--font-weight-semibold)",
});

globalStyle(`${donutCenter} span`, {
  color: "var(--text-soft)",
  fontSize: "var(--text-meta)",
});

export const allocationList = style({
  display: "flex",
  flexDirection: "column",
  gap: "var(--space-2)",
});

export const allocationRow = style({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) minmax(var(--space-7), auto) minmax(var(--size-6), auto)",
  alignItems: "center",
  gap: "var(--space-2)",
  minWidth: "0",
  paddingTop: "var(--space-2)",
  borderTop: "var(--line-thin) solid var(--border-subtle)",
  color: "var(--text-soft)",
  fontSize: "var(--text-meta)",
});

export const allocationName = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "var(--space-1)",
  minWidth: "0",
  color: "var(--foreground)",
  overflowWrap: "anywhere",
});

globalStyle(`${allocationName} i`, {
  display: "inline-block",
  width: "var(--space-2)",
  height: "var(--space-2)",
  flex: "none",
  borderRadius: "50%",
});

globalStyle(`${allocationRow} > span:not(${allocationName})`, {
  textAlign: "right",
  whiteSpace: "nowrap",
});

globalStyle(`${allocationRow} strong`, {
  color: "var(--text-strong)",
  fontWeight: "var(--font-weight-semibold)",
  whiteSpace: "nowrap",
  textAlign: "right",
});

globalStyle(donutWrap, {
  height: "var(--size-13)",
});

globalStyle(donutWrap, {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      height: "var(--size-15)",
    },
  },
});
