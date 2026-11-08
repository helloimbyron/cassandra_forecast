import type { Holding } from "@/shared/domain/types/Holding.type";
import type { ProjectionPoint } from "@/shared/domain/types/ProjectionPoint.type";

export type HoldingProjection = {
  holding: Holding;
  points: ProjectionPoint[];
  finalValue: number;
  totalContributions: number;
};
