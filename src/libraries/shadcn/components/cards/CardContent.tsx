import * as React from "react";
import { cn } from "@/libraries/shadcn/utils/cn.util";

export function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-content" className={cn("ui-card-content", className)} {...props} />;
}
