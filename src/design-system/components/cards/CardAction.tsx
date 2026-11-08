import * as React from "react";
import { cn } from "@/shared/utils/cn.util";

export function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-action" className={cn("ui-card-action", className)} {...props} />;
}
