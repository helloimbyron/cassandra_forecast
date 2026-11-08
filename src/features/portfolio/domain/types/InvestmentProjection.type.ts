import type { Investment } from "@/features/Portfolio/domain/types/Investment.type";
import type { HoldingProjection } from "@/features/Portfolio/domain/types/HoldingProjection.type";
import type { ProjectionPoint } from "@/features/Portfolio/domain/types/ProjectionPoint.type";

export type InvestmentProjection = {
  investment: Investment;
  holdings: HoldingProjection[];
  points: ProjectionPoint[];
  finalValue: number;
  initialValue: number;
  totalContributions: number;
  growth: number;
};
