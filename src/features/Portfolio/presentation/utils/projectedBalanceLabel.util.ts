import { labels } from "@/features/Portfolio/presentation/constants/labels.constant";

export function projectedBalanceLabel(real: boolean) {

  return real ? labels.projectedValueReal : labels.projectedValueNominal;
}
