import { labels } from "@/features/Dashboard/presentation/constants/labels.constant";
import { projectedBalanceLabel } from "@/features/Dashboard/presentation/utils/projectedBalanceLabel.util";
import { copy } from "@/features/Dashboard/presentation/constants/InvestmentCard.constant";
import type { Investment } from "@/shared/domain/portfolio/Investment.type";
import type { HoldingProjection } from "@/shared/domain/portfolio/HoldingProjection.type";
import type { DashboardModel } from "@/features/Dashboard/presentation/types/DashboardModel.type";
import { AbbreviatedMoney } from "@/features/Dashboard/presentation/components/money/AbbreviatedMoney";
import { NumericUnitInput } from "@/features/Dashboard/presentation/components/NumericUnitInput";
import { ProjectedValueFormulaTooltip } from "@/features/Dashboard/presentation/components/ProjectedValueFormulaTooltip";
import { PROJECTION_SCOPE_VALUES } from "@/features/Dashboard/presentation/enums/projectionScope.enum";
import { PORTFOLIO_CONSTANTS } from "@/shared/domain/portfolio/portfolioConstants.constant";

// --- Constants ---

const { MIN_CONTRIBUTION } = PORTFOLIO_CONSTANTS;

// --- Components ---

export function HoldingRow({
  projection,
  investment,
  years,
  inflationRatePct = 0,
  realMode = inflationRatePct > 0,
  setContribution,
}: {
  projection: HoldingProjection;
  investment: Investment;
  years: number;
  inflationRatePct?: number;
  realMode?: boolean;
  setContribution: DashboardModel["setContribution"];
}) {
  // --- Variables ---

  const { holding, finalValue, totalContributions } = projection;
  const projectedLabel = projectedBalanceLabel(realMode);

  // --- Return ---

  return (
    <div className="holding-row" role="row">
      <div className="holding-cell holding-position" role="rowheader">
        <span className="holding-cell-label">{labels.position}</span>
        <strong>{holding.label}</strong>
      </div>
      <div className="holding-cell" role="cell">
        <span className="holding-cell-label">{labels.currentValue}</span>
        <strong>
          <AbbreviatedMoney value={holding.currentValue} />
        </strong>
      </div>
      <div className="holding-cell holding-contribution" role="cell">
        <label className="holding-cell-label" htmlFor={`contribution-${holding.id}`}>
          {labels.monthlyContribution}
        </label>
        <NumericUnitInput
          id={`contribution-${holding.id}`}
          label={copy.contributionFor(holding.label)}
          unit="money"
          min={MIN_CONTRIBUTION}
          value={holding.monthlyContribution}
          onChange={(value) => setContribution(investment.id, holding.id, String(value))}
        />
      </div>
      <div className="holding-cell holding-total-contributions" role="cell">
        <span className="holding-cell-label">{labels.totalContributed}</span>
        <strong>
          <AbbreviatedMoney value={totalContributions} />
        </strong>
      </div>
      <div className="holding-cell" role="cell">
        <span className="holding-cell-label">
          {years === 0 ? labels.currentValue : projectedLabel}
        </span>
        <div className="holding-projection-value">
          <strong>
            <AbbreviatedMoney value={finalValue} />
          </strong>
          {years > 0 && (
            <ProjectedValueFormulaTooltip
              annualRatePct={investment.annualRatePct}
              inflationRatePct={inflationRatePct}
              realMode={realMode}
              currentValue={holding.currentValue}
              monthlyContribution={holding.monthlyContribution}
              projectedFinalValue={finalValue}
              years={years}
              scope={PROJECTION_SCOPE_VALUES.position}
              holdingLabel={holding.label}
            />
          )}
        </div>
      </div>
    </div>
  );
}
