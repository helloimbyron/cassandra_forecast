import type { RefCallback } from "react";
import { DashboardHeading } from "@/features/Dashboard/presentation/components/DashboardHeading";
import { HeroCard } from "@/features/Dashboard/presentation/components/HeroCard";
import { MetricsGrid } from "@/features/Dashboard/presentation/components/MetricsGrid";
import { OverviewGrid } from "@/features/Dashboard/presentation/components/OverviewGrid";
import { DistributionSection } from "@/features/Dashboard/presentation/components/DistributionSection";
import { InvestmentsSection } from "@/features/Dashboard/presentation/components/InvestmentsSection";
import { TableSection } from "@/features/Dashboard/presentation/components/TableSection";
import type { LoadedDashboardModel } from "@/features/Dashboard/presentation/types/LoadedDashboardModel.type";

export function DashboardPage({
  model,
  heroCardRef,
}: {
  model: LoadedDashboardModel;
  heroCardRef: RefCallback<HTMLElement>;
}) {
  return (
    <>
      <DashboardHeading model={model} />
      <HeroCard model={model} heroCardRef={heroCardRef} />
      <MetricsGrid model={model} />
      <OverviewGrid model={model} />
      <DistributionSection model={model} />
      <InvestmentsSection model={model} />
      <TableSection model={model} />
    </>
  );
}
