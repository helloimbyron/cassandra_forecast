import { globalStyle } from "@vanilla-extract/css";
import { breakpoints } from "@/design-system/styles/breakpoints.build";

globalStyle(".footer", {
  width: "calc(100% - var(--space-5))",
  flexWrap: "wrap",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".footer", {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      flexWrap: "nowrap",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".footer", {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      width: "min(var(--content-width), calc(100% - var(--space-6)))",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
