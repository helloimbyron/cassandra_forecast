import * as React from "react";
import { cn } from "@/shared/utils/cn.util";

export function CardHeader({ className, ...props }: React.ComponentProps<"div">) {

  return <div data-slot="card-header" className={cn("ui-card-header", className)} {...props} />;
}
