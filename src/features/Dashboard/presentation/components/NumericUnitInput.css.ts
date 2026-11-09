import { globalStyle } from "@vanilla-extract/css";

globalStyle(".numeric-unit-input", {
  position: "relative",
  flex: "none",
  width: "var(--size-6-25)",
  color: "var(--text-soft)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".numeric-unit-input input", {
  minHeight: "var(--control-height)",
  padding: "0 var(--space-1)",
  color: "var(--foreground)",
  background: "var(--card)",
  fontVariantNumeric: "tabular-nums",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".numeric-unit-input.is-money input", {
  paddingLeft: "var(--space-4)",
  textAlign: "right",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".numeric-unit-input.is-percent input", {
  paddingRight: "var(--space-45)",
  textAlign: "right",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".numeric-unit-affix", {
  position: "absolute",
  top: "50%",
  zIndex: "var(--layer-content)",
  transform: "translateY(-50%)",
  color: "var(--text-soft)",
  pointerEvents: "none",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".numeric-unit-input.is-money > .numeric-unit-affix", {
  left: "var(--space-2)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".numeric-unit-input.is-percent > .numeric-unit-affix", {
  right: "var(--space-2)",
} as unknown as Parameters<typeof globalStyle>[1]);
