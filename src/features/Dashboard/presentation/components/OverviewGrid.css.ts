import { globalStyle, style } from "@vanilla-extract/css";
import { breakpoints } from "@/design-system/styles/breakpoints.build";

export const overviewGrid = style({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1.55fr) minmax(0, 1fr)",
  gap: "var(--space-4)",
});

globalStyle(overviewGrid, {
  gridTemplateColumns: "1fr",
});

globalStyle(overviewGrid, {
  "@media": {
    ["(width >= " + breakpoints.wide + ")"]: {
      gridTemplateColumns: "minmax(0, 1.55fr) minmax(0, 1fr)",
    },
  },
});
