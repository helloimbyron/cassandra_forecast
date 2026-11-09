import { useEffect, useRef, useState } from "react";
import { ChevronDown, Columns3 } from "lucide-react";
import { labels } from "@/features/Dashboard/presentation/copies/labels.copy";
import { projectedBalanceLabel } from "@/features/Dashboard/domain/utils/projectedBalanceLabel.util";
import { tableSectionCopy } from "@/features/Dashboard/presentation/copies/tableSection.copy";
import type { LoadedDashboardModel } from "@/features/Dashboard/presentation/types/LoadedDashboardModel.type";
import { Card } from "@/libraries/shadcn/components/cards/Card";
import { CardContent } from "@/libraries/shadcn/components/cards/CardContent";
import { AbbreviatedMoney } from "@/features/Dashboard/presentation/components/money/AbbreviatedMoney";
import { getVisibleInvestmentTotal } from "@/features/Dashboard/presentation/utils/getVisibleInvestmentTotal.util";

// --- Components ---

export function TableSection({ model }: { model: LoadedDashboardModel }) {
  // --- Variables ---

  const { portfolio, chartData, withInflation } = model;
  const projectedLabel = projectedBalanceLabel(withInflation);

  // --- States ---

  const columnPickerRef = useRef<HTMLDetailsElement>(null);
  const [hiddenInvestmentIds, setHiddenInvestmentIds] = useState<Set<string>>(() => new Set());
  const visibleInvestments = portfolio.investments.filter(
    (investment) => !hiddenInvestmentIds.has(investment.id),
  );

  // --- Effects ---

  useEffect(() => {
    function closeColumnPickerOnOutsidePointer(event: PointerEvent) {
      const picker = columnPickerRef.current;
      if (picker?.open && event.target instanceof Node && !picker.contains(event.target)) {
        picker.open = false;
      }
    }

    document.addEventListener("pointerdown", closeColumnPickerOnOutsidePointer);

    return () => document.removeEventListener("pointerdown", closeColumnPickerOnOutsidePointer);
  }, []);

  // --- Handlers ---

  function toggleInvestment(investmentId: string) {
    setHiddenInvestmentIds((current) => {
      const next = new Set(current);
      if (next.has(investmentId)) {
        next.delete(investmentId);
      } else {
        next.add(investmentId);
      }

      return next;
    });
  }

  // --- Return ---

  return (
    <section className="table-section" aria-label={tableSectionCopy.yearByYearProgression}>
      <div className="section-heading table-section-heading">
        <div className="eyebrow">
          <span className="eyebrow-line" /> {tableSectionCopy.yearByYearProgression}
        </div>
        <div className="table-controls">
          <details ref={columnPickerRef} className="table-column-picker">
            <summary aria-label={tableSectionCopy.selectColumns}>
              <Columns3 className="icon-sm" aria-hidden="true" />
              <span>
                {tableSectionCopy.columns}
                <small>
                  {tableSectionCopy.visibleColumnsSummary(
                    visibleInvestments.length,
                    portfolio.investments.length,
                  )}
                </small>
              </span>
              <ChevronDown className="icon-sm" aria-hidden="true" />
            </summary>
            <div
              className="table-column-options"
              role="group"
              aria-label={tableSectionCopy.selectColumns}
            >
              {portfolio.investments.map((investment) => {
                const visible = !hiddenInvestmentIds.has(investment.id);

                return (
                  <label key={investment.id} className="table-column-option">
                    <input
                      type="checkbox"
                      checked={visible}
                      onChange={() => toggleInvestment(investment.id)}
                      aria-label={tableSectionCopy.showInvestmentColumn(investment.name)}
                    />
                    <span>{investment.name}</span>
                  </label>
                );
              })}
            </div>
          </details>
        </div>
      </div>
      <Card className="panel-card">
        <CardContent>
          <div className="table-scroll">
            <table
              aria-describedby="year-table-caption"
              style={{
                minWidth: `calc(${visibleInvestments.length + 2} * var(--table-column-min-width))`,
              }}
            >
              <caption id="year-table-caption" className="visually-hidden">
                {tableSectionCopy.accessibleProjectionTable(projectedLabel)}
              </caption>
              <thead>
                <tr>
                  <th id="year-column-heading" scope="col">
                    {tableSectionCopy.year}
                  </th>
                  {visibleInvestments.map((investment, investmentIndex) => (
                    <th
                      id={`investment-column-${investmentIndex}`}
                      className="table-investment-heading"
                      scope="col"
                      key={investment.id}
                    >
                      {investment.name}
                    </th>
                  ))}
                  <th id="total-column-heading" className="table-total-heading" scope="col">
                    {tableSectionCopy.total}
                  </th>
                </tr>
              </thead>
              <tbody>
                {chartData.map((row, index) => (
                  <tr
                    key={index}
                    className={
                      index > 0 && index === chartData.length - 1 ? "table-final-row" : undefined
                    }
                  >
                    <th
                      id={`year-row-${index}`}
                      scope="row"
                      headers="year-column-heading"
                      className="table-year"
                    >
                      {index === 0 ? labels.today : tableSectionCopy.yearNumber(index)}
                    </th>
                    {visibleInvestments.map((investment, investmentIndex) => (
                      <td
                        key={investment.id}
                        headers={`year-row-${index} investment-column-${investmentIndex}`}
                      >
                        <AbbreviatedMoney value={Number(row[investment.id])} />
                      </td>
                    ))}
                    <td className="table-total" headers={`year-row-${index} total-column-heading`}>
                      <AbbreviatedMoney
                        value={getVisibleInvestmentTotal(
                          row,
                          visibleInvestments.map((investment) => investment.id),
                        )}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
