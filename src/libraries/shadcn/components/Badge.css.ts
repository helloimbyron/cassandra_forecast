import { globalStyle, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const badgeRoot = style({
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
});

export const badgeVariants = recipe({
  base: badgeRoot,
  variants: {
    variant: {
      default: {},
      secondary: {
        "@layer": {
          components: {
            background: "var(--secondary)",
            color: "var(--secondary-foreground)",
          },
        },
      },
      outline: {
        "@layer": {
          components: {
            borderColor: "var(--border)",
            background: "transparent",
            color: "var(--foreground)",
          },
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
      ghost: {
        "@layer": {
          components: { background: "transparent", color: "var(--foreground)" },
        },
      },
      link: {
        "@layer": {
          components: { background: "transparent", color: "var(--foreground)" },
        },
      },
    },
  },
  defaultVariants: { variant: "default" },
});

// Parent cards deliberately override the primitive at the unlayered cascade level.
globalStyle(`.panel-header ${badgeRoot},\n.investment-card-header ${badgeRoot}`, {
  color: "var(--foreground)",
  borderColor: "var(--input)",
  fontSize: "var(--text-meta)",
});
