import type { InvestmentCategory } from "@/shared/domain/types/InvestmentCategory.type";
import { labels } from "@/features/Dashboard/presentation/copies/labels.copy";

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
