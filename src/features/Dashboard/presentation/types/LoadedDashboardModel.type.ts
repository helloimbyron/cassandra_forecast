import type { Portfolio } from "@/shared/domain/portfolio/Portfolio.type";
import type { DashboardModel } from "@/features/Dashboard/presentation/types/DashboardModel.type";

export type LoadedDashboardModel = DashboardModel & { portfolio: Portfolio };
