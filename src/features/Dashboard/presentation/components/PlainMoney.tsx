import { formatAbbreviatedValue } from "@/features/Dashboard/presentation/formatters/formatAbbreviatedValue.util";

export function PlainMoney({ value, className }: { value: number; className?: string }) {
  return <span className={className}>{formatAbbreviatedValue(value, "currency")}</span>;
}
