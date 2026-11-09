import { globalStyle } from "@vanilla-extract/css";

globalStyle(".hero-horizon,\n.hero-inflation-controls", {
  display: "grid",
  gridTemplateRows: "auto auto auto",
  alignContent: "start",
  rowGap: "0",
  minWidth: "0",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-horizon .horizon-label", {
  minHeight: "var(--space-5)",
  margin: "0 0 var(--space-1)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-horizon > .range-labels", {
  minHeight: "var(--space-3)",
  margin: "0",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".horizon-label,\n.slider-heading", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "var(--space-3)",
  marginBottom: "var(--space-2)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".horizon-label", {
  color: "var(--hero-muted)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".hero-slider-wrap", {
  position: "relative",
  paddingBottom: "var(--space-5)",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle(".hero-slider-tooltip", {
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
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle(".hero-slider-tooltip::before", {
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
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle(".hero-slider-tooltip.is-start", {
  transform: "translateX(calc(-1 * var(--space-1)))",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle(".hero-slider-tooltip.is-start::before", {
  left: "var(--space-075)",
  transform: "rotate(45deg)",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle(".hero-slider-tooltip.is-end", {
  transform: "translateX(calc(-100% + var(--space-1)))",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle(".hero-slider-tooltip.is-end::before", {
  right: "var(--space-075)",
  left: "auto",
  transform: "rotate(45deg)",
} as unknown as Parameters<typeof globalStyle>[1]);
