import * as veCardActionStyles from "./CardAction.css.ts";
import * as React from "react";
import { cn } from "@/libraries/shadcn/utils/cn.util";

export function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={[veCardActionStyles.cardActionRoot, cn("ui-card-action", className)]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
