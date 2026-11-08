import type { DistributionPoint } from "@/shared/domain/types/DistributionPoint.type";

export type DistributionProjection = {
  points: DistributionPoint[];
  finalBalance: number;
  depletionMonth: number | null;
};
