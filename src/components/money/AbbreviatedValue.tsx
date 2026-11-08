import { useState, type PointerEvent } from "react";
import { Tooltip as TooltipPrimitive } from "radix-ui";
import { cn } from "cn";
import {
  formatAbbreviatedValue,
  formatFullValue,
  type ValueUnit,
} from "../../shared/format/format-abbreviated-value";
import { moneyCopy } from "./money-copy";

export type AbbreviatedValueUnit = ValueUnit;

type AbbreviatedValueProps = {
  value: number;
  unit: AbbreviatedValueUnit;
  className?: string;
  interaction?: "interactive" | "text";
};

export function AbbreviatedValue({
  value,
  unit,
  className,
  interaction = "interactive",
}: AbbreviatedValueProps) {
  const [open, setOpen] = useState(false);
  const displayValue = formatAbbreviatedValue(value, unit);
  const fullValue = formatFullValue(value, unit);
  const abbreviated = displayValue !== fullValue;

  if (interaction === "text" || !abbreviated)
    return <span className={className}>{displayValue}</span>;

  return (
    <TooltipPrimitive.Provider delayDuration={250}>
      <TooltipPrimitive.Root open={open} onOpenChange={setOpen}>
        <TooltipPrimitive.Trigger asChild>
          <button
            type="button"
            className={cn(
              "money-tooltip-trigger abbreviated-value",
              unit === "currency" && "abbreviated-money",
              className,
            )}
            aria-label={moneyCopy.abbreviatedValue(displayValue, fullValue)}
            onPointerDown={(event: PointerEvent<HTMLButtonElement>) => {
              if (event.pointerType === "touch") setOpen(true);
            }}
          >
            {displayValue}
          </button>
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content className="money-tooltip-content" side="top" sideOffset={6}>
            {fullValue}
            <TooltipPrimitive.Arrow className="money-tooltip-arrow" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
