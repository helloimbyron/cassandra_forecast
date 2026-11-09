import { globalStyle } from "@vanilla-extract/css";
import { breakpoints } from "@/design-system/styles/breakpoints.build";

globalStyle(".import-section", {
  width: "min(100%, var(--size-58))",
  marginInline: "auto",
  padding: "0 0 var(--space-7)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".import-card", {
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
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".import-card.is-dragging", {
  background: "var(--surface-tint)",
  borderColor: "var(--primary)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".import-actions", {
  width: "min(100%, var(--size-32))",
  display: "flex",
  justifyContent: "center",
  gap: "var(--space-3)",
  marginInline: "auto",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".import-actions button", {
  minHeight: "var(--control-height)",
  flex: "1",
  maxWidth: "var(--size-15)",
  gap: "var(--space-1)",
  paddingInline: "var(--space-35)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".sample-link", {
  display: "inline-flex",
  alignItems: "center",
  gap: "var(--space-1)",
  minHeight: "var(--space-5)",
  color: "var(--primary)",
  fontSize: "var(--text-meta)",
  textDecoration: "underline",
  textUnderlineOffset: "var(--underline-offset)",
  fontWeight: "var(--font-weight-medium)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".import-meta", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexWrap: "wrap",
  gap: "var(--space-2) var(--space-3)",
  marginTop: "var(--space-1)",
  borderTop: "var(--line-thin) solid var(--border-subtle)",
  paddingTop: "var(--space-2)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".sample-link:hover", {
  color: "var(--accent-foreground)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".drop-hint", {
  color: "var(--text-soft)",
  fontSize: "var(--text-meta)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".error-message", {
  margin: "var(--space-3) 0 0",
  color: "var(--destructive)",
  fontSize: "var(--text-body)",
  fontWeight: "var(--font-weight-semibold)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".import-card > .error-message", {
  textAlign: "center",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".import-card", {
  minHeight: "var(--size-13)",
  padding: "var(--space-5) var(--space-4)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".import-actions", {
  alignItems: "stretch",
  flexDirection: "column",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".import-actions button", {
  width: "100%",
  maxWidth: "none",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".import-meta", {
  flexDirection: "column",
  gap: "var(--space-1)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".import-card", {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      minHeight: "var(--size-14)",
      padding: "var(--space-6) var(--space-5)",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".import-actions", {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      flexDirection: "row",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".import-actions button", {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      width: "auto",
      maxWidth: "var(--size-15)",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".import-meta", {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      flexDirection: "row",
      gap: "var(--space-2) var(--space-3)",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
