import { globalStyle } from "@vanilla-extract/css";

globalStyle('[data-slot="separator"]', {
  "@layer": {
    components: {
      flexShrink: "0",
      background: "var(--border)",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle('[data-slot="separator"][data-orientation="horizontal"]', {
  "@layer": {
    components: {
      width: "100%",
      height: "var(--line-thin)",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle('[data-slot="separator"][data-orientation="vertical"]', {
  "@layer": {
    components: {
      width: "var(--line-thin)",
      alignSelf: "stretch",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
