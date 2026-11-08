import { useState, type PointerEvent } from "react";
import { Tooltip as TooltipPrimitive } from "radix-ui";
import { cn } from "cn";
import { formatFullMoneyDisplay, formatFullUsd } from "@/lib/money-format";
import type { MoneyProps } from "./MoneyProps";
import { moneyCopy } from "./money-copy";

export function FullValueTooltip({ value, className }: MoneyProps) {
  const [open, setOpen] = useState(false);
  const full = formatFullUsd(value);

  return (
    <TooltipPrimitive.Provider delayDuration={250}>
      <TooltipPrimitive.Root open={open} onOpenChange={setOpen}>
        <TooltipPrimitive.Trigger asChild>
          <button
            type="button"
            className={cn("money-tooltip-trigger", className)}
            aria-label={moneyCopy.fullAmount(full)}
            onPointerDown={(event: PointerEvent<HTMLButtonElement>) => {
              if (event.pointerType === "touch") setOpen(true);
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
