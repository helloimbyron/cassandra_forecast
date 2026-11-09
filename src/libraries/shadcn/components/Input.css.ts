import { globalStyle } from "@vanilla-extract/css";

globalStyle('[data-slot="input"]', {
  "@layer": {
    components: {
      display: "block",
      width: "100%",
      minWidth: "0",
      minHeight: "var(--control-height)",
      padding: "var(--space-1) var(--space-2)",
      border: "var(--line-thin) solid var(--input)",
      borderRadius: "var(--radius-sm)",
      background: "var(--card)",
      color: "var(--card-foreground)",
      font: "inherit",
      fontSize: "var(--text-body)",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle('[data-slot="input"]::placeholder', {
  "@layer": {
    components: {
      color: "var(--muted-foreground)",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle('[data-slot="input"]:disabled', {
  "@layer": {
    components: {
      opacity: "var(--disabled-opacity)",
      cursor: "not-allowed",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle('[data-slot="input"][aria-invalid="true"]', {
  "@layer": {
    components: {
      borderColor: "var(--destructive)",
    },
  },
} as unknown as Parameters<typeof globalStyle>[1]);
