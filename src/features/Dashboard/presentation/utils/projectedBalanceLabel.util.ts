import { labels } from "@/features/Dashboard/presentation/constants/labels.constant";

export function projectedBalanceLabel(real: boolean) {
  return real ? labels.projectedValueReal : labels.projectedValueNominal;
}
