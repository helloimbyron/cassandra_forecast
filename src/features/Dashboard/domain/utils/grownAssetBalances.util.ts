import { PORTFOLIO_CONSTANTS } from "@/shared/domain/portfolio/portfolioConstants.constant";
import type { DistributionAsset } from "@/shared/domain/portfolio/DistributionAsset.type";

// --- Constants ---

const { MONTHS_PER_YEAR, PERCENT_SCALE } = PORTFOLIO_CONSTANTS;

// --- Utils ---

export function grownAssetBalances(assets: readonly DistributionAsset[], balances: number[]) {
  return assets.map((asset, index) => {
    const monthlyRate =
      Math.pow(1 + asset.annualReturnPct / PERCENT_SCALE, 1 / MONTHS_PER_YEAR) - 1;

    return balances[index]! * (1 + monthlyRate);
  });
}
