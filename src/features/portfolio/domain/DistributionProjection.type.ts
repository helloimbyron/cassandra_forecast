import type { DistributionPoint } from "./DistributionPoint.type";

export type DistributionProjection = {
  points: DistributionPoint[];
  finalBalance: number;
  depletionMonth: number | null;
};
