import { globalStyle, style } from "@vanilla-extract/css";

export const numericUnitInput = style({
  position: "relative",
  flex: "none",
  width: "var(--size-6-25)",
  color: "var(--text-soft)",
});

globalStyle(`${numericUnitInput} input`, {
  minHeight: "var(--control-height)",
  padding: "0 var(--space-1)",
  color: "var(--foreground)",
  background: "var(--card)",
  fontVariantNumeric: "tabular-nums",
});

globalStyle(`${numericUnitInput}.is-money input`, {
  paddingLeft: "var(--space-4)",
  textAlign: "right",
});

globalStyle(`${numericUnitInput}.is-percent input`, {
  paddingRight: "var(--space-45)",
  textAlign: "right",
});

export const numericUnitAffix = style({
  position: "absolute",
  top: "50%",
  zIndex: "var(--layer-content)",
  transform: "translateY(-50%)",
  color: "var(--text-soft)",
  pointerEvents: "none",
});

globalStyle(`${numericUnitInput}.is-money > ${numericUnitAffix}`, {
  left: "var(--space-2)",
});

globalStyle(`${numericUnitInput}.is-percent > ${numericUnitAffix}`, {
  right: "var(--space-2)",
});
