import { globalStyle } from "@vanilla-extract/css";
import { breakpoints } from "@/design-system/styles/breakpoints.build";

globalStyle(".holding-row", {
  padding: "var(--space-3) 0",
  borderTop: "var(--line-thin) solid var(--border-subtle)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".holding-row:last-child", {
  borderBottom: "0",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".holding-cell", {
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  gap: "var(--space-05)",
  color: "var(--text-soft)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".holding-cell strong", {
  color: "var(--text-strong)",
  fontWeight: "var(--font-weight-semibold)",
  overflowWrap: "anywhere",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".holding-position strong", {
  color: "var(--foreground)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".holding-cell-label", {
  display: "none",
  color: "var(--text-soft)",
  fontSize: "var(--text-meta)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".holding-projection-value", {
  display: "flex",
  alignItems: "center",
  gap: "var(--space-075)",
  minWidth: "0",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".holding-projection-value > strong", {
  minWidth: "0",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".holding-projection-value .abbreviated-value", {
  whiteSpace: "nowrap",
  overflowWrap: "normal",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".holding-contribution", {
  alignItems: "end",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".holding-row", {
  gridTemplateColumns: "minmax(0, 1fr)",
  gap: "var(--space-3)",
  alignItems: "stretch",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".holding-cell", {
  display: "grid",
  gridTemplateColumns: "minmax(var(--size-7), 0.8fr) minmax(0, 1fr)",
  alignItems: "center",
  gap: "var(--space-2)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".holding-cell-label", {
  display: "block",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".holding-contribution", {
  alignItems: "center",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".holding-position strong", {
  overflowWrap: "anywhere",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".holding-row", {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      gridTemplateColumns:
        "minmax(0, 1.15fr) minmax(0, 0.85fr) minmax(var(--size-7-5), 0.95fr)\n      minmax(0, 0.9fr) minmax(0, 1fr)",
      gap: "var(--space-2)",
      alignItems: "center",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".holding-cell", {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      display: "flex",
      gridTemplateColumns: "none",
      alignItems: "start",
      gap: "var(--space-05)",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".holding-cell-label", {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      display: "none",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".holding-contribution", {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      alignItems: "end",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".holding-position strong", {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      overflowWrap: "normal",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
