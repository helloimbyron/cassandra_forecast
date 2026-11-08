import { PORTFOLIO_CONSTANTS } from "@/shared/domain/constants/portfolioConstants.constant";
import type { DistributionAsset } from "@/shared/domain/types/DistributionAsset.type";
import type { DistributionPoint } from "@/shared/domain/types/DistributionPoint.type";
import type { PortfolioDistributionProjection } from "@/shared/domain/types/PortfolioDistributionProjection.type";
import { grownAssetBalances } from "@/features/Dashboard/domain/utils/grownAssetBalances.util";
import { validateDistributionAssets } from "@/features/Dashboard/domain/validators/validateDistributionAssets.validator";
import { withdrawProRata } from "@/features/Dashboard/domain/utils/withdrawProRata.util";

// --- Constants ---

const { MAX_HORIZON_YEARS, MIN_HORIZON_YEARS, MONTHS_PER_YEAR } = PORTFOLIO_CONSTANTS;

// --- Utils ---

/**
 * Proyecta cada posición con su propia tasa anual efectiva y descuenta el retiro
 * seleccionado proporcionalmente después del crecimiento mensual.
 */
export function simulatePortfolioDistribution(
  assets: readonly DistributionAsset[],
  monthlyWithdrawal: number,
  years: number,
): PortfolioDistributionProjection {
  validateDistributionAssets(assets);

  if (!Number.isFinite(monthlyWithdrawal) || monthlyWithdrawal < 0) {
    throw new RangeError("Monthly withdrawal must be a non-negative number.");
  }

  if (!Number.isInteger(years) || years < MIN_HORIZON_YEARS || years > MAX_HORIZON_YEARS) {
    throw new RangeError("Distribution horizon must be between 0 and 40 whole years.");
  }

  const initialBalances = assets.map((asset) => asset.balance);
  const initialBalance = initialBalances.reduce((sum, balance) => sum + balance, 0);
  const points: DistributionPoint[] = [{ year: 0, balance: initialBalance }];
  let balances = initialBalances;
  let depletionMonth: number | null = initialBalance === 0 ? 0 : null;

  for (let month = 1; month <= years * MONTHS_PER_YEAR; month += 1) {
    const grownBalancesForMonth = grownAssetBalances(assets, balances);
    const availableBalance = grownBalancesForMonth.reduce((sum, balance) => sum + balance, 0);
    balances = withdrawProRata(grownBalancesForMonth, monthlyWithdrawal);
    const balance = balances.reduce((sum, item) => sum + item, 0);

    if (balance === 0 && depletionMonth === null) {
      depletionMonth = month;
    }

    if (availableBalance <= monthlyWithdrawal && depletionMonth === null) {
      depletionMonth = month;
    }

    if (month % MONTHS_PER_YEAR === 0) {
      points.push({ year: month / MONTHS_PER_YEAR, balance });
    }
  }

  return {
    points,
    finalBalance: balances.reduce((sum, balance) => sum + balance, 0),
    depletionMonth,
    finalAssets: assets.map((asset, index) => ({ ...asset, balance: balances[index]! })),
  };
}
