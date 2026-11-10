import { globalStyle, style, styleVariants } from "@vanilla-extract/css";

export const seriesToggle = style({
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
});

globalStyle(`${seriesToggle}:hover`, {
  borderColor: "var(--input)",
  background: "var(--background)",
});

globalStyle(`${seriesToggle}:focus-within`, {
  outline: "var(--line-medium) solid var(--focus-ring)",
  outlineOffset: "var(--line-medium)",
});

globalStyle(`${seriesToggle} input`, {
  width: "var(--space-3)",
  height: "var(--space-3)",
  flex: "none",
  margin: "0",
  accentColor: "var(--primary)",
  cursor: "pointer",
});

globalStyle(`${seriesToggle} span`, {
  minWidth: "0",
  overflowWrap: "anywhere",
});

export const swatch = style({
  display: "inline-block",
  width: "var(--space-2)",
  height: "var(--space-2)",
  flex: "none",
  borderRadius: "50%",
});

export const swatchType = styleVariants({
  dot: {},
  line: {
    width: "var(--space-3)",
    height: "var(--space-2)",
    position: "relative",
    borderTop: "0",
    borderRadius: "0",
  },
});

globalStyle(`${swatchType.line}::after`, {
  position: "absolute",
  top: "50%",
  right: "0",
  left: "0",
  borderTop: "var(--line-medium) solid",
  borderTopColor: "inherit",
  content: '""',
  transform: "translateY(-50%)",
});

export const dashedLine = style({
  borderTopStyle: "dashed",
});

globalStyle(`${dashedLine}::after`, {
  borderTopStyle: "dashed",
});
