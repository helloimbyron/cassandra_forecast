import {
  Banknote,
  Bitcoin,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  Coins,
  PiggyBank,
  ShieldCheck,
} from "lucide-react";
import type { InvestmentCategory } from "@/shared/domain/types/InvestmentCategory.type";

// --- Constants ---

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

// --- Utils ---

export function categoryIcon(category: InvestmentCategory) {
  return CATEGORY_ICONS[category];
}
