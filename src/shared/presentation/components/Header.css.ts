import { globalStyle, style } from "@vanilla-extract/css";
import { breakpoints } from "@/design-system/styles/breakpoints.build";
import { appShell } from "@/app/bootstrap/App.css.ts";

export const brand = style({
  display: "inline-flex",
  alignItems: "center",
  minWidth: "0",
  gap: "var(--space-2)",
  flex: "0 1 auto",
  color: "var(--text-strong)",
  fontSize: "var(--text-body)",
  fontWeight: "var(--font-weight-bold)",
  letterSpacing: "var(--tracking-wider)",
  textDecoration: "none",
});

globalStyle(`${brand} > span:last-child`, {
  minWidth: "0",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const topbar = style({
  position: "sticky",
  top: "0",
  zIndex: "var(--layer-sticky)",
  minHeight: "var(--size-5)",
  display: "flex",
  alignItems: "center",
  gap: "var(--space-3)",
  padding: "var(--space-2) max(var(--space-4), calc((100vw - var(--content-width)) / 2))",
  borderBottom: "var(--line-thin) solid var(--border-subtle)",
  background: "var(--surface-raised)",
  boxShadow:
    "0 var(--space-075) var(--space-3)\n    color-mix(in srgb, var(--foreground) var(--mix-08), transparent)",
});

globalStyle(`${appShell}:has(${topbar}.has-projection-controls)`, {
  paddingBottom: "calc(var(--size-6) + var(--space-4))",
});

globalStyle(`${topbar}.has-projection-controls`, {
  position: "fixed",
  inset: "auto auto max(var(--space-3), env(safe-area-inset-bottom)) 50%",
  zIndex: "var(--layer-floating)",
  width: "min(calc(100% - var(--space-5)), var(--content-width))",
  minHeight: "0",
  padding: "var(--space-2) var(--space-3)",
  transform: "translateX(-50%)",
  border: "var(--line-thin) solid color-mix(in srgb, var(--hero-text) var(--mix-20), transparent)",
  borderRadius: "var(--space-35)",
  background: "var(--hero-bg)",
  boxShadow:
    "0 var(--space-2) var(--space-5)\n    color-mix(in srgb, var(--shadow-ink) var(--mix-32), transparent)",
  transition:
    "background-color var(--motion-base) ease,\n    border-color var(--motion-base) ease,\n    box-shadow var(--motion-base) ease",
});

globalStyle(`${topbar}.has-projection-controls .brand-group`, {
  flex: "none",
});

globalStyle(`${topbar}.has-projection-controls .brand > span:last-child`, {
  display: "none",
});

export const brandGroup = style({
  display: "flex",
  alignItems: "center",
  gap: "var(--space-45)",
  flex: "1 1 auto",
  minWidth: "0",
});

export const brandMark = style({
  width: "var(--brand-mark-size)",
  height: "var(--brand-mark-size)",
  display: "grid",
  placeItems: "center",
  flex: "none",
  borderRadius: "var(--space-2)",
  color: "var(--primary-foreground)",
  background: "var(--primary)",
});

globalStyle(
  `${topbar}.has-projection-controls .sticky-control-label,
${topbar}.has-projection-controls .inflation-slider-heading`,
  {
    color: "var(--hero-muted)",
  },
);

globalStyle(
  `${topbar}.has-projection-controls .sticky-control-label strong,
${topbar}.has-projection-controls .inflation-slider-heading strong`,
  {
    color: "var(--hero-text)",
  },
);

export const topbarActions = style({
  display: "flex",
  alignItems: "center",
  flex: "none",
  gap: "var(--space-2)",
});

globalStyle(`${topbar}.has-projection-controls ${topbarActions}`, {
  marginLeft: "var(--space-05)",
  paddingLeft: "var(--space-3)",
  borderLeft:
    "var(--line-thin) solid\n    color-mix(in srgb, var(--hero-text) var(--mix-20), transparent)",
});

export const changeJsonToggle = style({
  minWidth: "var(--space-575)",
  minHeight: "var(--control-height)",
  color: "inherit",
});

globalStyle(
  `${changeJsonToggle} svg,
.theme-toggle svg`,
  {
    width: "var(--space-3)",
    height: "var(--space-3)",
  },
);

globalStyle(
  `${topbar}.has-projection-controls .theme-toggle,
${topbar}.has-projection-controls ${changeJsonToggle}`,
  {
    borderColor: "color-mix(in srgb, var(--hero-text) var(--mix-32), transparent)",
    color: "var(--hero-text)",
    background: "color-mix(in srgb, var(--hero-text) var(--mix-08), transparent)",
  },
);

globalStyle(topbar, {
  paddingInline: "var(--space-3)",
  minHeight: "var(--size-4-5)",
});

globalStyle(topbar, {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      minHeight: "var(--size-5)",
    },
  },
});

globalStyle(topbar, {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      paddingInline: "max(var(--space-4), calc((100vw - var(--content-width)) / 2))",
    },
  },
});
