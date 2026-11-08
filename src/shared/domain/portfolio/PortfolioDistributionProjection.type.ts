import type { DistributionAsset } from "@/shared/domain/portfolio/DistributionAsset.type";
import type { DistributionProjection } from "@/shared/domain/portfolio/DistributionProjection.type";

export type PortfolioDistributionProjection = DistributionProjection & {
  finalAssets: DistributionAsset[];
};
