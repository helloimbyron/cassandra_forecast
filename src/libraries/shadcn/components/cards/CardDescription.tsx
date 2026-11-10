import * as veCardDescriptionStyles from "./CardDescription.css.ts";
import * as React from "react";
import { cn } from "@/libraries/shadcn/utils/cn.util";

export function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={[veCardDescriptionStyles.cardDescriptionRoot, cn("ui-card-description", className)]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
