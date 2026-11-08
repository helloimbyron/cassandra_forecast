import type { MoneyProps } from "@/features/Dashboard/presentation/types/MoneyProps.type";
import { AbbreviatedValue } from "@/features/Dashboard/presentation/components/money/AbbreviatedValue";

export function AbbreviatedMoney({
  value,
  className,
  interaction,
}: MoneyProps & { interaction?: "interactive" | "text" }) {
  return (
    <AbbreviatedValue
      value={value}
      unit="currency"
      className={className}
      interaction={interaction}
    />
  );
}
