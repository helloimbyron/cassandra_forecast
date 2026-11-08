import * as React from "react";
import { cn } from "@/libraries/shadcn/utils/cn.util";

export function Card({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
  return <div data-slot="card" data-size={size} className={cn("ui-card", className)} {...props} />;
}
