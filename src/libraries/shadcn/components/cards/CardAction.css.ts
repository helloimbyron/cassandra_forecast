import { style } from "@vanilla-extract/css";

export const cardActionRoot = style({
  "@layer": {
    components: {
      gridColumn: "2",
      gridRow: "1 / span 2",
      justifySelf: "end",
    },
  },
});
