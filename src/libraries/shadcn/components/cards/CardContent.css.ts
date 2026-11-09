import { globalStyle } from "@vanilla-extract/css";
import { breakpoints } from "@/design-system/styles/breakpoints.build";

globalStyle('.metric-card > [data-slot="card-content"]', {
  padding: "var(--space-4)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle('.chart-panel [data-slot="card-content"]', {
  padding: "0 var(--space-4) var(--space-4)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle('.allocation-panel [data-slot="card-content"]', {
  padding: "0 var(--space-4) var(--space-4)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle('.distribution-panel [data-slot="card-content"]', {
  padding: "0 var(--space-4) var(--space-4)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle('.table-section .panel-card > [data-slot="card-content"]', {
  paddingBlock: "var(--space-4)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle('.allocation-panel [data-slot="card-content"]', {
  display: "block",
  gridTemplateColumns: "minmax(0, var(--size-18)) minmax(0, 1fr)",
  alignItems: "center",
  gap: "var(--space-4)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle('.allocation-panel [data-slot="card-content"]', {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      display: "grid",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle('.allocation-panel [data-slot="card-content"]', {
  "@media": {
    ["(width >= " + breakpoints.wide + ")"]: {
      display: "block",
      gridTemplateColumns: "none",
      alignItems: "stretch",
      gap: "0",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
