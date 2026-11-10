import { globalStyle, style } from "@vanilla-extract/css";
import { breakpoints } from "@/design-system/styles/breakpoints.build";

export const footer = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "var(--space-3)",
  minHeight: "var(--size-5)",
  paddingBlock: "var(--space-3)",
  borderTop: "var(--line-thin) solid var(--border-subtle)",
  color: "var(--text-soft)",
  fontSize: "var(--text-meta)",
});

globalStyle(`${footer} > span:first-child`, {
  color: "var(--text-strong)",
  fontWeight: "var(--font-weight-bold)",
  letterSpacing: "var(--tracking-wider)",
});

globalStyle(`${footer} a`, {
  textDecoration: "underline",
  textUnderlineOffset: "var(--underline-offset)",
});

globalStyle(footer, {
  width: "calc(100% - var(--space-5))",
  flexWrap: "wrap",
});

globalStyle(footer, {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      flexWrap: "nowrap",
    },
  },
});

globalStyle(footer, {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      width: "min(var(--content-width), calc(100% - var(--space-6)))",
    },
  },
});
