/** Removes redundant leading zeros without changing zero, decimals, or an empty draft. */
export function normalizeContributionInputValue(value: string): string {
  return value.replace(/^0+(?=\d)/, "");
}
