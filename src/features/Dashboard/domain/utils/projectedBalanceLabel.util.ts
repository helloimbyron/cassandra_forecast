import { labels } from "@/features/Dashboard/presentation/copies/labels.copy";

export function projectedBalanceLabel(real: boolean) {
  return real ? labels.projectedValueReal : labels.projectedValueNominal;
}
