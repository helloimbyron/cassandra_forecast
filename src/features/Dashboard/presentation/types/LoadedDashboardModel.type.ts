import type { Portfolio } from "@/shared/domain/types/Portfolio.type";
import type { DashboardModel } from "@/features/Dashboard/presentation/types/DashboardModel.type";

export type LoadedDashboardModel = DashboardModel & { portfolio: Portfolio };
