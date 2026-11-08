import { useState, type PointerEvent } from "react";
import { Tooltip as TooltipPrimitive } from "radix-ui";
import { cn } from "@/libraries/shadcn/utils/cn.util";
import { formatFullMoneyDisplay } from "@/features/Dashboard/presentation/formatters/formatFullMoneyDisplay.util";
import { formatFullUsd } from "@/features/Dashboard/presentation/formatters/formatFullUsd.util";
import type { MoneyProps } from "@/features/Dashboard/presentation/types/MoneyProps.type";
import { moneyCopy } from "@/features/Dashboard/presentation/copies/moneyCopy.copy";

// --- Components ---

export function FullValueTooltip({ value, className }: MoneyProps) {
  // --- States ---

  const [open, setOpen] = useState(false);

  // --- Variables ---

  const full = formatFullUsd(value);

  // --- Return ---

  return (
    <TooltipPrimitive.Provider delayDuration={250}>
      <TooltipPrimitive.Root open={open} onOpenChange={setOpen}>
        <TooltipPrimitive.Trigger asChild>
          <button
            type="button"
            className={cn("money-tooltip-trigger", className)}
            aria-label={moneyCopy.fullAmount(full)}
            onPointerDown={(event: PointerEvent<HTMLButtonElement>) => {
              if (event.pointerType === "touch") {
                setOpen(true);
              }
            }}
          >
            {formatFullMoneyDisplay(value)}
          </button>
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content className="money-tooltip-content" side="top" sideOffset={6}>
            {full}
            <TooltipPrimitive.Arrow className="money-tooltip-arrow" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
