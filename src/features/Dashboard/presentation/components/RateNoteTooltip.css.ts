import { style } from "@vanilla-extract/css";

export const rateNoteTooltipContent = style({
  zIndex: "var(--layer-dialog)",
  maxWidth: "min(var(--fluid-max-width), var(--size-34))",
  padding: "var(--space-1) var(--space-2)",
  border: "var(--line-thin) solid var(--input)",
  borderRadius: "var(--space-1)",
  color: "var(--popover-foreground)",
  background: "var(--popover)",
  boxShadow: "var(--shadow-card)",
  fontSize: "var(--text-meta)",
  lineHeight: "var(--leading-body)",
  overflowWrap: "anywhere",
});

export const rateNoteTooltipTrigger = style({
  cursor: "help",
});

export const rateNoteQuestionMark = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "var(--icon-xs)",
  height: "var(--icon-xs)",
  fontSize: "var(--text-meta)",
  fontWeight: "var(--font-weight-semibold)",
  lineHeight: "var(--leading-none)",
});
