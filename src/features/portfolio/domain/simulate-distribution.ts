import {
  MAX_HORIZON_YEARS,
  MIN_HORIZON_YEARS,
  MONTHS_PER_YEAR,
  PERCENT_SCALE,
} from "./portfolio-constants";

export type DistributionPoint = { year: number; balance: number };

export type DistributionProjection = {
  points: DistributionPoint[];
  finalBalance: number;
  depletionMonth: number | null;
};

export type DistributionAsset = {
  balance: number;
  annualReturnPct: number;
};

export type PortfolioDistributionProjection = DistributionProjection & {
  finalAssets: DistributionAsset[];
};

const MAX_ADDITIONAL_DEPLETION_MONTHS = 12_000;

function validateDistributionAssets(assets: readonly DistributionAsset[]) {
  for (const asset of assets) {
    if (!Number.isFinite(asset.balance) || asset.balance < 0)
      throw new RangeError("Asset balances must be non-negative numbers.");
    if (!Number.isFinite(asset.annualReturnPct) || asset.annualReturnPct <= -PERCENT_SCALE)
      throw new RangeError("Annual returns must be greater than -100%.");
  }
}

function grownAssetBalances(assets: readonly DistributionAsset[], balances: number[]) {
  return assets.map((asset, index) => {
    const monthlyRate =
      Math.pow(1 + asset.annualReturnPct / PERCENT_SCALE, 1 / MONTHS_PER_YEAR) - 1;
    return balances[index]! * (1 + monthlyRate);
  });
}

function withdrawProRata(grownBalances: number[], monthlyWithdrawal: number) {
  const availableBalance = grownBalances.reduce((sum, balance) => sum + balance, 0);
  if (availableBalance <= monthlyWithdrawal) return grownBalances.map(() => 0);
  const remainingShare = (availableBalance - monthlyWithdrawal) / availableBalance;
  return grownBalances.map((balance) => balance * remainingShare);
}

/**
 * Simulates each position at its own effective annual return, then withdraws
 * the selected amount proportionally from all positions after monthly growth.
 */
export function simulatePortfolioDistribution(
  assets: readonly DistributionAsset[],
  monthlyWithdrawal: number,
  years: number,
): PortfolioDistributionProjection {
  validateDistributionAssets(assets);
  if (!Number.isFinite(monthlyWithdrawal) || monthlyWithdrawal < 0)
    throw new RangeError("Monthly withdrawal must be a non-negative number.");
  if (!Number.isInteger(years) || years < MIN_HORIZON_YEARS || years > MAX_HORIZON_YEARS)
    throw new RangeError("Distribution horizon must be between 0 and 40 whole years.");

  const initialBalances = assets.map((asset) => asset.balance);
  const initialBalance = initialBalances.reduce((sum, balance) => sum + balance, 0);
  const points: DistributionPoint[] = [{ year: 0, balance: initialBalance }];
  let balances = initialBalances;
  let depletionMonth: number | null = initialBalance === 0 ? 0 : null;

  for (let month = 1; month <= years * MONTHS_PER_YEAR; month += 1) {
    const grownBalances = grownAssetBalances(assets, balances);
    const availableBalance = grownBalances.reduce((sum, balance) => sum + balance, 0);
    balances = withdrawProRata(grownBalances, monthlyWithdrawal);
    const balance = balances.reduce((sum, item) => sum + item, 0);
    if (balance === 0 && depletionMonth === null) depletionMonth = month;
    if (availableBalance <= monthlyWithdrawal && depletionMonth === null) depletionMonth = month;
    if (month % MONTHS_PER_YEAR === 0) points.push({ year: month / MONTHS_PER_YEAR, balance });
  }

  return {
    points,
    finalBalance: balances.reduce((sum, balance) => sum + balance, 0),
    depletionMonth,
    finalAssets: assets.map((asset, index) => ({ ...asset, balance: balances[index]! })),
  };
}

/**
 * Estimates additional proportional end-of-month withdrawals for a portfolio
 * with heterogeneous returns. A 1,000-year guard avoids unbounded loops.
 */
