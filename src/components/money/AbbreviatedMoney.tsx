import type { MoneyProps } from "./MoneyProps";
import { AbbreviatedValue } from "./AbbreviatedValue";

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
