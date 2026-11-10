import { style } from "@vanilla-extract/css";

export const cardDescriptionRoot = style({
  "@layer": {
    components: {
      color: "var(--muted-foreground)",
      fontSize: "var(--text-meta)",
      lineHeight: "var(--leading-body)",
    },
  },
});
