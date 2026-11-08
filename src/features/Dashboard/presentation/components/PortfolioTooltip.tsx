import { labels } from "@/features/Dashboard/presentation/copies/labels.copy";
import { AbbreviatedMoney } from "@/features/Dashboard/presentation/components/money/AbbreviatedMoney";

// --- Components ---

export function PortfolioTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name?: string; value?: number; color?: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) {
    return null;
  }

  // --- Variables ---

  const items = [...payload]
    .reverse()
    .filter(
      (item) =>
        item.name === labels.projectedValue ||
        item.name === labels.projectedValueNominal ||
        item.name === labels.projectedValueReal ||
        item.name === labels.totalInvested,
    );
  if (!items.length) {
    return null;
  }

  // --- Return ---

  return (
    <div className="chart-tooltip">
      <span>{label}</span>
      {items.map((item) => (
        <div key={item.name} style={{ color: item.color }}>
          <i style={{ background: item.color }} />
          {item.name}
          <strong>
            <AbbreviatedMoney value={item.value ?? 0} interaction="text" />
          </strong>
        </div>
      ))}
    </div>
  );
}
