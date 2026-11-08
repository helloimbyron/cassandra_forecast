import { MAX_ADDITIONAL_DEPLETION_MONTHS } from "@/features/Portfolio/domain/maxAdditionalDepletionMonths.constant";
import type { DistributionAsset } from "@/features/Portfolio/domain/DistributionAsset.type";
import { grownAssetBalances } from "@/features/Portfolio/domain/grownAssetBalances.util";
import { validateDistributionAssets } from "@/features/Portfolio/domain/validateDistributionAssets.util";
import { withdrawProRata } from "@/features/Portfolio/domain/withdrawProRata.util";

/**
 * Estima retiros proporcionales adicionales para una cartera con rendimientos
 * distintos. El límite de 1.000 años evita ciclos sin término.
 */
export function estimateAdditionalPortfolioDepletionMonths(
  assets: readonly DistributionAsset[],
  monthlyWithdrawal: number,
): number | null {
  validateDistributionAssets(assets);

  if (!Number.isFinite(monthlyWithdrawal) || monthlyWithdrawal < 0) {

    throw new RangeError("Monthly withdrawal must be a non-negative number.");
  }

  let balances = assets.map((asset) => asset.balance);

  if (balances.reduce((sum, balance) => sum + balance, 0) === 0) {

    return 0;
  }

  if (monthlyWithdrawal === 0) {

    return null;
  }

  for (let month = 1; month <= MAX_ADDITIONAL_DEPLETION_MONTHS; month += 1) {
    const grownBalancesForMonth = grownAssetBalances(assets, balances);
    const availableBalance = grownBalancesForMonth.reduce((sum, balance) => sum + balance, 0);

    if (availableBalance <= monthlyWithdrawal) {

      return month;
    }

    balances = withdrawProRata(grownBalancesForMonth, monthlyWithdrawal);
  }

  return null;
}
