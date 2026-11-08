import { formatAbbreviatedValue } from "@/shared/format/format-abbreviated-value";

export function PlainMoney({ value, className }: { value: number; className?: string }) {
  return <span className={className}>{formatAbbreviatedValue(value, "currency")}</span>;
}
