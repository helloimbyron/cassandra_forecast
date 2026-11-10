import { globalStyle } from "@vanilla-extract/css";

import { breakpoints } from "@/design-system/styles/breakpoints.build";

// Shared Lucide icon utilities are used throughout the application.
globalStyle(".icon-sm,\n.icon-md,\n.icon-lg", { flexShrink: "0" });

globalStyle(".icon-lg", { width: "var(--icon-lg)", height: "var(--icon-lg)" });

globalStyle("*", {
  "@layer": {
    base: {
      boxSizing: "border-box",
    },
  },
});

globalStyle("html", {
  "@layer": {
    base: {
      fontFamily: "var(--font-body)",
      scrollBehavior: "smooth",
      fontSynthesis: "none",
      textRendering: "optimizeLegibility",
    },
  },
});

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
});

globalStyle("button,\n  input", {
  "@layer": {
    base: {
      font: "inherit",
    },
  },
});

globalStyle('button,\n  a,\n  input,\n  [role="slider"]', {
  "@layer": {
    base: {
      WebkitTapHighlightColor: "transparent",
    },
  },
});

globalStyle(
  'button:focus-visible,\n  a:focus-visible,\n  input:focus-visible,\n  [role="slider"]:focus-visible',
  {
    "@layer": {
      base: {
        outline: "var(--line-focus) solid var(--focus-ring)",
        outlineOffset: "var(--line-focus)",
      },
    },
  },
);

globalStyle("html,\n*", {
  scrollbarWidth: "thin",
  scrollbarColor: "var(--input) transparent",
});

globalStyle("html,\n  *", {
  "@supports": {
    "selector(::-webkit-scrollbar)": {
      scrollbarWidth: "auto",
      scrollbarColor: "auto",
    },
  },
});

globalStyle("html::-webkit-scrollbar,\n  *::-webkit-scrollbar", {
  "@supports": {
    "selector(::-webkit-scrollbar)": {
      width: "var(--scrollbar-size)",
      height: "var(--scrollbar-size)",
    },
  },
});

globalStyle("html::-webkit-scrollbar-button,\n  *::-webkit-scrollbar-button", {
  "@supports": {
    "selector(::-webkit-scrollbar)": {
      display: "none",
    },
  },
});

globalStyle("html::-webkit-scrollbar-track,\n  *::-webkit-scrollbar-track", {
  "@supports": {
    "selector(::-webkit-scrollbar)": {
      background: "transparent",
    },
  },
});

globalStyle("html::-webkit-scrollbar-thumb,\n  *::-webkit-scrollbar-thumb", {
  "@supports": {
    "selector(::-webkit-scrollbar)": {
      borderRadius: "var(--radius-full)",
      background: "var(--input)",
    },
  },
});

globalStyle("a", {
  color: "inherit",
});

globalStyle(".icon-sm", {
  width: "var(--icon-sm)",
  height: "var(--icon-sm)",
});

globalStyle(".icon-md", {
  width: "var(--icon-md)",
  height: "var(--icon-md)",
});

globalStyle("main,\n.footer", {
  width: "min(var(--content-width), calc(100% - var(--space-6)))",
  marginInline: "auto",
});

globalStyle("h1", {
  margin: "0 auto var(--space-3)",
  color: "var(--text-strong)",
  fontSize: "var(--text-intro)",
  fontWeight: "var(--font-weight-semibold)",
  letterSpacing: "var(--tracking-tighter)",
  lineHeight: "var(--leading-tight)",
  overflowWrap: "anywhere",
  hyphens: "auto",
});

globalStyle("h1 em", {
  color: "var(--primary)",
  fontFamily: "var(--font-display)",
  fontWeight: "var(--font-weight-regular)",
  letterSpacing: "var(--tracking-tighter)",
});

globalStyle("h1", {
  fontSize: "var(--text-intro-mobile)",
});

globalStyle("h1", {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      fontSize: "var(--text-intro)",
    },
  },
});

globalStyle("table", {
  width: "100%",
  borderCollapse: "collapse",
  whiteSpace: "nowrap",
  fontSize: "var(--text-meta)",
});

globalStyle("th,\ntd", {
  padding: "var(--space-3) var(--space-3)",
  borderBottom: "var(--line-thin) solid var(--border-subtle)",
  textAlign: "right",
  color: "var(--text-soft)",
});

globalStyle("th", {
  color: "var(--text-strong)",
  background: "var(--surface-soft)",
  fontWeight: "var(--font-weight-semibold)",
});

globalStyle("th:first-child,\ntd:first-child", {
  textAlign: "left",
  paddingLeft: "var(--space-4)",
});

globalStyle(".visually-hidden", {
  position: "absolute",
  width: "var(--line-thin)",
  height: "var(--line-thin)",
  padding: "0",
  margin: "calc(-1 * var(--line-thin))",
  overflow: "hidden",
  whiteSpace: "nowrap",
  border: "0",
});

globalStyle("html", {
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      scrollBehavior: "auto",
    },
  },
});

globalStyle("*,\n  *::before,\n  *::after", {
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      transitionDuration: "var(--motion-reduced)",
      animationDuration: "var(--motion-reduced)",
    },
  },
});

globalStyle("main", {
  width: "calc(100% - var(--space-5))",
});

globalStyle("main", {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      width: "min(var(--content-width), calc(100% - var(--space-6)))",
    },
  },
});
