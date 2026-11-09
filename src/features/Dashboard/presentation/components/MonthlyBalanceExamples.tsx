import "./MonthlyBalanceExamples.css.ts";
import { monthlyBalanceExamplesCopy } from "@/features/Dashboard/presentation/copies/monthlyBalanceExamples.copy";
import { formatAbbreviatedValue } from "@/features/Dashboard/presentation/formatters/formatAbbreviatedValue.util";
import { texText } from "@/features/Dashboard/presentation/utils/texText.util";
import { FormulaMath } from "@/features/Dashboard/presentation/components/FormulaMath";
import { FormulaResult } from "@/features/Dashboard/presentation/components/FormulaResult";
import { PORTFOLIO_CONSTANTS } from "@/shared/domain/constants/portfolioConstants.constant";
import { monthlyInflationFactor } from "@/features/Dashboard/domain/utils/monthlyInflationFactor.util";
import { FORMULA_EXAMPLE_CONSTANTS } from "@/features/Dashboard/presentation/constants/formulaExampleConstants.constant";

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
    <div
      className="formula-month-examples"
      role="list"
      aria-label={monthlyBalanceExamplesCopy.monthByMonthCalculationExamples}
    >
      {examples.map((example, index) => {
        const priorShownMonth = examples[index - 1]?.month ?? 0;
        const skipped = example.month - priorShownMonth - 1;
        const isLast = example.month === months;

        return (
          <div className="formula-month-example" role="listitem" key={example.month}>
            {skipped > 0 && (
              <p className="formula-month-gap">
                {monthlyBalanceExamplesCopy.months}
                {priorShownMonth + 1} {monthlyBalanceExamplesCopy.to}
                {example.month - 1}
                {monthlyBalanceExamplesCopy.repeatCalculationOneAtATime}
              </p>
            )}
            <strong className="formula-month-label">
              {monthlyBalanceExamplesCopy.month}
              {example.month}
              {isLast ? monthlyBalanceExamplesCopy.lastMonth : ""}
            </strong>
            <FormulaMath
              label={monthlyBalanceExamplesCopy.calculationForMonth(example.month)}
              className="formula-math-substitution"
              tex={`${texText(formatAbbreviatedValue(example.previous, "currency"))} \\times (1 + ${texText(monthlyRateDisplay)}) + ${texText(formatAbbreviatedValue(monthlyContribution, "currency"))}${inflationRatePct === 0 ? "" : ` \\div (1 + ${texText(formatAbbreviatedValue(inflationRatePct, "percent", "precise"))})^{${example.month}/12}`}`}
            />
            <FormulaResult
              name={isLast ? finalLabel : monthlyBalanceExamplesCopy.valueAtMonth(example.month)}
              value={formatAbbreviatedValue(isLast ? finalValue : example.balance, "currency")}
              rounded
            />
          </div>
        );
      })}
    </div>
  );
}
