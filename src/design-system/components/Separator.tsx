import * as React from "react";
import { cn } from "@/shared/utils/cn.util";
import { Separator as SeparatorPrimitive } from "radix-ui";

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      data-orientation={orientation}
      decorative={decorative}
      orientation={orientation}
      className={cn("ui-separator", className)}
      {...props}
    />
  );
}

export { Separator };
