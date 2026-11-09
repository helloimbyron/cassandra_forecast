import { globalStyle } from "@vanilla-extract/css";

globalStyle('.topbar.has-projection-controls [data-slot="slider-track"]', {
  background: "var(--hero-track)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle('.topbar.has-projection-controls [data-slot="slider-range"]', {
  background: "var(--hero-accent)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle('.topbar.has-projection-controls [data-slot="slider-thumb"]', {
  borderColor: "var(--hero-text)",
  background: "var(--hero-text)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle('[data-slot="slider"]', {
  "@layer": {
    components: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      width: "100%",
      minHeight: "var(--control-height)",
      touchAction: "none",
      userSelect: "none",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle('[data-slot="slider-track"]', {
  "@layer": {
    components: {
      position: "relative",
      flex: "1",
      height: "var(--slider-track-size)",
      overflow: "hidden",
      borderRadius: "var(--radius-full)",
      background: "var(--muted)",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle('[data-slot="slider-range"]', {
  "@layer": {
    components: {
      position: "absolute",
      height: "100%",
      background: "var(--primary)",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle('[data-slot="slider-thumb"]', {
  "@layer": {
    components: {
      position: "relative",
      display: "block",
      width: "var(--slider-thumb-size)",
      height: "var(--slider-thumb-size)",
      flexShrink: "0",
      border: "var(--line-medium) solid var(--ring)",
      borderRadius: "var(--radius-full)",
      background: "var(--card)",
      cursor: "grab",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle('[data-slot="slider-thumb"]:active', {
  "@layer": {
    components: {
      cursor: "grabbing",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle('.hero-horizon .hero-slider-wrap [data-slot="slider"]', {
  minHeight: "var(--space-525)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle('.hero-inflation-controls .inflation-slider-wrap [data-slot="slider"]', {
  minHeight: "var(--space-525)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle('.hero-card [data-slot="slider-track"]', {
  background: "var(--hero-track)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle('.hero-card [data-slot="slider-range"]', {
  background: "var(--hero-accent)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle('.hero-card [data-slot="slider-thumb"]', {
  background: "var(--hero-text)",
  borderColor: "var(--hero-text)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle('.distribution-control [data-slot="slider-track"]', {
  background: "var(--input)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle('.distribution-control [data-slot="slider-range"]', {
  background: "var(--primary)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle('.distribution-control [data-slot="slider-thumb"]', {
  borderColor: "var(--primary)",
  background: "var(--card)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle('.slider-block > [data-slot="slider"]', {
  minHeight: "var(--space-525)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle('.investment-card [data-slot="slider-track"]', {
  background: "var(--input)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle('.investment-card [data-slot="slider-range"]', {
  background: "var(--primary)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle('.investment-card [data-slot="slider-thumb"]', {
  background: "var(--card)",
  border: "var(--line-medium) solid var(--primary)",
} as unknown as Parameters<typeof globalStyle>[1]);
