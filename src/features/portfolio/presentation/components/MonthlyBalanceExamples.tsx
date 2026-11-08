import { copy } from "@/features/Portfolio/presentation/copy/MonthlyBalanceExamples.constant";
import { formatAbbreviatedValue } from "@/features/Portfolio/presentation/format/formatAbbreviatedValue.util";
import { texText } from "@/features/Portfolio/presentation/utils/texText.util";
import { FormulaMath } from "@/features/Portfolio/presentation/components/FormulaMath";
import { FormulaResult } from "@/features/Portfolio/presentation/components/FormulaResult";
import { PORTFOLIO_CONSTANTS } from "@/features/Portfolio/domain/portfolioConstants.constant";
import { monthlyInflationFactor } from "@/features/Portfolio/domain/monthlyInflationFactor.util";
import { FORMULA_EXAMPLE_CONSTANTS } from "@/features/Portfolio/presentation/formulaExampleConstants.constant";

// --- Constants ---

const { MONTHS_PER_YEAR } = PORTFOLIO_CONSTANTS;
const { FIRST_EXAMPLE_MONTH, SECOND_EXAMPLE_MONTH } = FORMULA_EXAMPLE_CONSTANTS;

// --- Components ---

export function MonthlyBalanceExamples({
  initialBalance,
  monthlyRate,
  monthlyRateDisplay,
  monthlyContribution,
  inflationRatePct = 0,
  months,
  finalLabel,
  finalValue,
}: {
  initialBalance: number;
  monthlyRate: number;
  monthlyRateDisplay: string;
  monthlyContribution: number;
  inflationRatePct?: number;
  months: number;
  finalLabel: string;
  finalValue: number;
}) {

  // --- Variables ---

  const shownMonths = new Set(
    [FIRST_EXAMPLE_MONTH, SECOND_EXAMPLE_MONTH, MONTHS_PER_YEAR, months].filter(
      (month) => month <= months,
    ),
  );
  const examples: Array<{ month: number; previous: number; balance: number }> = [];
  const monthlyInflation = monthlyInflationFactor(inflationRatePct);
  let balance = initialBalance;
  for (let month = 1; month <= months; month += 1) {
    const previous = balance;
    balance =
      previous * (1 + monthlyRate) + monthlyContribution / Math.pow(monthlyInflation, month);
    if (shownMonths.has(month)) {
      examples.push({ month, previous, balance });
    }
  }

  // --- Return ---

  return (
    <div className="formula-month-examples" role="list" aria-label={copy.ejemplosDelCalculoMesAMes}>
      {examples.map((example, index) => {
        const priorShownMonth = examples[index - 1]?.month ?? 0;
        const skipped = example.month - priorShownMonth - 1;
        const isLast = example.month === months;

        return (
          <div className="formula-month-example" role="listitem" key={example.month}>
            {skipped > 0 && (
              <p className="formula-month-gap">
                {copy.meses}
                {priorShownMonth + 1} {copy.al}
                {example.month - 1}
                {copy.seRepiteLaMismaOperacionUnoPor}
              </p>
            )}
            <strong className="formula-month-label">
              {copy.mes}
              {example.month}
              {isLast ? copy.lastMonth : ""}
            </strong>
            <FormulaMath
              label={copy.calculationForMonth(example.month)}
              className="formula-math-substitution"
              tex={`${texText(formatAbbreviatedValue(example.previous, "currency"))} \\times (1 + ${texText(monthlyRateDisplay)}) + ${texText(formatAbbreviatedValue(monthlyContribution, "currency"))}${inflationRatePct === 0 ? "" : ` \\div (1 + ${texText(formatAbbreviatedValue(inflationRatePct, "percent", "precise"))})^{${example.month}/12}`}`}
            />
            <FormulaResult
              name={isLast ? finalLabel : copy.valueAtMonth(example.month)}
              value={formatAbbreviatedValue(isLast ? finalValue : example.balance, "currency")}
              rounded
            />
          </div>
        );
      })}
    </div>
  );
}
