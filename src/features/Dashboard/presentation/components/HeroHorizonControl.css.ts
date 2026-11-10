import { globalStyle, style } from "@vanilla-extract/css";
import { rangeLabels } from "./DashboardPrimitives.css.ts";
import { heroInflationControls } from "./HeroCard.css.ts";

export const heroHorizon = style({
  position: "relative",
  zIndex: "var(--layer-content)",
  display: "grid",
  gridTemplateRows: "auto auto auto",
  alignContent: "start",
  rowGap: "0",
  minWidth: "0",
});

globalStyle(heroInflationControls, {
  display: "grid",
  gridTemplateRows: "auto auto auto",
  alignContent: "start",
  rowGap: "0",
  minWidth: "0",
});

export const horizonLabel = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "var(--space-3)",
  marginBottom: "var(--space-2)",
  color: "var(--hero-muted)",
});

globalStyle(`${heroHorizon} ${horizonLabel}`, {
  minHeight: "var(--space-5)",
  margin: "0 0 var(--space-1)",
});

globalStyle(`${heroHorizon} > ${rangeLabels}`, {
  minHeight: "var(--space-3)",
  margin: "0",
});

export const heroSliderWrap = style({
  position: "relative",
  paddingBottom: "var(--space-5)",
});

export const heroSliderTooltip = style({
  position: "absolute",
  top: "var(--space-55)",
  transform: "translateX(-50%)",
  padding: "var(--space-05) var(--space-2)",
  border: "var(--line-thin) solid var(--hero-accent)",
  borderRadius: "var(--space-075)",
  background: "var(--hero-accent)",
  color: "var(--hero-bg)",
  fontSize: "var(--text-meta)",
  fontWeight: "var(--font-weight-semibold)",
  lineHeight: "var(--leading-none)",
  whiteSpace: "nowrap",
  pointerEvents: "none",
  boxShadow:
    "0 var(--space-05) var(--space-2)\n    color-mix(in srgb, var(--shadow-ink) var(--mix-12), transparent)",
});

globalStyle(`${heroSliderTooltip}::before`, {
  content: '""',
  position: "absolute",
  top: "calc(-1 * var(--space-05))",
  left: "50%",
  width: "var(--space-1)",
  height: "var(--space-1)",
  borderTop: "var(--line-thin) solid var(--hero-accent)",
  borderLeft: "var(--line-thin) solid var(--hero-accent)",
  background: "var(--hero-accent)",
  transform: "translateX(-50%) rotate(45deg)",
});

globalStyle(`${heroSliderTooltip}.is-start`, {
  transform: "translateX(calc(-1 * var(--space-1)))",
});

globalStyle(`${heroSliderTooltip}.is-start::before`, {
  left: "var(--space-075)",
  transform: "rotate(45deg)",
});

globalStyle(`${heroSliderTooltip}.is-end`, {
  transform: "translateX(calc(-100% + var(--space-1)))",
});

globalStyle(`${heroSliderTooltip}.is-end::before`, {
  right: "var(--space-075)",
  left: "auto",
  transform: "rotate(45deg)",
});
