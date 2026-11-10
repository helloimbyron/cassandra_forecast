import * as veInputStyles from "./Input.css.ts";
import * as React from "react";
import { cn } from "@/libraries/shadcn/utils/cn.util";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={[veInputStyles.inputRoot, cn("ui-input", className)].filter(Boolean).join(" ")}
      {...props}
    />
  );
}

export { Input };
