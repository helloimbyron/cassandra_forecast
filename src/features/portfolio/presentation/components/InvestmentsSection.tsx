import { copy } from "../copy/InvestmentsSection";
import type { LoadedDashboardModel } from "@/features/portfolio/presentation/hooks/usePortfolioDashboard";
import { InvestmentCard } from "./InvestmentCard";

export function InvestmentsSection({ model }: { model: LoadedDashboardModel }) {
  const { portfolio } = model;
  return (
    <section className="investments-section" aria-label={copy.investmentDetail}>
      <div className="section-heading">
        <div className="eyebrow">
          <span className="eyebrow-line" /> {copy.investmentDetail}
        </div>
      </div>
      <div className="investment-grid">
        {portfolio.investments.map((investment, index) => (
          <InvestmentCard key={investment.id} investment={investment} index={index} model={model} />
        ))}
      </div>
    </section>
  );
}
