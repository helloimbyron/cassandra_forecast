import type { ReactNode } from "react";
import { Card, CardContent } from "@/design-system/components/Card";

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
