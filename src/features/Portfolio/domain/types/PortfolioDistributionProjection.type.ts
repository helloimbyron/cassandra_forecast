import type { DistributionAsset } from "@/features/Portfolio/domain/types/DistributionAsset.type";
import type { DistributionProjection } from "@/features/Portfolio/domain/types/DistributionProjection.type";

export type PortfolioDistributionProjection = DistributionProjection & {
  finalAssets: DistributionAsset[];
};
