import { formatFullUsd } from "@/features/Portfolio/presentation/format/formatFullUsd.util";
import { FullValueTooltip } from "@/features/Portfolio/presentation/components/money/FullValueTooltip";
import type { MoneyProps } from "@/features/Portfolio/presentation/types/MoneyProps.type";
import { MONEY_CONSTANTS } from "@/features/Portfolio/presentation/constants/moneyConstants.constant";

// --- Constants ---

const { SCIENTIFIC_DISPLAY_THRESHOLD } = MONEY_CONSTANTS;

// --- Components ---

export function FullMoney({ value, className }: MoneyProps) {
  if (Math.abs(value) >= SCIENTIFIC_DISPLAY_THRESHOLD) {

    return <FullValueTooltip value={value} className={className} />;
  }

  // --- Return ---

  return <span className={className}>{formatFullUsd(value)}</span>;
}
