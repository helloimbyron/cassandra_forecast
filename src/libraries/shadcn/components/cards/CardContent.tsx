import { cardContentRoot } from "./CardContent.css.ts";
import * as React from "react";
import { cn } from "@/libraries/shadcn/utils/cn.util";

export function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn(cardContentRoot, "ui-card-content", className)}
      {...props}
    />
  );
}
