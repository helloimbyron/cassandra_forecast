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
          className={className ? `formula-tooltip-trigger ${className}` : "formula-tooltip-trigger"}
          aria-label={triggerLabel ?? formulaTooltipCopy.formulaFor(label)}
        >
          {trigger}
        </button>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="formula-dialog-overlay" />
        <DialogPrimitive.Content className="formula-dialog-content">
          <div className="formula-tooltip-heading">
            <DialogPrimitive.Title>{label}</DialogPrimitive.Title>
            <DialogPrimitive.Description>{intro}</DialogPrimitive.Description>
            {example && <p className="formula-tooltip-example">{example}</p>}
          </div>
          <DialogPrimitive.Close asChild>
            <button
              className="formula-dialog-close"
              type="button"
              aria-label={formulaTooltipCopy.closeFormula}
            >
              <X className="icon-sm" aria-hidden="true" />
            </button>
          </DialogPrimitive.Close>
          {children && <div className="formula-dialog-scroll">{children}</div>}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
