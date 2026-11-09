import { globalStyle } from "@vanilla-extract/css";

globalStyle(".rate-note-tooltip-trigger", {
  cursor: "help",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".rate-note-question-mark", {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "var(--icon-xs)",
  height: "var(--icon-xs)",
  fontSize: "var(--text-meta)",
  fontWeight: "var(--font-weight-semibold)",
  lineHeight: "var(--leading-none)",
} as unknown as Parameters<typeof globalStyle>[1]);
