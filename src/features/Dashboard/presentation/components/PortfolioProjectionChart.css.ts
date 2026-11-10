import { style } from "@vanilla-extract/css";

export const seriesLegendDivider = style({
  width: "100%",
  flex: "0 0 100%",
  height: "0",
  margin: "var(--space-05) 0",
  border: "0",
  borderTop: "var(--line-thin) solid var(--border-subtle)",
});
