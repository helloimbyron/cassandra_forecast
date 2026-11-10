import * as veCardTitleStyles from "./CardTitle.css.ts";
import * as React from "react";
import { cn } from "@/libraries/shadcn/utils/cn.util";

export function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={[veCardTitleStyles.cardTitleRoot, cn("ui-card-title", className)]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
