import * as veMoneyTooltipStyles from "./money/MoneyTooltip.css.ts";
import * as veRateNoteTooltipStyles from "./RateNoteTooltip.css.ts";
import * as veFormulaTooltipStyles from "./FormulaTooltip.css.ts";
import { useState, type PointerEvent } from "react";
import { Tooltip as TooltipPrimitive } from "radix-ui";
import { investmentCardCopy } from "@/features/Dashboard/presentation/copies/investmentCard.copy";

// --- Components ---

export function RateNoteTooltip({
  investmentName,
  note,
}: {
  investmentName: string;
  note: string | null | undefined;
}) {
  // --- States ---

  const [open, setOpen] = useState(false);
  if (!note?.trim()) {
    return null;
  }

  // --- Return ---

  return (
    <TooltipPrimitive.Provider delayDuration={250}>
      <TooltipPrimitive.Root open={open} onOpenChange={setOpen}>
        <TooltipPrimitive.Trigger asChild>
          <button
            type="button"
            className={[
              veFormulaTooltipStyles.formulaTooltipTrigger,
              [
                veRateNoteTooltipStyles.rateNoteTooltipTrigger,
                "formula-tooltip-trigger rate-note-tooltip-trigger",
              ]
                .filter(Boolean)
                .join(" "),
            ]
              .filter(Boolean)
              .join(" ")}
            aria-label={investmentCardCopy.rateNote(investmentName)}
            onPointerDown={(event: PointerEvent<HTMLButtonElement>) => {
              if (event.pointerType === "touch") {
                setOpen(true);
              }
            }}
          >
            <span className={veRateNoteTooltipStyles.rateNoteQuestionMark} aria-hidden="true">
              {investmentCardCopy.questionMark}
            </span>
          </button>
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            className={veRateNoteTooltipStyles.rateNoteTooltipContent}
            side="top"
            sideOffset={6}
          >
            {note}
            <TooltipPrimitive.Arrow className={veMoneyTooltipStyles.moneyTooltipArrow} />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
