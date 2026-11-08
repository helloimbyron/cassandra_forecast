import type { Portfolio } from "./Portfolio.type";
import type { Investment } from "./Investment.type";

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
