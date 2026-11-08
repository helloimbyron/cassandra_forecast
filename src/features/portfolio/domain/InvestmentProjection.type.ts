import type { Investment } from "@/features/Portfolio/domain/Investment.type";
import type { HoldingProjection } from "@/features/Portfolio/domain/HoldingProjection.type";
import type { ProjectionPoint } from "@/features/Portfolio/domain/ProjectionPoint.type";

export type InvestmentProjection = {
  investment: Investment;
  holdings: HoldingProjection[];
  points: ProjectionPoint[];
  finalValue: number;
  initialValue: number;
  totalContributions: number;
  growth: number;
};
