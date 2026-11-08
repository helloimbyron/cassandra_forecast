export const INVESTMENT_CATEGORIES = [
  "policy",
  "business",
  "etf",
  "crypto",
  "savings",
  "commodity",
  "cash",
  "other",
] as const;
export type InvestmentCategory = (typeof INVESTMENT_CATEGORIES)[number];
