import type { useDashboardModel } from "@/features/Dashboard/presentation/hooks/useDashboardModel";
import type { PortfolioImportController } from "@/shared/presentation/types/PortfolioImportController.type";

export type DashboardModel = ReturnType<typeof useDashboardModel> &
  Pick<PortfolioImportController, "error" | "fileInput" | "onFileChange">;
