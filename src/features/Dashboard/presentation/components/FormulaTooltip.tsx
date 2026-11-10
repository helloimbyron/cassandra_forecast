import * as veFormulaTooltipStyles from "./FormulaTooltip.css.ts";
import { formulaTooltipCopy } from "@/features/Dashboard/presentation/copies/formulaTooltip.copy";
import { useState } from "react";
import type { ReactNode } from "react";
import { X } from "lucide-react";
import { Dialog as DialogPrimitive } from "radix-ui";

// --- Components ---

export function FormulaTooltip({
  label,
  intro,
  example,
  trigger,
  triggerLabel,
  children,
  className,
}: {
  label: string;
  intro: string;
  example?: string;
  trigger: ReactNode;
  triggerLabel?: string;
  children: ReactNode;
  className?: string;
}) {
  // --- States ---

  const [open, setOpen] = useState(false);

  // --- Return ---

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger asChild>
        <button
          type="button"
          className={[
            veFormulaTooltipStyles.formulaTooltipTrigger,
            className ? `formula-tooltip-trigger ${className}` : "formula-tooltip-trigger",
          ]
            .filter(Boolean)
            .join(" ")}
          aria-label={triggerLabel ?? formulaTooltipCopy.formulaFor(label)}
        >
          {trigger}
        </button>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className={veFormulaTooltipStyles.formulaDialogOverlay} />
        <DialogPrimitive.Content className={veFormulaTooltipStyles.formulaDialogContent}>
          <div className={veFormulaTooltipStyles.formulaTooltipHeading}>
            <DialogPrimitive.Title>{label}</DialogPrimitive.Title>
            <DialogPrimitive.Description>{intro}</DialogPrimitive.Description>
            {example && <p className="formula-tooltip-example">{example}</p>}
          </div>
          <DialogPrimitive.Close asChild>
            <button
              className={veFormulaTooltipStyles.formulaDialogClose}
              type="button"
              aria-label={formulaTooltipCopy.closeFormula}
            >
              <X className="icon-sm" aria-hidden="true" />
            </button>
          </DialogPrimitive.Close>
          {children && <div className={veFormulaTooltipStyles.formulaDialogScroll}>{children}</div>}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
