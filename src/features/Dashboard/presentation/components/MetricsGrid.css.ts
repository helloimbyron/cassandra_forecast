import { globalStyle, style } from "@vanilla-extract/css";
import { breakpoints } from "@/design-system/styles/breakpoints.build";

export const metricsGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  gap: "var(--space-3)",
  margin: "var(--space-4) 0 var(--space-5)",
});

globalStyle(`${metricsGrid} > .metric-card:nth-child(1)`, {
  order: "2",
});

globalStyle(`${metricsGrid} > .metric-card:nth-child(2)`, {
  order: "3",
});

globalStyle(`${metricsGrid} > .metric-card:nth-child(3)`, {
  order: "1",
});

globalStyle(`${metricsGrid} > .metric-card:nth-child(4)`, {
  order: "4",
});

globalStyle(metricsGrid, {
  gridTemplateColumns: "1fr",
});

globalStyle(metricsGrid, {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    },
  },
});

globalStyle(metricsGrid, {
  "@media": {
    ["(width >= " + breakpoints.wide + ")"]: {
      gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    },
  },
});
