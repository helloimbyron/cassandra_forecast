import * as React from "react";
import { cn } from "cn";

export function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-header" className={cn("ui-card-header", className)} {...props} />;
}
