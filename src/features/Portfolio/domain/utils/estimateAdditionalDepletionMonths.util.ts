import { PORTFOLIO_CONSTANTS } from "@/features/Portfolio/domain/constants/portfolioConstants.constant";

// --- Constants ---

const { MONTHS_PER_YEAR, PERCENT_SCALE } = PORTFOLIO_CONSTANTS;

// --- Utils ---

/**
 * Estima cuántos retiros adicionales al final del mes puede cubrir un saldo.
 * Devuelve null si el saldo no llega a cero con la tasa y el retiro seleccionados,
 * por ejemplo, cuando el crecimiento compensa los retiros indefinidamente.
 */
export function estimateAdditionalDepletionMonths(
  initialBalance: number,
  monthlyWithdrawal: number,
  annualReturnPct: number,
): number | null {
  if (!Number.isFinite(initialBalance) || initialBalance < 0) {

    throw new RangeError("Initial balance must be a non-negative number.");
  }

  if (!Number.isFinite(monthlyWithdrawal) || monthlyWithdrawal < 0) {

    throw new RangeError("Monthly withdrawal must be a non-negative number.");
  }

  if (!Number.isFinite(annualReturnPct) || annualReturnPct <= -PERCENT_SCALE) {

    throw new RangeError("Annual return must be greater than -100%.");
  }

  if (initialBalance === 0) {

    return 0;
  }

  if (monthlyWithdrawal === 0) {

    return null;
  }

  const monthlyFactor = Math.pow(1 + annualReturnPct / PERCENT_SCALE, 1 / MONTHS_PER_YEAR);
  const monthlyRate = monthlyFactor - 1;

  if (monthlyRate === 0) {

    return Math.ceil(initialBalance / monthlyWithdrawal);
  }

  if (monthlyRate > 0) {
    const sustainableBalance = monthlyWithdrawal / monthlyRate;

    if (initialBalance >= sustainableBalance) {

      return null;
    }

    const months =
      Math.log(sustainableBalance / (sustainableBalance - initialBalance)) /
      Math.log(monthlyFactor);

    return Math.max(1, Math.ceil(months));
  }

  const depletionRatio = monthlyWithdrawal / (monthlyWithdrawal - monthlyRate * initialBalance);
  const months = Math.log(depletionRatio) / Math.log(monthlyFactor);

  return Math.max(1, Math.ceil(months));
}
