import { globalStyle } from "@vanilla-extract/css";
import { breakpoints } from "@/design-system/styles/breakpoints.build";

globalStyle(".dashboard-heading", {
  position: "relative",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "end",
  flexWrap: "wrap",
  gap: "var(--space-3)",
  padding: "var(--space-6) 0 var(--space-4)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".dashboard-error", {
  flexBasis: "100%",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".dashboard-heading", {
  paddingTop: "var(--space-5)",
  alignItems: "start",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".dashboard-heading", {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      alignItems: "end",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".dashboard-heading", {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      paddingTop: "var(--space-6)",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
