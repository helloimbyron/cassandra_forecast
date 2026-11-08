import { labels } from "../copy/labels.constant";

export function projectedBalanceLabel(real: boolean) {

  return real ? labels.projectedValueReal : labels.projectedValueNominal;
}
