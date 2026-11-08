import { copy } from "../copy/MonthlyBalanceExamples";
import { formatAbbreviatedValue } from "@/shared/format/format-abbreviated-value";
import { texText } from "../utils/texText";
import { FormulaMath } from "./FormulaMath";
import { FormulaResult } from "./FormulaResult";
import { MONTHS_PER_YEAR } from "../../domain/portfolio-constants";
import { monthlyInflationFactor } from "../../domain/real-rate";
import { FIRST_EXAMPLE_MONTH, SECOND_EXAMPLE_MONTH } from "../formula-example-constants";

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
    if (shownMonths.has(month)) examples.push({ month, previous, balance });
  }

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
