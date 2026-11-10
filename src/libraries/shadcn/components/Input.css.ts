import { globalStyle, style } from "@vanilla-extract/css";

export const inputRoot = style({
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
});

globalStyle(`${inputRoot}::placeholder`, {
  "@layer": {
    components: {
      color: "var(--muted-foreground)",
    },
  },
});

globalStyle(`${inputRoot}:disabled`, {
  "@layer": {
    components: {
      opacity: "var(--disabled-opacity)",
      cursor: "not-allowed",
    },
  },
});

globalStyle(`${inputRoot}[aria-invalid="true"]`, {
  "@layer": {
    components: {
      borderColor: "var(--destructive)",
    },
  },
});
