import { useEffect, useMemo, useRef, useState, type Dispatch, type SetStateAction } from "react";
import { portfolioInitialValue } from "@/features/Dashboard/domain/utils/portfolioInitialValue.util";
import { getPortfolioSummaryInsights } from "@/features/Dashboard/domain/utils/getPortfolioSummaryInsights.util";
import { projectPortfolio } from "@/features/Dashboard/domain/utils/projectPortfolio.util";
import { PORTFOLIO_CONSTANTS } from "@/shared/domain/constants/portfolioConstants.constant";
import { updateInvestment } from "@/features/Dashboard/domain/utils/updateInvestment.util";
import { createPortfolioChartData } from "@/features/Dashboard/presentation/utils/createPortfolioChartData.util";
import { formatPortfolioDate } from "@/features/Dashboard/presentation/utils/formatPortfolioDate.util";
import { formatAbbreviatedValue } from "@/features/Dashboard/presentation/formatters/formatAbbreviatedValue.util";
import type { Portfolio } from "@/shared/domain/types/Portfolio.type";
const { DEFAULT_HORIZON_YEARS, MONTHS_PER_YEAR, PERCENT_SCALE } = PORTFOLIO_CONSTANTS;
type Session = {
  portfolio: Portfolio | null;
  setPortfolio: Dispatch<SetStateAction<Portfolio | null>>;
  portfolioImportRevision: number;
};
type HorizonMap = Record<string, number>;
export function useDashboardModel(session: Session) {
  const { portfolio, setPortfolio, portfolioImportRevision } = session;
  const [withInflation, setWithInflation] = useState(false);
  const [inflationRatePct, setInflationRatePct] = useState(portfolio?.inflation.annualRatePct ?? 0);
  const [totalYears, setTotalYears] = useState<number>(DEFAULT_HORIZON_YEARS);
  const [investmentYears, setInvestmentYears] = useState<HorizonMap>({});
  const [hiddenChartSeries, setHiddenChartSeries] = useState<Set<string>>(() => new Set());
  const lastRevision = useRef(portfolioImportRevision);
  useEffect(() => {
    if (lastRevision.current === portfolioImportRevision) return;
    lastRevision.current = portfolioImportRevision;
    setWithInflation(false);
    setInflationRatePct(portfolio?.inflation.annualRatePct ?? 0);
    setTotalYears(DEFAULT_HORIZON_YEARS);
    setInvestmentYears({});
    setHiddenChartSeries(new Set());
  }, [portfolio, portfolioImportRevision]);
  const initial = portfolio ? portfolioInitialValue(portfolio) : 0;
  const activeInflationRatePct = withInflation ? inflationRatePct : 0;
  const nominalInvestmentProjections = useMemo(
    () => (portfolio ? projectPortfolio(portfolio, totalYears, 0) : []),
    [portfolio, totalYears],
  );
  const realInvestmentProjections = useMemo(
    () => (portfolio ? projectPortfolio(portfolio, totalYears, inflationRatePct) : []),
    [portfolio, totalYears, inflationRatePct],
  );
  const investmentProjections = withInflation
    ? realInvestmentProjections
    : nominalInvestmentProjections;
  const nominalTotalAtHorizon = nominalInvestmentProjections.reduce((s, p) => s + p.finalValue, 0);
  const realTotalAtHorizon = realInvestmentProjections.reduce((s, p) => s + p.finalValue, 0);
  const totalAtHorizon = investmentProjections.reduce((s, p) => s + p.finalValue, 0);
  const totalContributions = investmentProjections.reduce((s, p) => s + p.totalContributions, 0);
  const nominalTotalContributions = nominalInvestmentProjections.reduce(
    (s, p) => s + p.totalContributions,
    0,
  );
  const realTotalContributions = realInvestmentProjections.reduce(
    (s, p) => s + p.totalContributions,
    0,
  );
  const summaryInsights = getPortfolioSummaryInsights(
    initial,
    totalAtHorizon,
    totalContributions,
    investmentProjections,
    totalYears,
    activeInflationRatePct,
  );
  const totalGrowth = summaryInsights.totalGrowth;
  const totalInvested = initial + totalContributions;
  const monthlyReturnDisplay =
    summaryInsights.monthlyReturnPct === null
      ? null
      : formatAbbreviatedValue(summaryInsights.monthlyReturnPct, "percent", "precise");
  const returnMonthCount = totalYears * MONTHS_PER_YEAR;
  const summaryMonthlyRate = (summaryInsights.monthlyReturnPct ?? 0) / PERCENT_SCALE;
  const chartData = useMemo(
    () =>
      portfolio
        ? createPortfolioChartData(portfolio, totalYears, initial, activeInflationRatePct)
        : [],
    [portfolio, totalYears, initial, activeInflationRatePct],
  );
  function setTotalHorizon(years: number) {
    setTotalYears(years);
    setInvestmentYears(
      Object.fromEntries((portfolio?.investments ?? []).map((i) => [i.id, years])),
    );
  }
  function setRate(investmentId: string, value: string) {
    const next = Number(value);
    if (!Number.isFinite(next)) return;
    setPortfolio((current) =>
      current
        ? updateInvestment(current, investmentId, (i) => ({ ...i, annualRatePct: next }))
        : current,
    );
  }
  function setContribution(investmentId: string, holdingId: string, value: string) {
    const next = Number(value);
    if (!Number.isFinite(next) || next < 0) return;
    setPortfolio((current) =>
      current
        ? updateInvestment(current, investmentId, (i) => ({
            ...i,
            holdings: i.holdings.map((h) =>
              h.id === holdingId ? { ...h, monthlyContribution: next } : h,
            ),
          }))
        : current,
    );
  }
  function toggleChartSeries(key: string) {
    setHiddenChartSeries((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }
  return {
    totalYears,
    setTotalYears,
    setTotalHorizon,
    investmentYears,
    setInvestmentYears,
    hiddenChartSeries,
    initial,
    withInflation,
    setWithInflation,
    inflationRatePct,
    setInflationRatePct,
    activeInflationRatePct,
    investmentProjections,
    nominalTotalAtHorizon,
    realTotalAtHorizon,
    nominalTotalContributions,
    realTotalContributions,
    totalAtHorizon,
    totalContributions,
    summaryInsights,
    totalGrowth,
    totalInvested,
    monthlyReturnDisplay,
    returnMonthCount,
    summaryMonthlyRate,
    chartData,
    setRate,
    setContribution,
    toggleChartSeries,
    portfolioMeta: portfolio ? formatPortfolioDate(portfolio.asOf) : "",
  };
}
