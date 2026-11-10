import { globalStyle, style } from "@vanilla-extract/css";
import { breakpoints } from "@/design-system/styles/breakpoints.build";

export const holdingRow = style({
  padding: "var(--space-3) 0",
  borderTop: "var(--line-thin) solid var(--border-subtle)",
});

globalStyle(`${holdingRow}:last-child`, {
  borderBottom: "0",
});

export const holdingCell = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  gap: "var(--space-05)",
  color: "var(--text-soft)",
});

export const holdingPosition = style({});

globalStyle(`${holdingCell} strong`, {
  color: "var(--text-strong)",
  fontWeight: "var(--font-weight-semibold)",
  overflowWrap: "anywhere",
});

globalStyle(`${holdingPosition} strong`, {
  color: "var(--foreground)",
});

export const holdingCellLabel = style({
  display: "none",
  color: "var(--text-soft)",
  fontSize: "var(--text-meta)",
});

export const holdingProjectionValue = style({
  display: "flex",
  alignItems: "center",
  gap: "var(--space-075)",
  minWidth: "0",
});

globalStyle(`${holdingProjectionValue} > strong`, {
  minWidth: "0",
});

globalStyle(`${holdingProjectionValue} .abbreviated-value`, {
  whiteSpace: "nowrap",
  overflowWrap: "normal",
});

export const holdingContribution = style({
  alignItems: "end",
});

globalStyle(holdingRow, {
  gridTemplateColumns: "minmax(0, 1fr)",
  gap: "var(--space-3)",
  alignItems: "stretch",
});

globalStyle(holdingCell, {
  display: "grid",
  gridTemplateColumns: "minmax(var(--size-7), 0.8fr) minmax(0, 1fr)",
  alignItems: "center",
  gap: "var(--space-2)",
});

globalStyle(holdingCellLabel, {
  display: "block",
});

globalStyle(holdingContribution, {
  alignItems: "center",
});

globalStyle(`${holdingPosition} strong`, {
  overflowWrap: "anywhere",
});

globalStyle(holdingRow, {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      gridTemplateColumns:
        "minmax(0, 1.15fr) minmax(0, 0.85fr) minmax(var(--size-7-5), 0.95fr)\n      minmax(0, 0.9fr) minmax(0, 1fr)",
      gap: "var(--space-2)",
      alignItems: "center",
    },
  },
});

globalStyle(holdingCell, {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      display: "flex",
      gridTemplateColumns: "none",
      alignItems: "start",
      gap: "var(--space-05)",
    },
  },
});

globalStyle(holdingCellLabel, {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      display: "none",
    },
  },
});

globalStyle(holdingContribution, {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      alignItems: "end",
    },
  },
});

globalStyle(`${holdingPosition} strong`, {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      overflowWrap: "normal",
    },
  },
});
