import type { DistributionAsset } from "./DistributionAsset.type";
import type { DistributionProjection } from "./DistributionProjection.type";

export type PortfolioDistributionProjection = DistributionProjection & {
  finalAssets: DistributionAsset[];
};
