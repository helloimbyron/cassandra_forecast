import { copy } from "@/features/Dashboard/presentation/constants/InvestmentsSection.constant";
import type { LoadedDashboardModel } from "@/features/Dashboard/presentation/types/LoadedDashboardModel.type";
import { InvestmentCard } from "@/features/Dashboard/presentation/components/InvestmentCard";

// --- Components ---

export function InvestmentsSection({ model }: { model: LoadedDashboardModel }) {
  // --- Variables ---

  const { portfolio } = model;

  // --- Return ---

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
