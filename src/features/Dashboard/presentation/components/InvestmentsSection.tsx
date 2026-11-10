import * as veDashboardPrimitivesStyles from "./DashboardPrimitives.css.ts";
import * as veInvestmentsSectionStyles from "./InvestmentsSection.css.ts";
import { investmentsSectionCopy } from "@/features/Dashboard/presentation/copies/investmentsSection.copy";
import type { LoadedDashboardModel } from "@/features/Dashboard/presentation/types/LoadedDashboardModel.type";
import { InvestmentCard } from "@/features/Dashboard/presentation/components/InvestmentCard";

// --- Components ---

export function InvestmentsSection({ model }: { model: LoadedDashboardModel }) {
  // --- Variables ---

  const { portfolio } = model;

  // --- Return ---

  return (
    <section
      className={veInvestmentsSectionStyles.investmentsSection}
      data-testid="dashboard-investments-section"
      aria-label={investmentsSectionCopy.investmentDetail}
    >
      <div className={veDashboardPrimitivesStyles.sectionHeading}>
        <div className={[veDashboardPrimitivesStyles.eyebrow, "eyebrow"].filter(Boolean).join(" ")}>
          <span className={veDashboardPrimitivesStyles.eyebrowLine} />{" "}
          {investmentsSectionCopy.investmentDetail}
        </div>
      </div>
      <div
        className={[veInvestmentsSectionStyles.investmentGrid, "investment-grid"]
          .filter(Boolean)
          .join(" ")}
      >
        {portfolio.investments.map((investment, index) => (
          <InvestmentCard key={investment.id} investment={investment} index={index} model={model} />
        ))}
      </div>
    </section>
  );
}
