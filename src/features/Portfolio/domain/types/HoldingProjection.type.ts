import type { Holding } from "@/features/Portfolio/domain/types/Holding.type";
import type { ProjectionPoint } from "@/features/Portfolio/domain/types/ProjectionPoint.type";

export type HoldingProjection = {
  holding: Holding;
  points: ProjectionPoint[];
  finalValue: number;
  totalContributions: number;
};
