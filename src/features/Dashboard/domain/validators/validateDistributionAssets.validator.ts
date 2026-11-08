import { PORTFOLIO_CONSTANTS } from "@/shared/domain/constants/portfolioConstants.constant";
import type { DistributionAsset } from "@/shared/domain/types/DistributionAsset.type";

// --- Constants ---

const { PERCENT_SCALE } = PORTFOLIO_CONSTANTS;

// --- Utils ---

export function validateDistributionAssets(assets: readonly DistributionAsset[]) {
  for (const asset of assets) {
    if (!Number.isFinite(asset.balance) || asset.balance < 0) {
      throw new RangeError("Asset balances must be non-negative numbers.");
    }

    if (!Number.isFinite(asset.annualReturnPct) || asset.annualReturnPct <= -PERCENT_SCALE) {
      throw new RangeError("Annual returns must be greater than -100%.");
    }
  }
}
