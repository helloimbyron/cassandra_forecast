import { globalStyle, style } from "@vanilla-extract/css";
import { breakpoints } from "@/design-system/styles/breakpoints.build";

export const tableSection = style({
  paddingBottom: "var(--space-5)",
});

globalStyle(`${tableSection} .table-section-heading`, {
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: "var(--space-3)",
});

export const tableControls = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  width: "100%",
  flexWrap: "wrap",
  gap: "var(--space-2)",
});

export const tableColumnPicker = style({
  position: "relative",
});

globalStyle(`${tableColumnPicker} > summary`, {
  display: "inline-flex",
  alignItems: "center",
  gap: "var(--space-1)",
  minHeight: "var(--control-height)",
  padding: "var(--space-075) var(--space-2)",
  border: "var(--line-thin) solid var(--border-subtle)",
  borderRadius: "var(--space-2)",
  background: "var(--card)",
  color: "var(--text-soft)",
  fontSize: "var(--text-meta)",
  fontWeight: "var(--font-weight-medium)",
  cursor: "pointer",
  listStyle: "none",
});

globalStyle(`${tableColumnPicker} > summary::-webkit-details-marker`, {
  display: "none",
});

globalStyle(
  `${tableColumnPicker} > summary:hover,
${tableColumnPicker}[open] > summary`,
  {
    borderColor: "var(--input)",
    background: "var(--surface-soft)",
    color: "var(--text-strong)",
  },
);

globalStyle(`${tableColumnPicker} > summary:focus-visible`, {
  outline: "var(--line-medium) solid var(--focus-ring)",
  outlineOffset: "var(--line-medium)",
});

globalStyle(`${tableColumnPicker} > summary > span`, {
  display: "flex",
  alignItems: "baseline",
  gap: "var(--space-075)",
});

globalStyle(`${tableColumnPicker} > summary small`, {
  color: "var(--text-soft)",
  fontSize: "var(--text-meta)",
  fontWeight: "var(--font-weight-regular)",
});

export const tableColumnOptions = style({
  position: "absolute",
  zIndex: "var(--layer-foreground)",
  top: "calc(100% + var(--space-075))",
  right: "auto",
  left: "0",
  display: "grid",
  gap: "var(--space-025)",
  width: "min(var(--size-19), calc(100vw - var(--space-5)))",
  maxHeight: "min(var(--size-18), var(--dialog-max-height))",
  overflowY: "auto",
  padding: "var(--space-075)",
  border: "var(--line-thin) solid var(--border-subtle)",
  borderRadius: "var(--space-2)",
  background: "var(--popover)",
  boxShadow: "var(--shadow-card)",
});

export const tableColumnOption = style({
  display: "flex",
  alignItems: "center",
  gap: "var(--space-2)",
  minHeight: "var(--control-height)",
  padding: "var(--space-075) var(--space-1)",
  borderRadius: "var(--space-1)",
  color: "var(--text-strong)",
  fontSize: "var(--text-meta)",
  lineHeight: "var(--leading-snug)",
  cursor: "pointer",
});

globalStyle(`${tableColumnOption}:hover`, {
  background: "var(--surface-soft)",
});

globalStyle(`${tableColumnOption}:focus-within`, {
  outline: "var(--line-medium) solid var(--focus-ring)",
  outlineOffset: "calc(-1 * var(--line-medium))",
});

globalStyle(`${tableColumnOption} input`, {
  width: "var(--space-3)",
  height: "var(--space-3)",
  flex: "none",
  margin: "0",
  accentColor: "var(--primary)",
});

globalStyle(`${tableColumnOption} span`, {
  minWidth: "0",
  overflowWrap: "anywhere",
});

export const tableScroll = style({
  maxWidth: "100%",
  overflowX: "auto",
});

globalStyle(`${tableSection} table`, {
  borderCollapse: "separate",
  borderSpacing: "0",
  tableLayout: "fixed",
});

globalStyle(
  `${tableSection} th,
${tableSection} td`,
  {
    textAlign: "left",
  },
);

globalStyle(`${tableSection} thead th`, {
  paddingBlock: "var(--space-2)",
  verticalAlign: "middle",
  color: "var(--text-soft)",
  background: "var(--surface-soft)",
  borderBottom: "var(--line-thin) solid var(--border-subtle)",
  fontSize: "var(--text-meta)",
  fontWeight: "var(--font-weight-medium)",
  letterSpacing: "normal",
  textTransform: "none",
});

globalStyle(
  `${tableSection} th:first-child,
${tableSection} td:first-child`,
  {
    position: "sticky",
    left: "0",
    zIndex: "var(--layer-content)",
    paddingLeft: "var(--space-4)",
    background: "var(--card)",
  },
);

globalStyle(`${tableSection} thead th:first-child`, {
  zIndex: "var(--layer-raised)",
  background: "var(--surface-soft)",
});

globalStyle(`${tableSection} .table-year`, {
  color: "var(--text-strong)",
  fontWeight: "var(--font-weight-medium)",
});

globalStyle(`${tableSection} th.table-investment-heading`, {
  whiteSpace: "normal",
  overflowWrap: "break-word",
  wordBreak: "normal",
  lineHeight: "var(--leading-snug)",
  verticalAlign: "middle",
});

globalStyle(`${tableSection} td`, {
  fontVariantNumeric: "tabular-nums",
});

globalStyle(`${tableSection} .abbreviated-value`, {
  whiteSpace: "nowrap",
  overflowWrap: "normal",
});

globalStyle(
  `${tableSection} .table-total-heading,
${tableSection} .table-total`,
  {
    borderLeft: "var(--line-thin) solid var(--border-subtle)",
    paddingLeft: "var(--space-4)",
  },
);

globalStyle(`${tableSection} .table-total-heading`, {
  color: "var(--text-strong)",
});

globalStyle(`${tableSection} .table-total`, {
  color: "var(--primary)",
  fontWeight: "var(--font-weight-bold)",
});

globalStyle(
  `${tableSection} tbody tr:hover th,
${tableSection} tbody tr:hover td`,
  {
    background: "var(--surface-soft)",
  },
);

globalStyle(
  `${tableSection} tbody tr.table-final-row th,
${tableSection} tbody tr.table-final-row td`,
  {
    background: "var(--surface-soft)",
    borderTop: "var(--line-thin) solid var(--border-subtle)",
    color: "var(--text-strong)",
    fontWeight: "var(--font-weight-semibold)",
  },
);

globalStyle(`${tableSection} tbody tr.table-final-row td.table-total`, {
  color: "var(--primary)",
  fontWeight: "var(--font-weight-bold)",
});

globalStyle(
  `${tableSection} tbody tr:last-child th,
${tableSection} tbody tr:last-child td`,
  {
    borderBottom: "0",
  },
);

globalStyle(`${tableSection} .table-section-heading`, {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      flexDirection: "row",
      alignItems: "center",
    },
  },
});

globalStyle(tableControls, {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      justifyContent: "flex-end",
      width: "auto",
    },
  },
});

globalStyle(tableColumnOptions, {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      right: "0",
      left: "auto",
    },
  },
});
