import { badgeVariants } from "./Badge.css.ts";
import * as React from "react";
import type { RecipeVariants } from "@vanilla-extract/recipes";
import { cn } from "@/libraries/shadcn/utils/cn.util";
import { Slot } from "radix-ui";

// --- Components ---

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> & RecipeVariants<typeof badgeVariants> & { asChild?: boolean }) {
  // --- Variables ---

  const Comp = asChild ? Slot.Root : "span";

  // --- Return ---

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn("ui-badge", badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
