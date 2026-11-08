import type { ReactNode } from "react";
import { Card } from "@/libraries/shadcn/components/cards/Card";
import { CardContent } from "@/libraries/shadcn/components/cards/CardContent";

export function Metric({
  icon,
  label,
  value,
  note,
  positive = false,
  tooltip,
}: {
  icon: ReactNode;
  label: string;
  value: ReactNode;
  note: ReactNode;
  positive?: boolean;
  tooltip?: ReactNode;
}) {
  return (
    <Card className="metric-card">
      <CardContent>
        <div className="metric-label">
          <span className="metric-label-icon">{icon}</span>
          <span className="metric-label-text">{label}</span>
        </div>
        <div className="metric-value-row">
          <strong className={positive ? "metric-positive" : ""}>{value}</strong>
          {tooltip}
        </div>
        <small>{note}</small>
      </CardContent>
    </Card>
  );
}
