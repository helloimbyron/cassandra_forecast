import * as React from "react";
import { cn } from "cn";

export function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-title" className={cn("ui-card-title", className)} {...props} />;
}
