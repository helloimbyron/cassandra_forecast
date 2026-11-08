import type { Investment } from "@/shared/domain/types/Investment.type";
import type { HoldingProjection } from "@/shared/domain/types/HoldingProjection.type";
import type { ProjectionPoint } from "@/shared/domain/types/ProjectionPoint.type";

export type InvestmentProjection = {
  investment: Investment;
  holdings: HoldingProjection[];
  points: ProjectionPoint[];
  finalValue: number;
  initialValue: number;
  totalContributions: number;
  growth: number;
};
