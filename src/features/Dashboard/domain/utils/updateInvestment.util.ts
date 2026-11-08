import type { Portfolio } from "@/shared/domain/types/Portfolio.type";
import type { Investment } from "@/shared/domain/types/Investment.type";

export function updateInvestment(
  portfolio: Portfolio,
  investmentId: string,
  updater: (investment: Investment) => Investment,
): Portfolio {
  return {
    ...portfolio,
    investments: portfolio.investments.map((investment) =>
      investment.id === investmentId ? updater(investment) : investment,
    ),
  };
}
