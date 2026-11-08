import type { INVESTMENT_CATEGORY_VALUES } from "@/shared/domain/types/investmentCategory.enum";

export type InvestmentCategory =
  (typeof INVESTMENT_CATEGORY_VALUES)[keyof typeof INVESTMENT_CATEGORY_VALUES];
