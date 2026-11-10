import * as veMoneyTooltipStyles from "./MoneyTooltip.css.ts";
import { abbreviatedValue } from "./AbbreviatedValue.css.ts";
import { useState, type PointerEvent } from "react";
import { Tooltip as TooltipPrimitive } from "radix-ui";
import { cn } from "@/libraries/shadcn/utils/cn.util";
import { formatAbbreviatedValue } from "@/features/Dashboard/presentation/formatters/formatAbbreviatedValue.util";
import { formatFullValue } from "@/features/Dashboard/presentation/formatters/formatFullValue.util";
import type { ValueUnit } from "@/features/Dashboard/presentation/types/ValueUnit.type";
import { moneyCopy } from "@/features/Dashboard/presentation/copies/moneyCopy.copy";

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
            className={[
              veMoneyTooltipStyles.moneyTooltipTrigger,
              abbreviatedValue,
              cn(
                "money-tooltip-trigger abbreviated-value",
                unit === "currency" && "abbreviated-money",
                className,
              ),
            ]
              .filter(Boolean)
              .join(" ")}
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
          <TooltipPrimitive.Content
            className={veMoneyTooltipStyles.moneyTooltipContent}
            side="top"
            sideOffset={6}
          >
            {fullValue}
            <TooltipPrimitive.Arrow className={veMoneyTooltipStyles.moneyTooltipArrow} />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
