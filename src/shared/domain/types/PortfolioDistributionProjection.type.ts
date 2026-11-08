import type { DistributionAsset } from "@/shared/domain/types/DistributionAsset.type";
import type { DistributionProjection } from "@/shared/domain/types/DistributionProjection.type";

export type PortfolioDistributionProjection = DistributionProjection & {
  finalAssets: DistributionAsset[];
};
