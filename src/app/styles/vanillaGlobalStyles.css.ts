import { globalStyle } from "@vanilla-extract/css";

import { breakpoints } from "@/design-system/styles/breakpoints.build";

globalStyle("*", {
  "@layer": {
    base: {
      boxSizing: "border-box",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle("html", {
  "@layer": {
    base: {
      fontFamily: "var(--font-body)",
      scrollBehavior: "smooth",
      fontSynthesis: "none",
      textRendering: "optimizelegibility",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle("body", {
  "@layer": {
    base: {
      margin: "0",
      background: "var(--background)",
      color: "var(--foreground)",
      fontSize: "var(--text-body)",
      lineHeight: "var(--leading-body)",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle("button,\n  input", {
  "@layer": {
    base: {
      font: "inherit",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle('button,\n  a,\n  input,\n  [role="slider"]', {
  "@layer": {
    base: {
      WebkitTapHighlightColor: "transparent",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle(
  'button:focus-visible,\n  a:focus-visible,\n  input:focus-visible,\n  [role="slider"]:focus-visible',
  {
    "@layer": {
      base: {
        outline: "var(--line-focus) solid var(--focus-ring)",
        outlineOffset: "var(--line-focus)",
      },
    },
  } as unknown as Parameters<typeof globalStyle>[1],
);

globalStyle("html,\n*", {
  scrollbarWidth: "thin",
  scrollbarColor: "var(--input) transparent",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle("html,\n  *", {
  "@supports": {
    "selector(::-webkit-scrollbar)": {
      scrollbarWidth: "auto",
      scrollbarColor: "auto",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle("html::-webkit-scrollbar,\n  *::-webkit-scrollbar", {
  "@supports": {
    "selector(::-webkit-scrollbar)": {
      width: "var(--scrollbar-size)",
      height: "var(--scrollbar-size)",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle("html::-webkit-scrollbar-button,\n  *::-webkit-scrollbar-button", {
  "@supports": {
    "selector(::-webkit-scrollbar)": {
      display: "none",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle("html::-webkit-scrollbar-track,\n  *::-webkit-scrollbar-track", {
  "@supports": {
    "selector(::-webkit-scrollbar)": {
      background: "transparent",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle("html::-webkit-scrollbar-thumb,\n  *::-webkit-scrollbar-thumb", {
  "@supports": {
    "selector(::-webkit-scrollbar)": {
      borderRadius: "var(--radius-full)",
      background: "var(--input)",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle("a", {
  color: "inherit",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle(".icon-sm", {
  width: "var(--icon-sm)",
  height: "var(--icon-sm)",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle(".icon-md", {
  width: "var(--icon-md)",
  height: "var(--icon-md)",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle("main,\n.footer", {
  width: "min(var(--content-width), calc(100% - var(--space-6)))",
  marginInline: "auto",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle(".brand", {
  display: "inline-flex",
  alignItems: "center",
  minWidth: "0",
  gap: "var(--space-2)",
  flex: "0 1 auto",
  color: "var(--text-strong)",
  fontSize: "var(--text-body)",
  fontWeight: "var(--font-weight-bold)",
  letterSpacing: "var(--tracking-wider)",
  textDecoration: "none",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle(".brand > span:last-child", {
  minWidth: "0",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle(".brand-symbol-arc,\n.brand-symbol-line", {
  stroke: "currentcolor",
  strokeWidth: "var(--brand-stroke)",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle(".brand-symbol-point", {
  fill: "var(--brand-dot)",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle(".inflation-controls", {
  display: "grid",
  gap: "var(--space-1)",
  minWidth: "0",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle(".inflation-controls-inline", {
  gridTemplateColumns: "auto minmax(0, 1fr)",
  alignItems: "center",
  gap: "var(--space-3)",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle(".eyebrow", {
  display: "flex",
  alignItems: "center",
  gap: "var(--space-2)",
  color: "var(--primary)",
  fontSize: "var(--text-meta)",
  fontWeight: "var(--font-weight-semibold)",
  letterSpacing: "normal",
  textTransform: "none",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle(".eyebrow-line", {
  flex: "none",
  display: "block",
  width: "var(--space-35)",
  height: "var(--line-medium)",
  background: "var(--brand-dot)",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle("h1", {
  margin: "0 auto var(--space-3)",
  color: "var(--text-strong)",
  fontSize: "var(--text-intro)",
  fontWeight: "var(--font-weight-semibold)",
  letterSpacing: "var(--tracking-tighter)",
  lineHeight: "var(--leading-tight)",
  overflowWrap: "anywhere",
  hyphens: "auto",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle("h1 em", {
  color: "var(--primary)",
  fontFamily: "var(--font-display)",
  fontWeight: "var(--font-weight-regular)",
  letterSpacing: "var(--tracking-tighter)",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle("h1", {
  fontSize: "var(--text-intro-mobile)",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle("h1", {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      fontSize: "var(--text-intro)",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle(".formula-tooltip-trigger", {
  display: "inline-flex",
  flex: "none",
  alignItems: "center",
  justifyContent: "center",
  width: "var(--space-35)",
  height: "var(--space-35)",
  minWidth: "var(--space-4)",
  minHeight: "var(--space-4)",
  margin: "0 0 0 var(--space-1)",
  padding: "0",
  border: "0",
  color: "var(--primary)",
  background: "transparent",
  font: "inherit",
  lineHeight: "inherit",
  textAlign: "inherit",
  cursor: "pointer",
  opacity: "var(--emphasis-opacity)",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle(".formula-tooltip-trigger:focus-visible", {
  outline: "var(--line-medium) solid var(--focus-ring)",
  outlineOffset: "var(--line-focus)",
  borderRadius: "var(--space-05)",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle(".range-labels", {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "var(--space-1)",
  color: "var(--text-soft)",
  fontSize: "var(--text-meta)",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle(".panel-header", {
  display: "flex",
  alignItems: "start",
  justifyContent: "space-between",
  gap: "var(--space-3)",
  padding: "var(--space-4) var(--space-4) var(--space-3)",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle(".chart-wrap", {
  height: "var(--size-20)",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle(".investment-legend", {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: "var(--space-1)",
  paddingTop: "var(--space-3)",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle(".distribution-mode-toggle", {
  display: "inline-flex",
  flex: "none",
  gap: "var(--space-025)",
  padding: "var(--space-025)",
  border: "var(--line-thin) solid var(--border-subtle)",
  borderRadius: "var(--radius-full)",
  background: "var(--secondary)",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle(".distribution-mode-toggle button", {
  minWidth: "var(--space-45)",
  minHeight: "var(--space-5)",
  padding: "0 var(--space-1)",
  border: "var(--line-thin) solid transparent",
  borderRadius: "var(--radius-full)",
  color: "var(--text-soft)",
  background: "transparent",
  fontSize: "var(--text-meta)",
  cursor: "pointer",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle('.distribution-mode-toggle button[aria-pressed="true"]', {
  minWidth: "var(--space-5)",
  minHeight: "var(--space-5)",
  padding: "0 var(--space-1)",
  borderColor: "transparent",
  borderRadius: "var(--radius-full)",
  color: "var(--primary-foreground)",
  background: "var(--primary)",
  boxShadow: "var(--shadow-card)",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle('.distribution-mode-toggle button:not([aria-pressed="true"]):hover', {
  color: "var(--text-strong)",
  background: "transparent",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle('.distribution-mode-toggle:has(button:not([aria-pressed="true"]):hover)', {
  background: "var(--muted)",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle(".distribution-mode-toggle button:focus-visible", {
  outline: "var(--line-medium) solid var(--focus-ring)",
  outlineOffset: "var(--line-medium)",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle(".section-heading", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "end",
  gap: "var(--space-4)",
  marginBottom: "var(--space-4)",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle(".section-heading h2", {
  margin: "var(--space-1) 0 0",
  fontSize: "var(--text-section)",
  fontWeight: "var(--font-weight-semibold)",
  letterSpacing: "var(--tracking-tight)",
  lineHeight: "var(--leading-tight)",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle(".source-icon-link", {
  display: "grid",
  placeItems: "center",
  width: "var(--control-height)",
  height: "var(--control-height)",
  borderRadius: "var(--space-1)",
  color: "var(--text-soft)",
  background: "transparent",
  transition: "color var(--motion-fast) ease,\n    background-color var(--motion-fast) ease",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle(".source-icon-link:hover", {
  color: "var(--primary)",
  background: "var(--muted)",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle(".source-icon-link:focus-visible", {
  outline: "var(--line-medium) solid var(--focus-ring)",
  outlineOffset: "var(--line-medium)",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle(".formula-tooltip-trigger.investment-growth-formula-trigger", {
  marginLeft: "0",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle(".slider-heading", {
  color: "var(--text-soft)",
  fontSize: "var(--text-body)",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle(".slider-heading strong", {
  color: "var(--text-strong)",
  fontWeight: "var(--font-weight-semibold)",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle(".rate-note-tooltip-content", {
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
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle(".money-tooltip-trigger", {
  display: "inline-flex",
  alignItems: "center",
  minWidth: "var(--space-4)",
  minHeight: "var(--space-4)",
  margin: "0",
  padding: "0",
  border: "0",
  color: "inherit",
  background: "transparent",
  font: "inherit",
  lineHeight: "inherit",
  textAlign: "inherit",
  fontVariantNumeric: "tabular-nums",
  cursor: "help",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle(".money-tooltip-trigger:focus-visible", {
  outline: "var(--line-medium) solid var(--focus-ring)",
  outlineOffset: "var(--line-medium)",
  borderRadius: "var(--space-05)",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle(".money-tooltip-content", {
  zIndex: "var(--layer-dialog)",
  maxWidth: "min(var(--fluid-max-width), var(--size-34))",
  padding: "var(--space-1) var(--space-2)",
  border: "var(--line-thin) solid var(--input)",
  borderRadius: "var(--space-1)",
  color: "var(--popover-foreground)",
  background: "var(--popover)",
  boxShadow: "var(--shadow-card)",
  fontSize: "var(--text-meta)",
  lineHeight: "var(--leading-snug)",
  fontVariantNumeric: "tabular-nums",
  overflowWrap: "anywhere",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle(".money-tooltip-arrow", {
  fill: "var(--popover)",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle(".formula-tooltip-copy", {
  display: "flex",
  flexDirection: "column",
  gap: "var(--space-3)",
  minWidth: "0",
  maxWidth: "100%",
  margin: "0",
  padding: "0",
  listStyle: "none",
  counterReset: "formula-step",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle(".formula-math", {
  boxSizing: "border-box",
  minWidth: "0",
  width: "100%",
  maxWidth: "100%",
  overflow: "auto hidden",
  padding: "var(--space-025) var(--space-025) var(--space-075)",
  color: "var(--text-strong)",
  fontSize: "var(--text-card-fluid)",
  lineHeight: "var(--leading-body)",
  textAlign: "center",
  whiteSpace: "nowrap",
  WebkitOverflowScrolling: "touch",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle(".formula-math .katex-display", {
  margin: "var(--space-025) 0",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle(".formula-math:focus-visible", {
  outline: "var(--line-medium) solid var(--primary)",
  outlineOffset: "var(--line-medium)",
  borderRadius: "var(--space-025)",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle(".formula-math-substitution", {
  color: "var(--primary)",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle(".formula-no-result", {
  margin: "0",
  color: "var(--text-soft)",
  fontSize: "var(--text-meta)",
  lineHeight: "var(--leading-snug)",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle(".formula-step", {
  position: "relative",
  display: "grid",
  justifyItems: "center",
  gap: "var(--space-1)",
  boxSizing: "border-box",
  width: "100%",
  minWidth: "0",
  padding: "var(--space-075) var(--space-025) var(--space-1) var(--space-45)",
  textAlign: "center",
  counterIncrement: "formula-step",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle(".formula-step::before", {
  position: "absolute",
  top: "var(--space-075)",
  left: "var(--space-025)",
  content: 'counter(formula-step) "."',
  color: "var(--primary)",
  fontWeight: "var(--font-weight-bold)",
  fontSize: "var(--text-meta)",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle(".formula-step-description", {
  color: "var(--text-soft)",
  fontSize: "var(--text-meta)",
  lineHeight: "var(--leading-snug)",
  textWrap: "pretty",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle(".formula-step + .formula-step", {
  paddingTop: "var(--space-3)",
  borderTop: "var(--line-thin) solid var(--border-subtle)",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle(".formula-step + .formula-step::before", {
  top: "var(--space-3)",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle("table", {
  width: "100%",
  borderCollapse: "collapse",
  whiteSpace: "nowrap",
  fontSize: "var(--text-meta)",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle("th,\ntd", {
  padding: "var(--space-3) var(--space-3)",
  borderBottom: "var(--line-thin) solid var(--border-subtle)",
  textAlign: "right",
  color: "var(--text-soft)",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle("th", {
  color: "var(--text-strong)",
  background: "var(--surface-soft)",
  fontWeight: "var(--font-weight-semibold)",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle("th:first-child,\ntd:first-child", {
  textAlign: "left",
  paddingLeft: "var(--space-4)",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle(".footer", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "var(--space-3)",
  minHeight: "var(--size-5)",
  paddingBlock: "var(--space-3)",
  borderTop: "var(--line-thin) solid var(--border-subtle)",
  color: "var(--text-soft)",
  fontSize: "var(--text-meta)",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle(".footer > span:first-child", {
  color: "var(--text-strong)",
  fontWeight: "var(--font-weight-bold)",
  letterSpacing: "var(--tracking-wider)",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle(".footer a", {
  textDecoration: "underline",
  textUnderlineOffset: "var(--underline-offset)",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle(".chart-tooltip", {
  display: "flex",
  flexDirection: "column",
  gap: "var(--space-1)",
  minWidth: "var(--size-13)",
  padding: "var(--space-3)",
  border: "var(--line-thin) solid var(--input)",
  borderRadius: "var(--radius)",
  background: "var(--popover)",
  boxShadow: "var(--shadow-card)",
  color: "var(--popover-foreground)",
  fontSize: "var(--text-meta)",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle(".chart-tooltip > span", {
  paddingBottom: "var(--space-1)",
  borderBottom: "var(--line-thin) solid var(--border-subtle)",
  fontWeight: "var(--font-weight-semibold)",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle(".chart-tooltip > div", {
  display: "grid",
  gridTemplateColumns: "var(--space-2) 1fr auto",
  alignItems: "center",
  gap: "var(--space-1)",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle(".chart-tooltip i", {
  width: "var(--space-1)",
  height: "var(--space-1)",
  borderRadius: "50%",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle(".chart-tooltip strong", {
  color: "var(--text-strong)",
  whiteSpace: "nowrap",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle(".visually-hidden", {
  position: "absolute",
  width: "var(--line-thin)",
  height: "var(--line-thin)",
  padding: "0",
  margin: "calc(-1 * var(--line-thin))",
  overflow: "hidden",
  whiteSpace: "nowrap",
  border: "0",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle(".section-heading", {
  flexDirection: "column",
  alignItems: "start",
  gap: "var(--space-2)",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle(".panel-header", {
  flexWrap: "wrap",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle(".chart-wrap", {
  height: "var(--size-17)",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle(".panel-header", {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      flexWrap: "nowrap",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle(".chart-wrap", {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      height: "var(--size-20)",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle(".section-heading", {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      flexDirection: "row",
      alignItems: "end",
      gap: "var(--space-4)",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle("html", {
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      scrollBehavior: "auto",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle("*,\n  *::before,\n  *::after", {
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      transitionDuration: "var(--motion-reduced)",
      animationDuration: "var(--motion-reduced)",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle("main", {
  width: "calc(100% - var(--space-5))",
} as unknown as Parameters<typeof globalStyle>[1]);

globalStyle("main", {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      width: "min(var(--content-width), calc(100% - var(--space-6)))",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
