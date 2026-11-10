import { globalStyle, style, styleVariants } from "@vanilla-extract/css";
import { breakpoints } from "@/design-system/styles/breakpoints.build";
import { errorMessage } from "@/shared/presentation/styles/feedback.css";

export const importSection = style({
  width: "min(100%, var(--size-58))",
  marginInline: "auto",
  padding: "0 0 var(--space-7)",
});

export const importCard = style({
  minHeight: "var(--size-14)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "var(--space-3)",
  padding: "var(--space-6) var(--space-5)",
  border: "var(--line-medium) dashed var(--input)",
  borderRadius: "var(--radius-card)",
  background: "var(--surface-raised)",
  boxShadow: "var(--shadow-card)",
  textAlign: "center",
  transition: "background var(--motion-slow),\n    border-color var(--motion-slow)",
});

export const importCardState = styleVariants({
  idle: {},
  dragging: {
    background: "var(--surface-tint)",
    borderColor: "var(--primary)",
  },
});

export const importActions = style({
  width: "min(100%, var(--size-32))",
  display: "flex",
  justifyContent: "center",
  gap: "var(--space-3)",
  marginInline: "auto",
});

globalStyle(`${importActions} button`, {
  minHeight: "var(--control-height)",
  flex: "1",
  maxWidth: "var(--size-15)",
  gap: "var(--space-1)",
  paddingInline: "var(--space-35)",
});

export const sampleLink = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "var(--space-1)",
  minHeight: "var(--space-5)",
  color: "var(--primary)",
  fontSize: "var(--text-meta)",
  textDecoration: "underline",
  textUnderlineOffset: "var(--underline-offset)",
  fontWeight: "var(--font-weight-medium)",
});

export const importMeta = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexWrap: "wrap",
  gap: "var(--space-2) var(--space-3)",
  marginTop: "var(--space-1)",
  borderTop: "var(--line-thin) solid var(--border-subtle)",
  paddingTop: "var(--space-2)",
});

globalStyle(`${sampleLink}:hover`, {
  color: "var(--accent-foreground)",
});

globalStyle(`${importCard} > ${errorMessage}`, {
  textAlign: "center",
});

globalStyle(importCard, {
  minHeight: "var(--size-13)",
  padding: "var(--space-5) var(--space-4)",
});

globalStyle(importActions, {
  alignItems: "stretch",
  flexDirection: "column",
});

globalStyle(`${importActions} button`, {
  width: "100%",
  maxWidth: "none",
});

globalStyle(importMeta, {
  flexDirection: "column",
  gap: "var(--space-1)",
});

globalStyle(importCard, {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      minHeight: "var(--size-14)",
      padding: "var(--space-6) var(--space-5)",
    },
  },
});

globalStyle(importActions, {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      flexDirection: "row",
    },
  },
});

globalStyle(`${importActions} button`, {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      width: "auto",
      maxWidth: "var(--size-15)",
    },
  },
});

globalStyle(importMeta, {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      flexDirection: "row",
      gap: "var(--space-2) var(--space-3)",
    },
  },
});
