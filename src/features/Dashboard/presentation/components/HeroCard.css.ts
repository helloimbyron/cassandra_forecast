import { globalStyle } from "@vanilla-extract/css";
import { breakpoints } from "@/design-system/styles/breakpoints.build";

globalStyle(".hero-card", {
  position: "relative",
  overflow: "hidden",
  padding: "var(--space-5)",
  paddingBottom: "calc(var(--space-5) + var(--space-2) + var(--space-075))",
  borderRadius: "var(--radius-card)",
  color: "var(--hero-text)",
  background: "var(--hero-gradient)",
  boxShadow:
    "var(--shadow-card),\n    inset 0 0 0 var(--line-thin) color-mix(in srgb, var(--hero-text) var(--mix-20), transparent)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-card::after", {
  content: '""',
  position: "absolute",
  width: "var(--size-24)",
  height: "var(--size-24)",
  right: "var(--hero-orbit-offset)",
  top: "calc(-1 * var(--size-19))",
  border: "var(--line-thin) solid color-mix(in srgb, var(--hero-text) var(--mix-20), transparent)",
  borderRadius: "50%",
  boxShadow:
    "0 0 0 var(--space-55) color-mix(in srgb, var(--hero-text) var(--mix-04), transparent),\n    0 0 0 var(--size-5) color-mix(in srgb, var(--hero-text) var(--mix-04), transparent)",
  pointerEvents: "none",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-main,\n.hero-horizon", {
  position: "relative",
  zIndex: "var(--layer-content)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-main", {
  display: "grid",
  gridTemplateColumns:
    "minmax(var(--size-12), 1.4fr)\n    minmax(var(--size-7), 0.8fr)\n    minmax(var(--size-8), 0.9fr)\n    minmax(var(--size-18), 1.8fr)\n    minmax(var(--size-16), 1.7fr)",
  alignItems: "stretch",
  columnGap: "var(--space-3)",
  padding: "0 0 var(--space-5)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-main-without-inflation", {
  gridTemplateColumns:
    "minmax(var(--size-12), 1.5fr)\n    minmax(var(--size-8), 1fr)\n    minmax(var(--size-16-5), 2fr)\n    minmax(var(--size-15), 1.8fr)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-main-without-inflation .hero-contributions-values", {
  gridTemplateColumns: "minmax(0, 1fr)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-total", {
  minWidth: "0",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-main-with-inflation .hero-total", {
  paddingRight: "var(--space-3)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-total h3", {
  marginBottom: "0",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-value-label", {
  display: "flex",
  alignItems: "center",
  gap: "var(--space-1)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-value-label p", {
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "var(--space-2)",
  margin: "0",
  color: "var(--hero-muted)",
  fontSize: "var(--text-meta)",
  lineHeight: "var(--leading-tight)",
  whiteSpace: "nowrap",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-value-secondary", {
  minWidth: "0",
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  gap: "0",
  alignSelf: "stretch",
  paddingTop: "0",
  color: "var(--hero-muted)",
  fontSize: "var(--text-meta)",
  lineHeight: "var(--leading-tight)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-value-secondary strong", {
  color: "var(--hero-text)",
  fontSize: "var(--text-stat)",
  fontWeight: "var(--font-weight-semibold)",
  overflowWrap: "anywhere",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-grid-subtitle", {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  flexWrap: "nowrap",
  gap: "var(--space-075)",
  minWidth: "max-content",
  whiteSpace: "nowrap",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-grid-value", {
  display: "flex",
  alignItems: "center",
  gap: "var(--space-075)",
  minWidth: "0",
  minHeight: "var(--space-4)",
  whiteSpace: "nowrap",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-comparison-info-trigger", {
  color: "var(--hero-muted)",
  opacity: "var(--emphasis-opacity)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-comparison-info-trigger:hover", {
  color: "var(--hero-text)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-comparison-info-copy", {
  display: "grid",
  gap: "var(--space-3)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-comparison-info-copy p", {
  margin: "0",
  color: "var(--text-soft)",
  lineHeight: "var(--leading-body)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-main h3", {
  margin: "0 0 var(--space-1)",
  fontSize: "var(--text-total)",
  fontWeight: "var(--font-weight-semibold)",
  letterSpacing: "var(--tracking-tighter)",
  lineHeight: "var(--leading-tight)",
  overflowWrap: "anywhere",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-card .formula-tooltip-trigger", {
  color: "var(--hero-accent)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-value-secondary > span", {
  display: "flex",
  alignItems: "center",
  alignSelf: "stretch",
  minHeight: "var(--space-525)",
  color: "var(--hero-muted)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-current-stat", {
  paddingTop: "0",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(
  ".hero-current-stat .hero-balance-value,\n.hero-contributions-stat .hero-balance-value",
  {
    alignItems: "flex-start",
    textAlign: "left",
  } as unknown as Parameters<typeof globalStyle>[1],
);
globalStyle(
  ".hero-current-stat .hero-balance-value span,\n.hero-contributions-stat .hero-balance-value span",
  {
    justifyContent: "flex-start",
    textAlign: "left",
  } as unknown as Parameters<typeof globalStyle>[1],
);
globalStyle(".hero-contributions-stat,\n.hero-growth-stat", {
  paddingLeft: "var(--space-3)",
  borderLeft: "var(--line-thin) solid var(--hero-track)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-contributions-values", {
  display: "grid",
  gridTemplateColumns: "minmax(var(--size-9), 1.15fr) minmax(var(--size-7), 1fr)",
  alignSelf: "stretch",
  width: "100%",
  gap: "var(--space-2)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-breakdown-heading", {
  alignSelf: "stretch",
  display: "flex",
  alignItems: "center",
  gap: "var(--space-075)",
  minHeight: "var(--space-525)",
  margin: "0",
  color: "var(--hero-muted)",
  fontSize: "var(--text-meta)",
  fontWeight: "var(--font-weight-semibold)",
  letterSpacing: "var(--tracking-wide)",
  textAlign: "left",
  textTransform: "uppercase",
  whiteSpace: "nowrap",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-breakdown-heading-spacer", {
  visibility: "hidden",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-breakdown-heading .hero-contributions-info-trigger", {
  marginLeft: "0",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-balance-value", {
  minWidth: "0",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  gap: "var(--space-075)",
  color: "var(--hero-muted)",
  fontSize: "var(--text-meta)",
  textAlign: "left",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-side-stat", {
  minWidth: "0",
  padding: "0",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "var(--space-075)",
  color: "var(--hero-muted)",
  fontSize: "var(--text-meta)",
  textAlign: "left",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-side-stat span", {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  flexWrap: "wrap",
  gap: "var(--space-075)",
  minHeight: "var(--space-525)",
  lineHeight: "var(--leading-tight)",
  textAlign: "left",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-side-stat .hero-grid-subtitle", {
  flexWrap: "nowrap",
  whiteSpace: "nowrap",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-side-stat span svg,\n.hero-result-label svg", {
  flex: "none",
  color: "var(--hero-accent)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-side-stat strong", {
  color: "var(--hero-text)",
  fontSize: "var(--text-stat)",
  fontWeight: "var(--font-weight-semibold)",
  overflowWrap: "anywhere",
  textAlign: "left",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-growth-values", {
  display: "grid",
  gridTemplateColumns: "minmax(var(--size-6), 1fr) minmax(var(--size-6), 1fr)",
  justifyContent: "center",
  alignSelf: "stretch",
  alignItems: "center",
  width: "100%",
  gap: "var(--space-2)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-result-metric", {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "var(--space-075)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-result-label", {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  flexWrap: "nowrap",
  gap: "var(--space-05)",
  color: "var(--hero-muted)",
  fontSize: "var(--text-meta)",
  fontWeight: "var(--font-weight-regular)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-result-value", {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: "var(--space-075)",
  minWidth: "0",
  minHeight: "var(--space-4)",
  color: "var(--hero-text)",
  fontSize: "var(--text-stat)",
  fontWeight: "var(--font-weight-semibold)",
  whiteSpace: "nowrap",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-controls-grid", {
  position: "relative",
  zIndex: "var(--layer-content)",
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  alignItems: "stretch",
  gap: "var(--space-5)",
  paddingTop: "var(--space-4)",
  borderTop:
    "var(--line-thin) solid color-mix(in srgb, var(--hero-text) var(--mix-80), transparent)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-inflation-controls .inflation-controls-heading", {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) auto auto auto",
  alignItems: "center",
  justifyContent: "initial",
  gap: "var(--space-2)",
  height: "var(--space-5)",
  minHeight: "var(--space-5)",
  margin: "0 0 var(--space-1)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-inflation-controls .inflation-card-heading", {
  minWidth: "0",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-inflation-controls .inflation-slider-heading", {
  margin: "0",
  color: "var(--hero-muted)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-inflation-controls .inflation-slider-heading strong", {
  color: "var(--hero-text)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-inflation-controls .distribution-mode-toggle", {
  gridColumn: "2",
  gap: "var(--space-025)",
  padding: "var(--space-025)",
  borderColor: "color-mix(in srgb, var(--hero-text) var(--mix-20), transparent)",
  background: "color-mix(in srgb, var(--hero-text) var(--mix-08), transparent)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-inflation-controls .distribution-mode-toggle button", {
  minHeight: "var(--space-5)",
  padding: "0 var(--space-1)",
  borderRadius: "var(--radius-full)",
  color: "var(--hero-muted)",
  fontSize: "var(--text-meta)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle('.hero-inflation-controls .distribution-mode-toggle button[aria-pressed="true"]', {
  color: "var(--hero-bg)",
  background: "color-mix(in srgb, var(--hero-text) var(--mix-92), var(--hero-accent))",
  boxShadow:
    "0 var(--line-thin) var(--line-focus)\n    color-mix(in srgb, var(--shadow-ink) var(--mix-20), transparent)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(
  '.hero-inflation-controls .distribution-mode-toggle:has(button:not([aria-pressed="true"]):hover)',
  {
    background: "color-mix(in srgb, var(--hero-text) var(--mix-20), transparent)",
  } as unknown as Parameters<typeof globalStyle>[1],
);
globalStyle(
  '.hero-inflation-controls .distribution-mode-toggle button:not([aria-pressed="true"]):hover',
  {
    color: "var(--hero-text)",
  } as unknown as Parameters<typeof globalStyle>[1],
);
globalStyle(".hero-inflation-controls .inflation-source-icon", {
  gridColumn: "4",
  color: "var(--hero-muted)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-inflation-controls .inflation-slider-control", {
  display: "contents",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-inflation-controls .inflation-range-labels", {
  minHeight: "var(--space-3)",
  margin: "0",
  color: "var(--hero-muted)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-inflation-controls .inflation-source-icon:hover", {
  color: "var(--hero-text)",
  background: "color-mix(in srgb, var(--hero-text) var(--mix-12), transparent)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-controls-grid .inflation-slider-heading", {
  color: "var(--hero-muted)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-controls-grid .inflation-slider-heading strong", {
  color: "var(--hero-text)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-card .range-labels", {
  color: "var(--hero-muted)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-main,\n.hero-main-without-inflation", {
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  alignItems: "start",
  gap: "var(--space-3)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-total", {
  gridColumn: "1 / -1",
  paddingRight: "0",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-value-secondary,\n.hero-current-stat", {
  paddingTop: "0",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-value-secondary .hero-breakdown-heading-spacer", {
  display: "none",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-current-stat .hero-breakdown-heading-spacer", {
  display: "none",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-contributions-stat,\n.hero-growth-stat", {
  gridColumn: "1 / -1",
  marginTop: "0",
  padding: "var(--space-3) 0 0",
  borderTop: "var(--line-thin) solid var(--hero-track)",
  borderLeft: "0",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-main-without-inflation .hero-current-stat", {
  gridColumn: "1 / -1",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-side-stat", {
  padding: "0",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-contributions-values,\n.hero-growth-values", {
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  justifyContent: "stretch",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-controls-grid", {
  gridTemplateColumns: "minmax(0, 1fr)",
  gap: "var(--space-4)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-inflation-controls .inflation-controls-heading", {
  height: "auto",
  gridTemplateColumns: "minmax(0, 1fr) auto auto",
  gridTemplateRows: "auto auto",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-inflation-controls .inflation-card-heading", {
  gridColumn: "1 / -1",
  gridRow: "1",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-inflation-controls .distribution-mode-toggle", {
  gridColumn: "1",
  gridRow: "2",
  justifySelf: "start",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-inflation-controls .inflation-controls-heading > .formula-tooltip-trigger", {
  gridColumn: "2",
  gridRow: "2",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-inflation-controls .inflation-source-icon", {
  gridColumn: "3",
  gridRow: "2",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-card", {
  padding: "var(--space-4)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-main h3", {
  fontSize: "var(--text-total-mobile)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-inflation-controls .inflation-controls-heading", {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      gridTemplateColumns: "minmax(0, 1fr) auto auto auto",
      gridTemplateRows: "none",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-inflation-controls .inflation-card-heading", {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      gridColumn: "auto",
      gridRow: "auto",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-inflation-controls .distribution-mode-toggle", {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      gridColumn: "2",
      gridRow: "auto",
      justifySelf: "auto",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-inflation-controls .inflation-controls-heading > .formula-tooltip-trigger", {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      gridColumn: "auto",
      gridRow: "auto",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-inflation-controls .inflation-source-icon", {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      gridColumn: "4",
      gridRow: "auto",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-card", {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      padding: "var(--space-5)",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-main h3", {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      fontSize: "var(--text-total)",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-current-stat .hero-breakdown-heading-spacer", {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      display: "block",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-value-secondary .hero-breakdown-heading-spacer", {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      display: "block",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-main,\n  .hero-main-without-inflation", {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
      gridTemplateRows: "repeat(6, auto)",
      alignItems: "stretch",
      gap: "var(--space-025) var(--space-3)",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(
  ".hero-main > .hero-total,\n  .hero-main > .hero-value-secondary,\n  .hero-main > .hero-current-stat,\n  .hero-main > .hero-contributions-stat,\n  .hero-main > .hero-growth-stat",
  {
    "@media": {
      ["(width >= " + breakpoints.tablet + ")"]: {
        display: "grid",
        gridTemplateRows: "subgrid",
        alignContent: "stretch",
      },
    },
  } as unknown as Parameters<typeof globalStyle>[1],
);
globalStyle(".hero-total", {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      gridRow: "1 / span 3",
      gridColumn: "span 5",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-value-secondary", {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      rowGap: "var(--space-025)",
      gridRow: "1 / span 3",
      gridColumn: "span 3",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-current-stat", {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      gridRow: "1 / span 3",
      gridColumn: "span 4",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-main-without-inflation .hero-current-stat", {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      gridColumn: "span 7",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-contributions-stat,\n  .hero-growth-stat", {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      gridRow: "4 / span 3",
      gridColumn: "span 6",
      marginTop: "0",
      paddingTop: "var(--space-3)",
      borderTop: "var(--line-thin) solid var(--hero-track)",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-main-without-inflation .hero-contributions-stat", {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      gridColumn: "span 4",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-main-without-inflation .hero-growth-stat", {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      gridColumn: "span 8",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-contributions-stat", {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      borderLeft: "0",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-growth-stat", {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      paddingLeft: "var(--space-3)",
      borderLeft: "var(--line-thin) solid var(--hero-track)",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(
  ".hero-total .hero-value-label,\n  .hero-contributions-stat > .hero-breakdown-heading,\n  .hero-growth-stat > .hero-breakdown-heading",
  {
    "@media": {
      ["(width >= " + breakpoints.tablet + ")"]: {
        gridRow: "1",
      },
    },
  } as unknown as Parameters<typeof globalStyle>[1],
);
globalStyle(".hero-total h3", {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      gridRow: "2 / span 2",
      alignSelf: "end",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(
  ".hero-value-secondary .hero-breakdown-heading-spacer,\n  .hero-current-stat .hero-breakdown-heading-spacer",
  {
    "@media": {
      ["(width >= " + breakpoints.tablet + ")"]: {
        gridRow: "1",
      },
    },
  } as unknown as Parameters<typeof globalStyle>[1],
);
globalStyle(".hero-value-secondary > .hero-grid-subtitle", {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      gridRow: "2",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-value-secondary > .hero-grid-value", {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      gridRow: "3",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-current-stat .hero-balance-value > .hero-grid-subtitle", {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      gridRow: "1",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-current-stat .hero-balance-value > .hero-grid-value", {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      gridRow: "2",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-current-stat .hero-balance-value", {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      display: "grid",
      gridRow: "2 / span 2",
      gridTemplateRows: "subgrid",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-contributions-values,\n  .hero-growth-values", {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      gridRow: "2 / span 2",
      gridTemplateRows: "subgrid",
      gridTemplateColumns: "max-content max-content",
      gap: "var(--space-025) var(--space-5)",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(
  ".hero-contributions-values > .hero-balance-value,\n  .hero-growth-values > .hero-result-metric",
  {
    "@media": {
      ["(width >= " + breakpoints.tablet + ")"]: {
        display: "grid",
        gridRow: "span 2",
        gridTemplateRows: "subgrid",
      },
    },
  } as unknown as Parameters<typeof globalStyle>[1],
);
globalStyle(
  ".hero-contributions-values > .hero-balance-value > .hero-grid-subtitle,\n  .hero-growth-values > .hero-result-metric > .hero-grid-subtitle",
  {
    "@media": {
      ["(width >= " + breakpoints.tablet + ")"]: {
        gridRow: "1",
      },
    },
  } as unknown as Parameters<typeof globalStyle>[1],
);
globalStyle(
  ".hero-contributions-values > .hero-balance-value > .hero-grid-value,\n  .hero-growth-values > .hero-result-metric > .hero-grid-value",
  {
    "@media": {
      ["(width >= " + breakpoints.tablet + ")"]: {
        gridRow: "2",
      },
    },
  } as unknown as Parameters<typeof globalStyle>[1],
);
globalStyle(".hero-inflation-controls .inflation-controls-heading", {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      height: "var(--space-5)",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-controls-grid", {
  "@media": {
    ["(width >= " + breakpoints.wide + ")"]: {
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
      gap: "var(--space-5)",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-main,\n  .hero-main-without-inflation", {
  "@media": {
    ["(width >= " + breakpoints["extra-wide"] + ")"]: {
      gridTemplateRows: "repeat(3, auto)",
      rowGap: "var(--space-025)",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-main", {
  "@media": {
    ["(width >= " + breakpoints["extra-wide"] + ")"]: {
      gridTemplateColumns:
        "minmax(var(--size-12), 1.4fr)\n      minmax(var(--size-7), 0.8fr)\n      max-content\n      max-content\n      var(--size-18)",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-main-without-inflation", {
  "@media": {
    ["(width >= " + breakpoints["extra-wide"] + ")"]: {
      gridTemplateColumns:
        "minmax(var(--size-12), 1.5fr)\n      max-content\n      max-content\n      var(--size-18)",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-current-stat,\n  .hero-contributions-stat,\n  .hero-growth-stat", {
  "@media": {
    ["(width >= " + breakpoints["extra-wide"] + ")"]: {
      transform: "translate(var(--space-45), var(--space-2))",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(
  ".hero-main-without-inflation .hero-contributions-stat,\n  .hero-main-without-inflation .hero-growth-stat",
  {
    "@media": {
      ["(width >= " + breakpoints["extra-wide"] + ")"]: {
        gridColumn: "auto",
      },
    },
  } as unknown as Parameters<typeof globalStyle>[1],
);
globalStyle(
  ".hero-main > .hero-total,\n  .hero-main > .hero-value-secondary,\n  .hero-main > .hero-current-stat,\n  .hero-main > .hero-contributions-stat,\n  .hero-main > .hero-growth-stat",
  {
    "@media": {
      ["(width >= " + breakpoints["extra-wide"] + ")"]: {
        gridRow: "1 / span 3",
        gridColumn: "auto",
      },
    },
  } as unknown as Parameters<typeof globalStyle>[1],
);
globalStyle(".hero-total .hero-value-label", {
  "@media": {
    ["(width >= " + breakpoints["extra-wide"] + ")"]: {
      transform: "translateY(var(--space-2))",
      gridRow: "1",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-main-with-inflation > .hero-total", {
  "@media": {
    ["(width >= " + breakpoints["extra-wide"] + ")"]: {
      paddingRight: "var(--space-4)",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-value-secondary > .hero-grid-subtitle", {
  "@media": {
    ["(width >= " + breakpoints["extra-wide"] + ")"]: {
      transform: "translateY(var(--space-1))",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-main-with-inflation > .hero-value-secondary", {
  "@media": {
    ["(width >= " + breakpoints["extra-wide"] + ")"]: {
      justifySelf: "start",
      transform: "translate(calc(-1 * var(--space-55)), calc(-1 * var(--space-05)))",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(
  ".hero-current-stat .hero-balance-value,\n  .hero-contributions-values,\n  .hero-growth-values",
  {
    "@media": {
      ["(width >= " + breakpoints["extra-wide"] + ")"]: {
        transform: "translateY(calc(-1 * var(--space-2)))",
      },
    },
  } as unknown as Parameters<typeof globalStyle>[1],
);
globalStyle(".hero-main-with-inflation .hero-current-stat .hero-balance-value", {
  "@media": {
    ["(width >= " + breakpoints["extra-wide"] + ")"]: {
      justifySelf: "end",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-main-without-inflation .hero-current-stat .hero-balance-value", {
  "@media": {
    ["(width >= " + breakpoints["extra-wide"] + ")"]: {
      justifySelf: "end",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(
  ".hero-current-stat .hero-balance-value > .hero-grid-subtitle,\n  .hero-contributions-values > .hero-balance-value > .hero-grid-subtitle,\n  .hero-growth-values > .hero-result-metric > .hero-grid-subtitle",
  {
    "@media": {
      ["(width >= " + breakpoints["extra-wide"] + ")"]: {
        transform: "translateY(var(--space-05))",
      },
    },
  } as unknown as Parameters<typeof globalStyle>[1],
);
globalStyle(
  ".hero-value-secondary > .hero-grid-value,\n  .hero-current-stat .hero-balance-value > .hero-grid-value,\n  .hero-contributions-values > .hero-balance-value > .hero-grid-value,\n  .hero-growth-values > .hero-result-metric > .hero-grid-value",
  {
    "@media": {
      ["(width >= " + breakpoints["extra-wide"] + ")"]: {
        transform: "translateY(calc(-1 * var(--space-05)))",
      },
    },
  } as unknown as Parameters<typeof globalStyle>[1],
);
globalStyle(".hero-growth-values > .hero-result-metric:last-child > .hero-result-value", {
  "@media": {
    ["(width >= " + breakpoints["extra-wide"] + ")"]: {
      transform: "translateY(calc(-1 * var(--space-1)))",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-contributions-stat,\n  .hero-growth-stat", {
  "@media": {
    ["(width >= " + breakpoints["extra-wide"] + ")"]: {
      paddingTop: "0",
      paddingLeft: "var(--space-3)",
      borderTop: "0",
      borderLeft:
        "var(--line-thin) solid\n      color-mix(in srgb, var(--hero-text) var(--mix-80), transparent)",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
