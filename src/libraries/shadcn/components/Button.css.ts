import { globalStyle } from "@vanilla-extract/css";

globalStyle(".icon-sm,\n.icon-md,\n.icon-lg", {
  flexShrink: "0",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle('[data-slot="button"]', {
  "@layer": {
    components: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "var(--space-1)",
      minHeight: "var(--control-height)",
      paddingInline: "var(--space-3)",
      border: "var(--line-thin) solid transparent",
      borderRadius: "var(--radius-sm)",
      background: "var(--primary)",
      color: "var(--primary-foreground)",
      font: "inherit",
      fontSize: "var(--text-action)",
      fontWeight: "var(--font-weight-semibold)",
      lineHeight: "var(--leading-tight)",
      textAlign: "center",
      textDecoration: "none",
      whiteSpace: "normal",
      cursor: "pointer",
      transition: "background-color var(--motion-base) ease,\n      color var(--motion-base) ease",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle('[data-slot="button"]:hover:not(:disabled)', {
  "@layer": {
    components: {
      background: "var(--accent)",
      color: "var(--accent-foreground)",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle('[data-slot="button"]:disabled', {
  "@layer": {
    components: {
      opacity: "var(--disabled-opacity)",
      cursor: "not-allowed",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle('[data-slot="button"] svg', {
  "@layer": {
    components: {
      width: "var(--icon-md)",
      height: "var(--icon-md)",
      flexShrink: "0",
      pointerEvents: "none",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle('[data-slot="button"][data-variant="outline"]', {
  "@layer": {
    components: {
      borderColor: "var(--border)",
      background: "var(--card)",
      color: "var(--card-foreground)",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle('[data-slot="button"][data-variant="secondary"]', {
  "@layer": {
    components: {
      background: "var(--secondary)",
      color: "var(--secondary-foreground)",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(
  '[data-slot="button"][data-variant="ghost"],\n  [data-slot="button"][data-variant="link"]',
  {
    "@layer": {
      components: {
        background: "transparent",
        color: "var(--foreground)",
      },
    },
  } as unknown as Parameters<typeof globalStyle>[1],
);
globalStyle('[data-slot="button"][data-variant="link"]', {
  "@layer": {
    components: {
      color: "var(--primary)",
      textDecoration: "underline",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle('[data-slot="button"][data-variant="destructive"]', {
  "@layer": {
    components: {
      borderColor: "var(--destructive)",
      background: "var(--muted)",
      color: "var(--destructive)",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle('[data-slot="button"][data-size="lg"]', {
  "@layer": {
    components: {
      minHeight: "var(--control-height-lg)",
      paddingInline: "var(--space-4)",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle('[data-slot="button"][data-size^="icon"]', {
  "@layer": {
    components: {
      width: "var(--control-height)",
      padding: "0",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
