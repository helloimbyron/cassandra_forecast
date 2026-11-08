"use client";

import * as React from "react";
import { cn } from "@/shared/utils/cn.util";
import { Label as LabelPrimitive } from "radix-ui";

// --- Components ---

function Label({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return <LabelPrimitive.Root data-slot="label" className={cn("ui-label", className)} {...props} />;
}

export { Label };
