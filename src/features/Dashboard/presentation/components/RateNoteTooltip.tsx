import "./RateNoteTooltip.css.ts";
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
            className="formula-tooltip-trigger rate-note-tooltip-trigger"
            aria-label={investmentCardCopy.rateNote(investmentName)}
            onPointerDown={(event: PointerEvent<HTMLButtonElement>) => {
              if (event.pointerType === "touch") {
                setOpen(true);
              }
            }}
          >
            <span className="rate-note-question-mark" aria-hidden="true">
              {investmentCardCopy.questionMark}
            </span>
          </button>
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content className="rate-note-tooltip-content" side="top" sideOffset={6}>
            {note}
            <TooltipPrimitive.Arrow className="money-tooltip-arrow" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
