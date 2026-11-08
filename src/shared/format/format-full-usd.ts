import { fullUsd } from "./money-formatters";

export function formatFullUsd(value: number): string {
  return fullUsd.format(value);
}
