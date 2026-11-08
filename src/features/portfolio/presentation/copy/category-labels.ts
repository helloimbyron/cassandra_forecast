import type { InvestmentCategory } from "../../domain/investment-category";
import { labels } from "./labels";

export const categoryLabels: Record<InvestmentCategory, string> = {
  policy: labels.policy,
  business: labels.investment,
  etf: labels.etf,
  crypto: labels.crypto,
  savings: labels.savings,
  commodity: labels.commodity,
  cash: labels.cash,
  other: labels.other,
};
