import { labels, projectedBalanceLabel } from "../copy/labels";
import { copy } from "../copy/InvestmentCard";
import type { Investment } from "@/lib/portfolio";
import type { HoldingProjection } from "../../domain/holding-projection";
import type { DashboardModel } from "../hooks/usePortfolioDashboard";
import { AbbreviatedMoney } from "@/components/MoneyAmount";
import { NumericUnitInput } from "@/components/financial/NumericUnitInput";
import { ProjectedValueFormulaTooltip } from "./ProjectedValueFormulaTooltip";
import { PROJECTION_SCOPE } from "../projection-scope";
import { MIN_CONTRIBUTION } from "../../domain/portfolio-constants";

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
  const { holding, finalValue, totalContributions } = projection;
  const projectedLabel = projectedBalanceLabel(realMode);
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
              scope={PROJECTION_SCOPE.position}
              holdingLabel={holding.label}
            />
          )}
        </div>
      </div>
    </div>
  );
}
