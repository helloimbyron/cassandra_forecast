import type { DistributionPoint } from "@/features/Portfolio/domain/types/DistributionPoint.type";

export type DistributionProjection = {
  points: DistributionPoint[];
  finalBalance: number;
  depletionMonth: number | null;
};
