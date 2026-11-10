"use client";
import * as veLabelStyles from "./Label.css.ts";

import * as React from "react";
import { cn } from "@/libraries/shadcn/utils/cn.util";
import { Label as LabelPrimitive } from "radix-ui";

// --- Components ---

function Label({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={[veLabelStyles.labelRoot, cn("ui-label", className)].filter(Boolean).join(" ")}
      {...props}
    />
  );
}

export { Label };
