import * as veCardHeaderStyles from "./CardHeader.css.ts";
import * as React from "react";
import { cn } from "@/libraries/shadcn/utils/cn.util";

export function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={[veCardHeaderStyles.cardHeaderRoot, cn("ui-card-header", className)]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
