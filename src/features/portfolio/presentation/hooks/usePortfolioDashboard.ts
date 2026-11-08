import { useMemo, useRef, useState, type ChangeEvent, type DragEvent } from "react";
import {
  portfolioInitialValue,
  getPortfolioSummaryInsights,
  projectPortfolio,
  type Portfolio,
} from "@/lib/portfolio";
import {
  DEFAULT_HORIZON_YEARS,
  MONTHS_PER_YEAR,
  PERCENT_SCALE,
} from "../../domain/portfolio-constants";
import { updateInvestment } from "../../application/updateInvestment";
import { readPortfolioFile } from "../../application/readPortfolioFile";
import { importMessages } from "../../application/importMessages";
import { createPortfolioChartData } from "../utils/createPortfolioChartData";
import { formatPortfolioDate } from "../utils/formatPortfolioDate";
import { formatAbbreviatedValue } from "@/shared/format/format-abbreviated-value";

type HorizonMap = Record<string, number>;

type NavigationCallbacks = {
  onPortfolioLoaded?: () => void;
  onExampleLoadFailed?: () => void;
};

export function usePortfolioDashboard({
  onPortfolioLoaded,
  onExampleLoadFailed,
}: NavigationCallbacks = {}) {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [withInflation, setWithInflation] = useState(false);
  const [inflationRatePct, setInflationRatePct] = useState(0);
  const [portfolioImportRevision, setPortfolioImportRevision] = useState(0);
  const [totalYears, setTotalYears] = useState(DEFAULT_HORIZON_YEARS);
  const [investmentYears, setInvestmentYears] = useState<HorizonMap>({});
  const [hiddenChartSeries, setHiddenChartSeries] = useState<Set<string>>(() => new Set());
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
  const importRequest = useRef(0);
  const exampleAbort = useRef<AbortController | null>(null);

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
  const nominalTotalAtHorizon = nominalInvestmentProjections.reduce(
    (sum, projection) => sum + projection.finalValue,
    0,
  );
  const realTotalAtHorizon = realInvestmentProjections.reduce(
    (sum, projection) => sum + projection.finalValue,
    0,
  );
  const totalAtHorizon = investmentProjections.reduce(
    (sum, projection) => sum + projection.finalValue,
    0,
  );
  const totalContributions = investmentProjections.reduce(
    (sum, projection) => sum + projection.totalContributions,
    0,
  );
  const nominalTotalContributions = nominalInvestmentProjections.reduce(
    (sum, projection) => sum + projection.totalContributions,
    0,
  );
  const realTotalContributions = realInvestmentProjections.reduce(
    (sum, projection) => sum + projection.totalContributions,
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

  function startImportRequest() {
    importRequest.current += 1;
    exampleAbort.current?.abort();
    exampleAbort.current = null;
    setError("");
    return importRequest.current;
  }

  async function parseAndLoadFile(file: File, requestId: number) {
    try {
      const nextPortfolio = await readPortfolioFile(file);
      if (requestId !== importRequest.current) return false;
      setPortfolio(nextPortfolio);
      setWithInflation(false);
      setInflationRatePct(nextPortfolio.inflation.annualRatePct);
      setPortfolioImportRevision((revision) => revision + 1);
      setHiddenChartSeries(new Set());
      setFileName(file.name);
      setInvestmentYears(
        Object.fromEntries(
          nextPortfolio.investments.map((investment) => [investment.id, DEFAULT_HORIZON_YEARS]),
        ),
      );
      setTotalYears(DEFAULT_HORIZON_YEARS);
      onPortfolioLoaded?.();
      return true;
    } catch (issue) {
      if (requestId === importRequest.current) {
        setError(issue instanceof Error ? issue.message : importMessages.unreadable);
      }
      return false;
    }
  }

  async function loadFile(file?: File) {
    if (!file) return;
    const requestId = startImportRequest();
    await parseAndLoadFile(file, requestId);
  }

  async function loadExample() {
    const requestId = startImportRequest();
    const controller = new AbortController();
    exampleAbort.current = controller;
    try {
      const response = await fetch("/portfolio.example.json", { signal: controller.signal });
      if (!response.ok) throw new Error(importMessages.unreadable);
      const example = await response.text();
      if (requestId !== importRequest.current) return;
      const loaded = await parseAndLoadFile(
        new File([example], "portfolio.example.json", { type: "application/json" }),
        requestId,
      );
      if (!loaded && requestId === importRequest.current) onExampleLoadFailed?.();
    } catch (issue) {
      if (requestId === importRequest.current && !controller.signal.aborted) {
        setError(issue instanceof Error ? issue.message : importMessages.unreadable);
        onExampleLoadFailed?.();
      }
    } finally {
      if (requestId === importRequest.current) {
        exampleAbort.current = null;
      }
    }
  }

  function clearPortfolio() {
    importRequest.current += 1;
    exampleAbort.current?.abort();
    exampleAbort.current = null;
    setPortfolio(null);
    setWithInflation(false);
    setInflationRatePct(0);
    setFileName("");
    setError("");
    setDragging(false);
    setHiddenChartSeries(new Set());
    setInvestmentYears({});
    setTotalYears(DEFAULT_HORIZON_YEARS);
  }

  function onFileChange(event: ChangeEvent<HTMLInputElement>) {
    void loadFile(event.target.files?.[0]);
    event.target.value = "";
  }

  function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(false);
    void loadFile(event.dataTransfer.files[0]);
  }

  function setTotalHorizon(years: number) {
    setTotalYears(years);
    setInvestmentYears(
      Object.fromEntries(
        (portfolio?.investments ?? []).map((investment) => [investment.id, years]),
      ),
    );
  }

  function setRate(investmentId: string, value: string) {
    const nextRate = Number(value);
    if (!Number.isFinite(nextRate)) return;
    setPortfolio((current) =>
      current
        ? updateInvestment(current, investmentId, (investment) => ({
            ...investment,
            annualRatePct: nextRate,
          }))
        : current,
    );
  }

  function setContribution(investmentId: string, holdingId: string, value: string) {
    const contribution = Number(value);
    if (!Number.isFinite(contribution) || contribution < 0) return;
    setPortfolio((current) =>
      current
        ? updateInvestment(current, investmentId, (investment) => ({
            ...investment,
            holdings: investment.holdings.map((holding) =>
              holding.id === holdingId
                ? { ...holding, monthlyContribution: contribution }
                : holding,
            ),
          }))
        : current,
    );
  }

  function toggleChartSeries(seriesKey: string) {
    setHiddenChartSeries((current) => {
      const next = new Set(current);
      if (next.has(seriesKey)) next.delete(seriesKey);
      else next.add(seriesKey);
      return next;
    });
  }

  const portfolioMeta = portfolio ? formatPortfolioDate(portfolio.asOf) : "";

  return {
    portfolio,
    portfolioImportRevision,
    totalYears,
    setTotalYears,
    setTotalHorizon,
    investmentYears,
    setInvestmentYears,
    hiddenChartSeries,
    fileName,
    error,
    dragging,
    setDragging,
    fileInput,
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
    loadFile,
    loadExample,
    clearPortfolio,
    onFileChange,
    onDrop,
    setRate,
    setContribution,
    toggleChartSeries,
    portfolioMeta,
  };
}

export type DashboardModel = ReturnType<typeof usePortfolioDashboard>;
export type LoadedDashboardModel = DashboardModel & { portfolio: Portfolio };
