import { globalStyle } from "@vanilla-extract/css";

globalStyle('[data-slot="badge"]', {
  "@layer": {
    components: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flex: "none",
      gap: "var(--space-05)",
      width: "fit-content",
      minHeight: "var(--space-5)",
      paddingInline: "var(--space-2)",
      border: "var(--line-thin) solid transparent",
      borderRadius: "var(--radius-full)",
      background: "var(--primary)",
      color: "var(--primary-foreground)",
      fontSize: "var(--text-meta)",
      fontWeight: "var(--font-weight-medium)",
      lineHeight: "var(--leading-tight)",
      whiteSpace: "nowrap",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle('[data-slot="badge"][data-variant="secondary"]', {
  "@layer": {
    components: {
      background: "var(--secondary)",
      color: "var(--secondary-foreground)",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle('[data-slot="badge"][data-variant="outline"]', {
  "@layer": {
    components: {
      borderColor: "var(--border)",
      background: "transparent",
      color: "var(--foreground)",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle('[data-slot="badge"][data-variant="destructive"]', {
  "@layer": {
    components: {
      borderColor: "var(--destructive)",
      background: "var(--muted)",
      color: "var(--destructive)",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(
  '[data-slot="badge"][data-variant="ghost"],\n  [data-slot="badge"][data-variant="link"]',
  {
    "@layer": {
      components: {
        background: "transparent",
        color: "var(--foreground)",
      },
    },
  } as unknown as Parameters<typeof globalStyle>[1],
);
globalStyle('.panel-header [data-slot="badge"],\n.investment-card-header [data-slot="badge"]', {
  color: "var(--foreground)",
  borderColor: "var(--input)",
  fontSize: "var(--text-meta)",
} as unknown as Parameters<typeof globalStyle>[1]);
