import { style } from "@vanilla-extract/css";

export const cardTitleRoot = style({
  "@layer": {
    components: {
      fontSize: "var(--text-card-title)",
      fontWeight: "var(--font-weight-semibold)",
      lineHeight: "var(--leading-tight)",
    },
  },
});
