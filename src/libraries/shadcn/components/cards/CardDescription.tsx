import "./CardDescription.css.ts";
import * as React from "react";
import { cn } from "@/libraries/shadcn/utils/cn.util";

export function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="card-description" className={cn("ui-card-description", className)} {...props} />
  );
}
