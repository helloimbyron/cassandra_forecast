import { globalStyle } from "@vanilla-extract/css";
import { breakpoints } from "@/design-system/styles/breakpoints.build";

globalStyle(".intro-section", {
  padding: "var(--space-7) 0 var(--space-5)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".intro-grid", {
  minHeight: "0",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".intro-content", {
  width: "100%",
  textAlign: "center",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".intro-copy", {
  maxWidth: "var(--size-42)",
  margin: "0 auto",
  color: "var(--text-soft)",
  fontSize: "var(--text-card-title)",
  lineHeight: "var(--leading-body)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".intro-orbit", {
  position: "relative",
  width: "var(--size-13)",
  maxWidth: "100%",
  height: "var(--size-8-5)",
  display: "grid",
  placeItems: "center",
  margin: "0 auto var(--space-3)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".orbit", {
  position: "absolute",
  top: "50%",
  left: "50%",
  border: "var(--line-thin) solid var(--border)",
  borderRadius: "50%",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".orbit-one", {
  width: "var(--size-10-5)",
  height: "var(--size-6-25)",
  transform: "translate(-50%, -50%) rotate(-25deg)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".orbit-two", {
  width: "var(--size-12-5)",
  height: "var(--size-7-5)",
  transform: "translate(-50%, -50%) rotate(35deg)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".orbit-core", {
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
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".intro-section", {
  paddingBlock: "var(--space-6) var(--space-3)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".intro-orbit", {
  width: "var(--size-11)",
  height: "var(--size-7)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".orbit-one", {
  width: "var(--size-8-5)",
  height: "var(--size-5)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".orbit-two", {
  width: "var(--size-10-5)",
  height: "var(--size-6-25)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".orbit-core", {
  width: "var(--space-6)",
  height: "var(--space-6)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".intro-section", {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      paddingBlock: "var(--space-7) var(--space-5)",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".intro-orbit", {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      width: "var(--size-13)",
      height: "var(--size-8-5)",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".orbit-one", {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      width: "var(--size-10-5)",
      height: "var(--size-6-25)",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".orbit-two", {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      width: "var(--size-12-5)",
      height: "var(--size-7-5)",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".orbit-core", {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      width: "var(--space-65)",
      height: "var(--space-65)",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
