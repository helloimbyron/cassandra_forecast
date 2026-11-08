import * as React from "react";
import { cn } from "@/libraries/shadcn/utils/cn.util";

export function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-footer" className={cn("ui-card-footer", className)} {...props} />;
}
