import type { Investment } from "./investment-schema";
import type { HoldingProjection } from "./holding-projection";
import type { ProjectionPoint } from "./projection-point";

export interface InvestmentProjection {
  investment: Investment;
  holdings: HoldingProjection[];
  points: ProjectionPoint[];
  finalValue: number;
  initialValue: number;
  totalContributions: number;
  growth: number;
}
