import type { Holding } from "./holding-schema";
import type { ProjectionPoint } from "./projection-point";

export interface HoldingProjection {
  holding: Holding;
  points: ProjectionPoint[];
  finalValue: number;
  totalContributions: number;
}
