import { globalStyle } from "@vanilla-extract/css";

globalStyle(".series-toggle", {
  display: "inline-flex",
  alignItems: "center",
  gap: "var(--space-1)",
  maxWidth: "100%",
  minHeight: "var(--space-525)",
  padding: "var(--space-075) var(--space-2)",
  border: "var(--line-thin) solid var(--border-subtle)",
  borderRadius: "var(--radius-full)",
  background: "var(--card)",
  color: "var(--foreground)",
  fontSize: "var(--text-meta)",
  lineHeight: "var(--leading-snug)",
  cursor: "pointer",
  transition:
    "border-color var(--motion-fast) ease,\n    background-color var(--motion-fast) ease,\n    color var(--motion-fast) ease,\n    opacity var(--motion-fast) ease",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".series-toggle:hover", {
  borderColor: "var(--input)",
  background: "var(--background)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".series-toggle:focus-within", {
  outline: "var(--line-medium) solid var(--focus-ring)",
  outlineOffset: "var(--line-medium)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".series-toggle input", {
  width: "var(--space-3)",
  height: "var(--space-3)",
  flex: "none",
  margin: "0",
  accentColor: "var(--primary)",
  cursor: "pointer",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".series-toggle span", {
  minWidth: "0",
  overflowWrap: "anywhere",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".series-toggle-swatch,\n.allocation-name i", {
  display: "inline-block",
  width: "var(--space-2)",
  height: "var(--space-2)",
  flex: "none",
  borderRadius: "50%",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".series-toggle-swatch.is-line", {
  width: "var(--space-3)",
  height: "var(--space-2)",
  position: "relative",
  borderTop: "0",
  borderRadius: "0",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".series-toggle-swatch.is-line::after", {
  position: "absolute",
  top: "50%",
  right: "0",
  left: "0",
  borderTop: "var(--line-medium) solid",
  borderTopColor: "inherit",
  content: '""',
  transform: "translateY(-50%)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".series-toggle-swatch.is-dashed", {
  borderTopStyle: "dashed",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".series-toggle-swatch.is-dashed::after", {
  borderTopStyle: "dashed",
} as unknown as Parameters<typeof globalStyle>[1]);
