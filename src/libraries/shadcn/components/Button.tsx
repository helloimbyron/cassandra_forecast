import { buttonVariants } from "./Button.css.ts";
import * as React from "react";
import type { RecipeVariants } from "@vanilla-extract/recipes";
import { cn } from "@/libraries/shadcn/utils/cn.util";
import { Slot } from "radix-ui";

// --- Components ---

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  RecipeVariants<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  // --- Variables ---

  const Comp = asChild ? Slot.Root : "button";

  // --- Return ---

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn("ui-button", buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button };
