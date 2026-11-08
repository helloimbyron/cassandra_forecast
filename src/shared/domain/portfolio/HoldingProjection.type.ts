import type { Holding } from "@/shared/domain/portfolio/Holding.type";
import type { ProjectionPoint } from "@/shared/domain/portfolio/ProjectionPoint.type";

export type HoldingProjection = {
  holding: Holding;
  points: ProjectionPoint[];
  finalValue: number;
  totalContributions: number;
};
