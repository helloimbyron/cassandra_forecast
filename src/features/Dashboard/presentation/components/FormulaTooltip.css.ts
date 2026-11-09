import { globalStyle } from "@vanilla-extract/css";
import { breakpoints } from "@/design-system/styles/breakpoints.build";

globalStyle(".formula-dialog-overlay", {
  position: "fixed",
  inset: "0",
  zIndex: "var(--layer-dialog)",
  background: "var(--overlay-scrim)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".formula-dialog-content", {
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
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".formula-dialog-content:focus-visible", {
  outline: "var(--line-medium) solid var(--focus-ring)",
  outlineOffset: "var(--line-medium)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".formula-tooltip-heading", {
  position: "relative",
  flex: "none",
  margin: "0 var(--space-2)",
  padding: "var(--space-3) var(--space-525) var(--space-3) 0",
  borderBottom: "var(--line-thin) solid var(--border-subtle)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".formula-tooltip-heading [data-slot],\n.formula-tooltip-heading h2", {
  margin: "0",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".formula-tooltip-heading h2", {
  color: "var(--text-strong)",
  fontSize: "var(--text-body)",
  fontWeight: "var(--font-weight-semibold)",
  lineHeight: "var(--leading-snug)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".formula-tooltip-heading p", {
  margin: "var(--space-075) 0 0",
  color: "var(--text-soft)",
  fontSize: "var(--text-meta)",
  lineHeight: "var(--leading-body)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".formula-tooltip-heading .formula-tooltip-example", {
  color: "var(--text-strong)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".formula-dialog-close", {
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
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".formula-dialog-close:hover", {
  color: "var(--text-strong)",
  background: "var(--surface-soft)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".formula-dialog-close:focus-visible", {
  outline: "var(--line-medium) solid var(--focus-ring)",
  outlineOffset: "var(--line-medium)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".formula-dialog-scroll", {
  minHeight: "0",
  overflow: "hidden auto",
  overscrollBehavior: "contain",
  padding: "var(--space-3) var(--space-2)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".formula-dialog-content", {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      width: "min(var(--size-42), calc(100vw - var(--space-5)))",
      maxHeight: "min(90dvh, var(--size-46))",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".formula-tooltip-heading", {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      marginInline: "var(--space-3)",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".formula-dialog-scroll", {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      paddingInline: "var(--space-3)",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
