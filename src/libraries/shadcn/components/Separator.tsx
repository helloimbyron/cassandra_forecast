import * as veSeparatorStyles from "./Separator.css.ts";
import * as React from "react";
import { cn } from "@/libraries/shadcn/utils/cn.util";
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
      className={[veSeparatorStyles.separatorRoot, cn("ui-separator", className)]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}

export { Separator };
