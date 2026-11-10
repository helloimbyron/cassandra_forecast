import { globalStyle, style } from "@vanilla-extract/css";
import { breakpoints } from "@/design-system/styles/breakpoints.build";

export const stickyControlsViewport = style({
  flex: "1 1 auto",
  display: "flex",
  justifyContent: "safe center",
  minWidth: "0",
  overflow: "auto visible",
  scrollbarWidth: "none",
  paddingBlock: "var(--space-2)",
  marginBlock: "calc(-1 * var(--space-2))",
});

globalStyle(`${stickyControlsViewport}::-webkit-scrollbar`, {
  display: "none",
});

export const stickyProjectionControls = style({
  display: "flex",
  alignItems: "center",
  gap: "var(--space-4)",
  margin: "0",
  width: "max-content",
  minWidth: "max-content",
});

export const stickyHorizonControl = style({
  display: "grid",
  gap: "var(--space-075)",
  flex: "0 0 var(--size-12)",
  width: "var(--size-12)",
});

export const stickyInflationControls = style({
  flex: "none",
  gridTemplateColumns: "auto var(--size-12)",
  gap: "var(--space-2)",
});

globalStyle(`${stickyInflationControls} .distribution-mode-toggle`, {
  borderColor: "color-mix(in srgb, var(--hero-text) var(--mix-20), transparent)",
  background: "color-mix(in srgb, var(--hero-text) var(--mix-08), transparent)",
});

globalStyle(`${stickyInflationControls} .distribution-mode-toggle button`, {
  color: "var(--hero-muted)",
});

globalStyle(`${stickyInflationControls} .distribution-mode-toggle button[aria-pressed="true"]`, {
  color: "var(--hero-bg)",
  background: "color-mix(in srgb, var(--hero-text) var(--mix-92), var(--hero-accent))",
  boxShadow:
    "0 var(--line-thin) var(--line-focus)\n    color-mix(in srgb, var(--shadow-ink) var(--mix-20), transparent)",
});

globalStyle(
  `${stickyInflationControls} .distribution-mode-toggle:has(button:not([aria-pressed="true"]):hover)`,
  {
    background: "color-mix(in srgb, var(--hero-text) var(--mix-20), transparent)",
  },
);

globalStyle(
  `${stickyInflationControls} .distribution-mode-toggle button:not([aria-pressed="true"]):hover`,
  {
    color: "var(--hero-text)",
  },
);

globalStyle(`${stickyInflationControls} .inflation-slider-control`, {
  width: "var(--size-12)",
});

export const stickyControlLabel = style({
  display: "flex",
  justifyContent: "space-between",
  gap: "var(--space-2)",
  color: "var(--text-muted)",
  fontSize: "var(--text-meta)",
  lineHeight: "var(--leading-tight)",
});

globalStyle(`${stickyControlLabel} strong`, {
  color: "var(--text-strong)",
  whiteSpace: "nowrap",
});

globalStyle(stickyProjectionControls, {
  gap: "var(--space-2)",
});

globalStyle(stickyProjectionControls, {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      gap: "var(--space-3)",
    },
  },
});

globalStyle(stickyProjectionControls, {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      gap: "var(--space-4)",
    },
  },
});

globalStyle(stickyControlsViewport, {
  alignItems: "center",
});

globalStyle(stickyControlsViewport, {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      alignItems: "stretch",
    },
  },
});
