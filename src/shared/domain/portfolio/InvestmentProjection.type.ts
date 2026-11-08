import type { Investment } from "@/shared/domain/portfolio/Investment.type";
import type { HoldingProjection } from "@/shared/domain/portfolio/HoldingProjection.type";
import type { ProjectionPoint } from "@/shared/domain/portfolio/ProjectionPoint.type";

export type InvestmentProjection = {
  investment: Investment;
  holdings: HoldingProjection[];
  points: ProjectionPoint[];
  finalValue: number;
  initialValue: number;
  totalContributions: number;
  growth: number;
};
