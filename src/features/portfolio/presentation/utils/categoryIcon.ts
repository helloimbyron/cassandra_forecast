import {
  Banknote,
  Bitcoin,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  Coins,
  PiggyBank,
  ShieldCheck,
} from "lucide-react";
import type { InvestmentCategory } from "../../domain/investment-category";

const CATEGORY_ICONS = {
  policy: ShieldCheck,
  business: BriefcaseBusiness,
  etf: ChartNoAxesCombined,
  crypto: Bitcoin,
  savings: PiggyBank,
  commodity: Coins,
  cash: Banknote,
  other: Banknote,
} satisfies Record<InvestmentCategory, typeof Banknote>;

export function categoryIcon(category: InvestmentCategory) {
  return CATEGORY_ICONS[category];
}
