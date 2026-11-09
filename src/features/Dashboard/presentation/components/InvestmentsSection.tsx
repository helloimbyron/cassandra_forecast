import "./InvestmentsSection.css.ts";
import { investmentsSectionCopy } from "@/features/Dashboard/presentation/copies/investmentsSection.copy";
import type { LoadedDashboardModel } from "@/features/Dashboard/presentation/types/LoadedDashboardModel.type";
import { InvestmentCard } from "@/features/Dashboard/presentation/components/InvestmentCard";

// --- Components ---

export function InvestmentsSection({ model }: { model: LoadedDashboardModel }) {
  // --- Variables ---

  const { portfolio } = model;

  // --- Return ---

  return (
    <section className="investments-section" aria-label={investmentsSectionCopy.investmentDetail}>
      <div className="section-heading">
        <div className="eyebrow">
          <span className="eyebrow-line" /> {investmentsSectionCopy.investmentDetail}
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
