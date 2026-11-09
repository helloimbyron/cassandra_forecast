import { globalStyle } from "@vanilla-extract/css";

globalStyle(".metric-value-row", {
  display: "flex",
  alignItems: "center",
  gap: "var(--space-075)",
  minWidth: "0",
  marginTop: "var(--space-2)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".metric-card .metric-value-row strong", {
  marginTop: "0",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".metric-card,\n.panel-card,\n.investment-card", {
  border: "var(--line-thin) solid var(--border-subtle)",
  borderRadius: "var(--radius-card)",
  boxShadow: "var(--shadow-card)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".metric-label", {
  display: "flex",
  alignItems: "flex-start",
  flexWrap: "nowrap",
  gap: "var(--space-1)",
  color: "var(--text-soft)",
  fontSize: "var(--text-meta)",
  fontWeight: "var(--font-weight-medium)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".metric-label-icon", {
  display: "inline-flex",
  flex: "none",
  marginTop: "var(--space-025)",
  color: "var(--primary)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".metric-label-text", {
  minWidth: "0",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".metric-card strong", {
  display: "block",
  marginTop: "var(--space-2)",
  color: "var(--text-strong)",
  fontSize: "var(--text-xl)",
  fontWeight: "var(--font-weight-semibold)",
  letterSpacing: "var(--tracking-subtle)",
  overflowWrap: "anywhere",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".metric-card strong.metric-positive", {
  color: "var(--primary)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".metrics-grid .metric-card strong.metric-positive", {
  color: "var(--text-strong)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".metric-card small", {
  display: "block",
  marginTop: "var(--space-05)",
  color: "var(--text-soft)",
  fontSize: "var(--text-meta)",
} as unknown as Parameters<typeof globalStyle>[1]);
