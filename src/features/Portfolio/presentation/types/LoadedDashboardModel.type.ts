import type { Portfolio } from "@/features/Portfolio/domain/types/Portfolio.type";
import type { DashboardModel } from "@/features/Portfolio/presentation/types/DashboardModel.type";

export type LoadedDashboardModel = DashboardModel & { portfolio: Portfolio };
