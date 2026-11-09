import { globalStyle } from "@vanilla-extract/css";

globalStyle('[data-slot="card-action"]', {
  "@layer": {
    components: {
      gridColumn: "2",
      gridRow: "1 / span 2",
      justifySelf: "end",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
