import type { MoneyProps } from "@/features/Portfolio/presentation/types/MoneyProps.type";
import { AbbreviatedValue } from "@/features/Portfolio/presentation/components/money/AbbreviatedValue";

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
