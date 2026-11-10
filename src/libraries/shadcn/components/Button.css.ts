import { globalStyle, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const buttonRoot = style({
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
});

globalStyle(`${buttonRoot}:hover:not(:disabled)`, {
  "@layer": {
    components: {
      background: "var(--accent)",
      color: "var(--accent-foreground)",
    },
  },
});

globalStyle(`${buttonRoot}:disabled`, {
  "@layer": {
    components: {
      opacity: "var(--disabled-opacity)",
      cursor: "not-allowed",
    },
  },
});

globalStyle(`${buttonRoot} svg`, {
  "@layer": {
    components: {
      width: "var(--icon-md)",
      height: "var(--icon-md)",
      flexShrink: "0",
      pointerEvents: "none",
    },
  },
});

export const buttonVariants = recipe({
  base: buttonRoot,
  variants: {
    variant: {
      default: {},
      outline: {
        "@layer": {
          components: {
            borderColor: "var(--border)",
            background: "var(--card)",
            color: "var(--card-foreground)",
          },
        },
      },
      secondary: {
        "@layer": {
          components: {
            background: "var(--secondary)",
            color: "var(--secondary-foreground)",
          },
        },
      },
      ghost: {
        "@layer": {
          components: { background: "transparent", color: "var(--foreground)" },
        },
      },
      destructive: {
        "@layer": {
          components: {
            borderColor: "var(--destructive)",
            background: "var(--muted)",
            color: "var(--destructive)",
          },
        },
      },
      link: {
        "@layer": {
          components: {
            background: "transparent",
            color: "var(--primary)",
            textDecoration: "underline",
          },
        },
      },
    },
    size: {
      default: {},
      xs: {},
      sm: {},
      lg: {
        "@layer": {
          components: {
            minHeight: "var(--control-height-lg)",
            paddingInline: "var(--space-4)",
          },
        },
      },
      icon: {
        "@layer": { components: { width: "var(--control-height)", padding: "0" } },
      },
      "icon-xs": {
        "@layer": { components: { width: "var(--control-height)", padding: "0" } },
      },
      "icon-sm": {
        "@layer": { components: { width: "var(--control-height)", padding: "0" } },
      },
      "icon-lg": {
        "@layer": { components: { width: "var(--control-height)", padding: "0" } },
      },
    },
  },
  defaultVariants: { variant: "default", size: "default" },
});
