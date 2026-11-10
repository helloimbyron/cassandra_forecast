import { globalStyle, style } from "@vanilla-extract/css";
import { breakpoints } from "@/design-system/styles/breakpoints.build";

export const introSection = style({
  padding: "var(--space-7) 0 var(--space-5)",
});

export const introGrid = style({
  minHeight: "0",
});

export const introContent = style({
  width: "100%",
  textAlign: "center",
});

export const introCopy = style({
  maxWidth: "var(--size-42)",
  margin: "0 auto",
  color: "var(--text-soft)",
  fontSize: "var(--text-card-title)",
  lineHeight: "var(--leading-body)",
});

export const introOrbit = style({
  position: "relative",
  width: "var(--size-13)",
  maxWidth: "100%",
  height: "var(--size-8-5)",
  display: "grid",
  placeItems: "center",
  margin: "0 auto var(--space-3)",
});

export const orbit = style({
  position: "absolute",
  top: "50%",
  left: "50%",
  border: "var(--line-thin) solid var(--border)",
  borderRadius: "50%",
});

export const orbitOne = style({
  width: "var(--size-10-5)",
  height: "var(--size-6-25)",
  transform: "translate(-50%, -50%) rotate(-25deg)",
});

export const orbitTwo = style({
  width: "var(--size-12-5)",
  height: "var(--size-7-5)",
  transform: "translate(-50%, -50%) rotate(35deg)",
});

export const orbitCore = style({
  position: "relative",
  zIndex: "var(--layer-content)",
  width: "var(--space-65)",
  height: "var(--space-65)",
  display: "grid",
  placeItems: "center",
  borderRadius: "var(--space-3)",
  color: "var(--primary)",
  background: "var(--surface-tint)",
  boxShadow: "var(--shadow-card)",
});

globalStyle(introSection, {
  paddingBlock: "var(--space-6) var(--space-3)",
});

globalStyle(introOrbit, {
  width: "var(--size-11)",
  height: "var(--size-7)",
});

globalStyle(orbitOne, {
  width: "var(--size-8-5)",
  height: "var(--size-5)",
});

globalStyle(orbitTwo, {
  width: "var(--size-10-5)",
  height: "var(--size-6-25)",
});

globalStyle(orbitCore, {
  width: "var(--space-6)",
  height: "var(--space-6)",
});

globalStyle(introSection, {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      paddingBlock: "var(--space-7) var(--space-5)",
    },
  },
});

globalStyle(introOrbit, {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      width: "var(--size-13)",
      height: "var(--size-8-5)",
    },
  },
});

globalStyle(orbitOne, {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      width: "var(--size-10-5)",
      height: "var(--size-6-25)",
    },
  },
});

globalStyle(orbitTwo, {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      width: "var(--size-12-5)",
      height: "var(--size-7-5)",
    },
  },
});

globalStyle(orbitCore, {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      width: "var(--space-65)",
      height: "var(--space-65)",
    },
  },
});
