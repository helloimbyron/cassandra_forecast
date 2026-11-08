import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { usePortfolioDashboard } from "@/features/portfolio/presentation/hooks/usePortfolioDashboard";
import { Header } from "@/features/portfolio/presentation/components/Header";
import { IntroSection } from "@/features/portfolio/presentation/components/IntroSection";
import { ImportSection } from "@/features/portfolio/presentation/components/ImportSection";
import { DashboardHeading } from "@/features/portfolio/presentation/components/DashboardHeading";
import { HeroCard } from "@/features/portfolio/presentation/components/HeroCard";
import { MetricsGrid } from "@/features/portfolio/presentation/components/MetricsGrid";
import { OverviewGrid } from "@/features/portfolio/presentation/components/OverviewGrid";
import { DistributionSection } from "@/features/portfolio/presentation/components/DistributionSection";
import { InvestmentsSection } from "@/features/portfolio/presentation/components/InvestmentsSection";
import { TableSection } from "@/features/portfolio/presentation/components/TableSection";
import { Footer } from "@/features/portfolio/presentation/components/Footer";

type DashboardPage = "home" | "dashboard";

export default function Dashboard({ initialPage = "home" }: { initialPage?: DashboardPage }) {
  const [page, setPage] = useState<DashboardPage>(initialPage);
  const [showHeaderControls, setShowHeaderControls] = useState(false);
  const didLoadInitialExample = useRef(false);
  const heroCardRef = useRef<HTMLElement | null>(null);
  const setHeroCardRef = useCallback((node: HTMLElement | null) => {
    heroCardRef.current = node;
  }, []);

  const navigateToDashboard = useCallback(() => {
    if (window.location.pathname !== "/dashboard") window.history.pushState(null, "", "/dashboard");
    setPage("dashboard");
  }, []);

  const navigateHome = useCallback((replace = false) => {
    if (replace || window.location.pathname === "/") window.history.replaceState(null, "", "/");
    else window.history.pushState(null, "", "/");
    setPage("home");
  }, []);

  const onExampleLoadFailed = useCallback(() => {
    navigateHome(true);
  }, [navigateHome]);

  const model = usePortfolioDashboard({
    onPortfolioLoaded: navigateToDashboard,
    onExampleLoadFailed,
  });
  const { clearPortfolio, loadExample, portfolio, withInflation, setWithInflation } = model;
  const loadedModel = portfolio ? { ...model, portfolio } : null;
  const isPortfolioLoaded = portfolio !== null;
  const portfolioImportRevision = model.portfolioImportRevision;

  useEffect(() => {
    const heroCard = heroCardRef.current;
    if (!isPortfolioLoaded || !heroCard) {
      setShowHeaderControls(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowHeaderControls(!entry?.isIntersecting);
      },
      { threshold: 0 },
    );
    observer.observe(heroCard);
    return () => observer.disconnect();
  }, [isPortfolioLoaded, portfolioImportRevision]);

  useEffect(() => {
    if (initialPage === "dashboard" && !didLoadInitialExample.current) {
      didLoadInitialExample.current = true;
      void loadExample();
    }
  }, [initialPage, loadExample]);

  useEffect(() => {
    function handlePopState() {
      if (window.location.pathname === "/") {
        clearPortfolio();
        setPage("home");
      } else if (window.location.pathname === "/dashboard") {
        setPage("dashboard");
        if (!portfolio) void loadExample();
      }
    }

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [clearPortfolio, loadExample, portfolio]);

  function handleNavigateHome() {
    clearPortfolio();
    navigateHome();
  }

  return (
    <div className="app-shell">
      <Header
        onNavigateHome={handleNavigateHome}
        onChangeJson={portfolio ? () => model.fileInput.current?.click() : undefined}
        inflation={portfolio?.inflation}
        inflationRatePct={model.inflationRatePct}
        onInflationRateChange={model.setInflationRatePct}
        totalYears={model.totalYears}
        onTotalHorizonChange={model.setTotalHorizon}
        showProjectionControls={showHeaderControls}
        withInflation={withInflation}
        onWithInflationChange={setWithInflation}
      />

      <main id="inicio">
        {page === "home" && !loadedModel && <IntroSection />}

        {page === "home" && !loadedModel ? (
          <ImportSection model={model} />
        ) : loadedModel ? (
          <Fragment key={loadedModel.portfolioImportRevision}>
            <DashboardHeading model={loadedModel} />

            <HeroCard model={loadedModel} heroCardRef={setHeroCardRef} />

            <MetricsGrid model={loadedModel} />

            <OverviewGrid model={loadedModel} />

            <DistributionSection model={loadedModel} />

            <InvestmentsSection model={loadedModel} />

            <TableSection model={loadedModel} />
          </Fragment>
        ) : (
          <p role="status" className="drop-hint">
            Cargando ejemplo…
          </p>
        )}
      </main>

      <Footer />
    </div>
  );
}
