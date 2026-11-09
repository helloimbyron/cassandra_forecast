import { globalStyle } from "@vanilla-extract/css";
import { breakpoints } from "@/design-system/styles/breakpoints.build";

globalStyle(".app-shell:has(.topbar.has-projection-controls)", {
  paddingBottom: "calc(var(--size-6) + var(--space-4))",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".topbar", {
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
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".topbar.has-projection-controls", {
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
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".topbar.has-projection-controls .brand-group", {
  flex: "none",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".topbar.has-projection-controls .brand > span:last-child", {
  display: "none",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".brand-group", {
  display: "flex",
  alignItems: "center",
  gap: "var(--space-45)",
  flex: "1 1 auto",
  minWidth: "0",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".brand-mark", {
  width: "var(--brand-mark-size)",
  height: "var(--brand-mark-size)",
  display: "grid",
  placeItems: "center",
  flex: "none",
  borderRadius: "var(--space-2)",
  color: "var(--primary-foreground)",
  background: "var(--primary)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(
  ".topbar.has-projection-controls .sticky-control-label,\n.topbar.has-projection-controls .inflation-slider-heading",
  {
    color: "var(--hero-muted)",
  } as unknown as Parameters<typeof globalStyle>[1],
);
globalStyle(
  ".topbar.has-projection-controls .sticky-control-label strong,\n.topbar.has-projection-controls .inflation-slider-heading strong",
  {
    color: "var(--hero-text)",
  } as unknown as Parameters<typeof globalStyle>[1],
);
globalStyle(".topbar-actions", {
  display: "flex",
  alignItems: "center",
  flex: "none",
  gap: "var(--space-2)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".topbar.has-projection-controls .topbar-actions", {
  marginLeft: "var(--space-05)",
  paddingLeft: "var(--space-3)",
  borderLeft:
    "var(--line-thin) solid\n    color-mix(in srgb, var(--hero-text) var(--mix-20), transparent)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".change-json-toggle", {
  minWidth: "var(--space-575)",
  minHeight: "var(--control-height)",
  color: "inherit",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".change-json-toggle svg,\n.theme-toggle svg", {
  width: "var(--space-3)",
  height: "var(--space-3)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(
  ".topbar.has-projection-controls .theme-toggle,\n.topbar.has-projection-controls .change-json-toggle",
  {
    borderColor: "color-mix(in srgb, var(--hero-text) var(--mix-32), transparent)",
    color: "var(--hero-text)",
    background: "color-mix(in srgb, var(--hero-text) var(--mix-08), transparent)",
  } as unknown as Parameters<typeof globalStyle>[1],
);
globalStyle(".topbar", {
  paddingInline: "var(--space-3)",
  minHeight: "var(--size-4-5)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".topbar", {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      minHeight: "var(--size-5)",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".topbar", {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      paddingInline: "max(var(--space-4), calc((100vw - var(--content-width)) / 2))",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
