import { globalStyle } from "@vanilla-extract/css";
import { breakpoints } from "@/design-system/styles/breakpoints.build";

globalStyle(".sticky-controls-viewport", {
  flex: "1 1 auto",
  display: "flex",
  justifyContent: "safe center",
  minWidth: "0",
  overflow: "auto visible",
  scrollbarWidth: "none",
  paddingBlock: "var(--space-2)",
  marginBlock: "calc(-1 * var(--space-2))",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".sticky-controls-viewport::-webkit-scrollbar", {
  display: "none",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".sticky-projection-controls", {
  display: "flex",
  alignItems: "center",
  gap: "var(--space-4)",
  margin: "0",
  width: "max-content",
  minWidth: "max-content",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".sticky-horizon-control", {
  display: "grid",
  gap: "var(--space-075)",
  flex: "0 0 var(--size-12)",
  width: "var(--size-12)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".sticky-inflation-controls .distribution-mode-toggle", {
  borderColor: "color-mix(in srgb, var(--hero-text) var(--mix-20), transparent)",
  background: "color-mix(in srgb, var(--hero-text) var(--mix-08), transparent)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".sticky-inflation-controls .distribution-mode-toggle button", {
  color: "var(--hero-muted)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle('.sticky-inflation-controls .distribution-mode-toggle button[aria-pressed="true"]', {
  color: "var(--hero-bg)",
  background: "color-mix(in srgb, var(--hero-text) var(--mix-92), var(--hero-accent))",
  boxShadow:
    "0 var(--line-thin) var(--line-focus)\n    color-mix(in srgb, var(--shadow-ink) var(--mix-20), transparent)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(
  '.sticky-inflation-controls .distribution-mode-toggle:has(button:not([aria-pressed="true"]):hover)',
  {
    background: "color-mix(in srgb, var(--hero-text) var(--mix-20), transparent)",
  } as unknown as Parameters<typeof globalStyle>[1],
);
globalStyle(
  '.sticky-inflation-controls .distribution-mode-toggle button:not([aria-pressed="true"]):hover',
  {
    color: "var(--hero-text)",
  } as unknown as Parameters<typeof globalStyle>[1],
);
globalStyle(".sticky-inflation-controls", {
  flex: "none",
  gridTemplateColumns: "auto var(--size-12)",
  gap: "var(--space-2)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".sticky-inflation-controls .inflation-slider-control", {
  width: "var(--size-12)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".sticky-control-label", {
  display: "flex",
  justifyContent: "space-between",
  gap: "var(--space-2)",
  color: "var(--text-muted)",
  fontSize: "var(--text-meta)",
  lineHeight: "var(--leading-tight)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".sticky-control-label strong", {
  color: "var(--text-strong)",
  whiteSpace: "nowrap",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".sticky-projection-controls", {
  gap: "var(--space-2)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".sticky-projection-controls", {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      gap: "var(--space-3)",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".sticky-projection-controls", {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      gap: "var(--space-4)",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".sticky-controls-viewport", {
  alignItems: "center",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".sticky-controls-viewport", {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      alignItems: "stretch",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
