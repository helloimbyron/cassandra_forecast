import * as veOverviewGridStyles from "./OverviewGrid.css.ts";
import type { LoadedDashboardModel } from "@/features/Dashboard/presentation/types/LoadedDashboardModel.type";
import { PortfolioChartPanel } from "@/features/Dashboard/presentation/components/PortfolioChartPanel";
import { AllocationPanel } from "@/features/Dashboard/presentation/components/AllocationPanel";

export function OverviewGrid({ model }: { model: LoadedDashboardModel }) {
  return (
    <section className={veOverviewGridStyles.overviewGrid} data-testid="dashboard-overview-grid">
      <PortfolioChartPanel model={model} />
      <AllocationPanel model={model} />
    </section>
  );
}
