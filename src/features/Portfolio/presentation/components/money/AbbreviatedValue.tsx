import { useState, type PointerEvent } from "react";
import { Tooltip as TooltipPrimitive } from "radix-ui";
import { cn } from "@/shared/utils/cn.util";
import { formatAbbreviatedValue } from "@/features/Portfolio/presentation/formatters/formatAbbreviatedValue.util";
import { formatFullValue } from "@/features/Portfolio/presentation/formatters/formatFullValue.util";
import type { ValueUnit } from "@/features/Portfolio/presentation/types/ValueUnit.type";
import { moneyCopy } from "@/features/Portfolio/presentation/constants/moneyCopy.constant";

// --- Props ---

type AbbreviatedValueProps = {
  value: number;
  unit: ValueUnit;
  className?: string;
  interaction?: "interactive" | "text";
};

// --- Components ---

export function AbbreviatedValue({
  value,
  unit,
  className,
  interaction = "interactive",
}: AbbreviatedValueProps) {

  // --- States ---

  const [open, setOpen] = useState(false);

  // --- Variables ---

  const displayValue = formatAbbreviatedValue(value, unit);
  const fullValue = formatFullValue(value, unit);
  const abbreviated = displayValue !== fullValue;

  if (interaction === "text" || !abbreviated) {

    return <span className={className}>{displayValue}</span>;
  }

  // --- Return ---

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
              if (event.pointerType === "touch") {
                setOpen(true);
              }
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
