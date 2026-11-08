export function parseNumericUnitValue(text: string): number | null {
  const normalized = text.trim().replace(",", ".");

  if (!normalized || normalized === "-" || normalized === "." || normalized === "-.") {
    return null;
  }

  const parsed = Number(normalized);

  return Number.isFinite(parsed) ? parsed : null;
}
