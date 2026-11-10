import { globalStyle, style, styleVariants } from "@vanilla-extract/css";
import { breakpoints } from "@/design-system/styles/breakpoints.build";

export const inflationControls = style({
  display: "grid",
  gap: "var(--space-1)",
  minWidth: "0",
});

export const inflationControlsLayout = styleVariants({
  card: {},
  inline: {
    gridTemplateColumns: "auto minmax(0, 1fr)",
    alignItems: "center",
    gap: "var(--space-3)",
  },
});

export const inflationControlsHeading = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "var(--space-2)",
});

export const inflationSliderControl = style({
  display: "grid",
  gap: "var(--space-075)",
  minWidth: "0",
});

export const inflationSliderWrap = style({
  position: "relative",
  minWidth: "0",
});

globalStyle(`${inflationControlsLayout.card} ${inflationSliderWrap}`, {
  paddingBottom: "var(--space-5)",
});

export const inflationSliderTooltip = style({
  top: "var(--space-55)",
});

globalStyle(`${inflationControlsLayout.inline} ${inflationControlsHeading}`, {
  justifyContent: "flex-start",
});

globalStyle(`${inflationControlsLayout.inline} ${inflationSliderControl}`, {
  gap: "var(--space-05)",
});

export const inflationSliderHeading = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "var(--space-2)",
  color: "var(--text-muted)",
  fontSize: "var(--text-meta)",
  lineHeight: "var(--leading-tight)",
});

globalStyle(`${inflationSliderHeading} strong`, {
  color: "var(--text-strong)",
  whiteSpace: "nowrap",
});

globalStyle(`${inflationControlsLayout.inline} ${inflationSliderHeading} strong`, {
  gridColumn: "1",
  gridRow: "1",
});

globalStyle(`${inflationControlsLayout.inline} ${inflationSliderWrap}`, {
  gridColumn: "2",
  gridRow: "1",
});

globalStyle(`${inflationControlsLayout.inline} ${inflationSliderHeading} strong`, {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      gridColumn: "auto",
      gridRow: "auto",
    },
  },
});

globalStyle(`${inflationControlsLayout.inline} ${inflationSliderWrap}`, {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      gridColumn: "auto",
      gridRow: "auto",
    },
  },
});
