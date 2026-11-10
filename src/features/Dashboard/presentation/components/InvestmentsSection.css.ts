import { globalStyle, style } from "@vanilla-extract/css";
import { breakpoints } from "@/design-system/styles/breakpoints.build";

export const investmentsSection = style({
  padding: "var(--space-7) 0 var(--space-5)",
});

export const investmentGrid = style({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "var(--space-4)",
});

globalStyle(investmentGrid, {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    },
  },
});
