import "./Badge.css.ts";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/libraries/shadcn/utils/cn.util";
import { Slot } from "radix-ui";

// --- Constants ---

const badgeVariants = cva("ui-badge", {
  variants: {
    variant: {
      default: "",
      secondary: "",
      destructive: "",
      outline: "",
      ghost: "",
      link: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

// --- Components ---

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  // --- Variables ---

  const Comp = asChild ? Slot.Root : "span";

  // --- Return ---

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
