import { formatFullUsd } from "@/lib/money-format";
import { FullValueTooltip } from "./FullValueTooltip";
import type { MoneyProps } from "./MoneyProps";
import { SCIENTIFIC_DISPLAY_THRESHOLD } from "@/shared/format/money-constants";

export function FullMoney({ value, className }: MoneyProps) {
  if (Math.abs(value) >= SCIENTIFIC_DISPLAY_THRESHOLD)
    return <FullValueTooltip value={value} className={className} />;
  return <span className={className}>{formatFullUsd(value)}</span>;
}
