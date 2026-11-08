/** Quita ceros iniciales redundantes sin alterar cero, decimales ni borradores vacíos. */
export function normalizeContributionInputValue(value: string): string {
  return value.replace(/^0+(?=\d)/, "");
}
