import * as veHoldingRowStyles from "./HoldingRow.css.ts";
import { labels } from "@/features/Dashboard/presentation/copies/labels.copy";
import { projectedBalanceLabel } from "@/features/Dashboard/domain/utils/projectedBalanceLabel.util";
import { investmentCardCopy } from "@/features/Dashboard/presentation/copies/investmentCard.copy";
import type { Investment } from "@/shared/domain/types/Investment.type";
import type { HoldingProjection } from "@/shared/domain/types/HoldingProjection.type";
import type { DashboardModel } from "@/features/Dashboard/presentation/types/DashboardModel.type";
import { AbbreviatedMoney } from "@/features/Dashboard/presentation/components/money/AbbreviatedMoney";
import { NumericUnitInput } from "@/features/Dashboard/presentation/components/NumericUnitInput";
import { ProjectedValueFormulaTooltip } from "@/features/Dashboard/presentation/components/ProjectedValueFormulaTooltip";
import { PROJECTION_SCOPE_VALUES } from "@/features/Dashboard/presentation/enums/projectionScope.enum";
import { PORTFOLIO_CONSTANTS } from "@/shared/domain/constants/portfolioConstants.constant";

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
    <div
      className={[veHoldingRowStyles.holdingRow, "holding-row"].filter(Boolean).join(" ")}
      role="row"
    >
      <div
        className={[
          veHoldingRowStyles.holdingCell,
          veHoldingRowStyles.holdingPosition,
          "holding-cell",
        ]
          .filter(Boolean)
          .join(" ")}
        role="rowheader"
      >
        <span className={veHoldingRowStyles.holdingCellLabel}>{labels.position}</span>
        <strong>{holding.label}</strong>
      </div>
      <div
        className={[veHoldingRowStyles.holdingCell, "holding-cell"].filter(Boolean).join(" ")}
        role="cell"
      >
        <span className={veHoldingRowStyles.holdingCellLabel}>{labels.currentValue}</span>
        <strong>
          <AbbreviatedMoney value={holding.currentValue} />
        </strong>
      </div>
      <div
        className={[
          veHoldingRowStyles.holdingCell,
          veHoldingRowStyles.holdingContribution,
          "holding-cell",
        ]
          .filter(Boolean)
          .join(" ")}
        role="cell"
      >
        <label
          className={veHoldingRowStyles.holdingCellLabel}
          htmlFor={`contribution-${holding.id}`}
        >
          {labels.monthlyContribution}
        </label>
        <NumericUnitInput
          id={`contribution-${holding.id}`}
          label={investmentCardCopy.contributionFor(holding.label)}
          unit="money"
          min={MIN_CONTRIBUTION}
          value={holding.monthlyContribution}
          onChange={(value) => setContribution(investment.id, holding.id, String(value))}
        />
      </div>
      <div
        className={[veHoldingRowStyles.holdingCell, "holding-cell"].filter(Boolean).join(" ")}
        role="cell"
      >
        <span className={veHoldingRowStyles.holdingCellLabel}>{labels.totalContributed}</span>
        <strong>
          <AbbreviatedMoney value={totalContributions} />
        </strong>
      </div>
      <div
        className={[veHoldingRowStyles.holdingCell, "holding-cell"].filter(Boolean).join(" ")}
        role="cell"
      >
        <span className={veHoldingRowStyles.holdingCellLabel}>
          {years === 0 ? labels.currentValue : projectedLabel}
        </span>
        <div className={veHoldingRowStyles.holdingProjectionValue}>
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
