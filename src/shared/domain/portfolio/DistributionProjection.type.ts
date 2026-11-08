import type { DistributionPoint } from "@/shared/domain/portfolio/DistributionPoint.type";

export type DistributionProjection = {
  points: DistributionPoint[];
  finalBalance: number;
  depletionMonth: number | null;
};
