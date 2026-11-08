import type { LoadedDashboardModel } from "@/features/Portfolio/presentation/hooks/usePortfolioDashboard";
import { PortfolioChartPanel } from "@/features/Portfolio/presentation/components/PortfolioChartPanel";
import { AllocationPanel } from "@/features/Portfolio/presentation/components/AllocationPanel";

export function OverviewGrid({ model }: { model: LoadedDashboardModel }) {

  return (
    <section className="overview-grid">
      <PortfolioChartPanel model={model} />
      <AllocationPanel model={model} />
    </section>
  );
}
