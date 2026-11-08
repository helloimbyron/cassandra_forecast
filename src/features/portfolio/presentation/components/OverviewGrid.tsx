import type { LoadedDashboardModel } from "@/features/portfolio/presentation/hooks/usePortfolioDashboard";
import { PortfolioChartPanel } from "./PortfolioChartPanel";
import { AllocationPanel } from "./AllocationPanel";

export function OverviewGrid({ model }: { model: LoadedDashboardModel }) {
  return (
    <section className="overview-grid">
      <PortfolioChartPanel model={model} />
      <AllocationPanel model={model} />
    </section>
  );
}
