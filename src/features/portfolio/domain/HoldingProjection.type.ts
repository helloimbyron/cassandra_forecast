import type { Holding } from "@/features/Portfolio/domain/Holding.type";
import type { ProjectionPoint } from "@/features/Portfolio/domain/ProjectionPoint.type";

export type HoldingProjection = {
  holding: Holding;
  points: ProjectionPoint[];
  finalValue: number;
  totalContributions: number;
};