export function estimateAdditionalPortfolioDepletionMonths(
  assets: readonly DistributionAsset[],
  monthlyWithdrawal: number,
): number | null {
  validateDistributionAssets(assets);
  if (!Number.isFinite(monthlyWithdrawal) || monthlyWithdrawal < 0)
    throw new RangeError("Monthly withdrawal must be a non-negative number.");

  let balances = assets.map((asset) => asset.balance);
  if (balances.reduce((sum, balance) => sum + balance, 0) === 0) return 0;
  if (monthlyWithdrawal === 0) return null;

  for (let month = 1; month <= MAX_ADDITIONAL_DEPLETION_MONTHS; month += 1) {
    const grownBalances = grownAssetBalances(assets, balances);
    const availableBalance = grownBalances.reduce((sum, balance) => sum + balance, 0);
    if (availableBalance <= monthlyWithdrawal) return month;
    balances = withdrawProRata(grownBalances, monthlyWithdrawal);
  }

  return null;
}

/**
 * Estimates how many additional end-of-month withdrawals a balance can support.
 * Returns null when the balance never reaches zero under the selected rate and
 * withdrawal (for example, when growth offsets the withdrawals indefinitely).
 */
export function estimateAdditionalDepletionMonths(
  initialBalance: number,
  monthlyWithdrawal: number,
  annualReturnPct: number,
): number | null {
  if (!Number.isFinite(initialBalance) || initialBalance < 0)
    throw new RangeError("Initial balance must be a non-negative number.");
  if (!Number.isFinite(monthlyWithdrawal) || monthlyWithdrawal < 0)
    throw new RangeError("Monthly withdrawal must be a non-negative number.");
  if (!Number.isFinite(annualReturnPct) || annualReturnPct <= -PERCENT_SCALE)
    throw new RangeError("Annual return must be greater than -100%.");
  if (initialBalance === 0) return 0;
  if (monthlyWithdrawal === 0) return null;

  const monthlyFactor = Math.pow(1 + annualReturnPct / PERCENT_SCALE, 1 / MONTHS_PER_YEAR);
  const monthlyRate = monthlyFactor - 1;

  if (monthlyRate === 0) return Math.ceil(initialBalance / monthlyWithdrawal);

  if (monthlyRate > 0) {
    const sustainableBalance = monthlyWithdrawal / monthlyRate;
    if (initialBalance >= sustainableBalance) return null;

    const months =
      Math.log(sustainableBalance / (sustainableBalance - initialBalance)) /
      Math.log(monthlyFactor);
    return Math.max(1, Math.ceil(months));
  }

  const depletionRatio = monthlyWithdrawal / (monthlyWithdrawal - monthlyRate * initialBalance);
  const months = Math.log(depletionRatio) / Math.log(monthlyFactor);
  return Math.max(1, Math.ceil(months));
}

/**
 * Projects fixed, end-of-month withdrawals from a starting balance using an
 * effective annual return. Withdrawals stop once the available balance is 0.
 */
export function simulateDistribution(
  initialBalance: number,
  monthlyWithdrawal: number,
  annualReturnPct: number,
  years: number,
): DistributionProjection {
  if (!Number.isFinite(initialBalance) || initialBalance < 0)
    throw new RangeError("Initial balance must be a non-negative number.");
  if (!Number.isFinite(monthlyWithdrawal) || monthlyWithdrawal < 0)
    throw new RangeError("Monthly withdrawal must be a non-negative number.");
  if (!Number.isFinite(annualReturnPct) || annualReturnPct <= -PERCENT_SCALE)
    throw new RangeError("Annual return must be greater than -100%.");
  if (!Number.isInteger(years) || years < MIN_HORIZON_YEARS || years > MAX_HORIZON_YEARS)
    throw new RangeError("Distribution horizon must be between 0 and 40 whole years.");

  const monthlyRate = Math.pow(1 + annualReturnPct / PERCENT_SCALE, 1 / MONTHS_PER_YEAR) - 1;
  const points: DistributionPoint[] = [{ year: 0, balance: initialBalance }];
  let balance = initialBalance;
  let depletionMonth: number | null = initialBalance === 0 ? 0 : null;

  for (let month = 1; month <= years * MONTHS_PER_YEAR; month += 1) {
    balance = Math.max(0, balance * (1 + monthlyRate) - monthlyWithdrawal);
    if (balance === 0 && depletionMonth === null) depletionMonth = month;
    if (month % MONTHS_PER_YEAR === 0) points.push({ year: month / MONTHS_PER_YEAR, balance });
  }

  return { points, finalBalance: balance, depletionMonth };
}
