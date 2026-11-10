import { globalStyle, style } from "@vanilla-extract/css";

globalStyle('.topbar.has-projection-controls [data-slot="slider-track"]', {
  background: "var(--hero-track)",
});

globalStyle('.topbar.has-projection-controls [data-slot="slider-range"]', {
  background: "var(--hero-accent)",
});

globalStyle('.topbar.has-projection-controls [data-slot="slider-thumb"]', {
  borderColor: "var(--hero-text)",
  background: "var(--hero-text)",
});

export const sliderRoot = style({
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
});

export const sliderTrackRoot = style({
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
});

export const sliderRangeRoot = style({
  "@layer": {
    components: {
      position: "absolute",
      height: "100%",
      background: "var(--primary)",
    },
  },
});

export const sliderThumbRoot = style({
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
});

globalStyle(`${sliderThumbRoot}:active`, {
  "@layer": {
    components: {
      cursor: "grabbing",
    },
  },
});

globalStyle(`.hero-horizon .hero-slider-wrap ${sliderRoot}`, {
  minHeight: "var(--space-525)",
});

globalStyle(`.hero-inflation-controls .inflation-slider-wrap ${sliderRoot}`, {
  minHeight: "var(--space-525)",
});

globalStyle(`.hero-card ${sliderTrackRoot}`, {
  background: "var(--hero-track)",
});

globalStyle(`.hero-card ${sliderRangeRoot}`, {
  background: "var(--hero-accent)",
});

globalStyle(`.hero-card ${sliderThumbRoot}`, {
  background: "var(--hero-text)",
  borderColor: "var(--hero-text)",
});

globalStyle(`.distribution-control ${sliderTrackRoot}`, {
  background: "var(--input)",
});

globalStyle(`.distribution-control ${sliderRangeRoot}`, {
  background: "var(--primary)",
});

globalStyle(`.distribution-control ${sliderThumbRoot}`, {
  borderColor: "var(--primary)",
  background: "var(--card)",
});

globalStyle(`.slider-block > ${sliderRoot}`, {
  minHeight: "var(--space-525)",
});

globalStyle(`.investment-card ${sliderTrackRoot}`, {
  background: "var(--input)",
});

globalStyle(`.investment-card ${sliderRangeRoot}`, {
  background: "var(--primary)",
});

globalStyle(`.investment-card ${sliderThumbRoot}`, {
  background: "var(--card)",
  border: "var(--line-medium) solid var(--primary)",
});
