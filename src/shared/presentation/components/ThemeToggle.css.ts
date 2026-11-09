import { globalStyle } from "@vanilla-extract/css";

globalStyle(".theme-toggle", {
  minHeight: "var(--control-height)",
  minWidth: "var(--space-575)",
  paddingInline: "var(--space-2)",
  fontSize: "var(--text-meta)",
} as unknown as Parameters<typeof globalStyle>[1]);
