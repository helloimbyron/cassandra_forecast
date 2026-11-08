import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { usePortfolioSession } from "@/app/hooks/usePortfolioSession";
import { useDashboardModel } from "@/features/Dashboard/presentation/hooks/useDashboardModel";
import { Header } from "@/shared/presentation/components/Header";
import { Footer } from "@/shared/presentation/components/Footer";
import { HomePage } from "@/features/Home/client";
import { DashboardPage } from "@/features/Dashboard/client";
import { StickyProjectionControls } from "@/features/Dashboard/presentation/components/StickyProjectionControls";

// --- Types ---

type PageKind = "home" | "dashboard";

// --- Components ---

export function CassandraApp({ initialPage = "home" }: { initialPage?: PageKind }) {
  // --- States ---

  const [page, setPage] = useState<PageKind>(initialPage);
  const [showHeaderControls, setShowHeaderControls] = useState(false);
  const didLoadInitialExample = useRef(false);
  const heroCardRef = useRef<HTMLElement | null>(null);

  // --- Hooks ---

  const setHeroCardRef = useCallback((node: HTMLElement | null) => {
    heroCardRef.current = node;
  }, []);

  const navigateToDashboard = useCallback(() => {
    if (window.location.pathname !== "/dashboard") {
      window.history.pushState(null, "", "/dashboard");
    }
    setPage("dashboard");
  }, []);

  const navigateHome = useCallback((replace = false) => {
    if (replace || window.location.pathname === "/") {
      window.history.replaceState(null, "", "/");
    } else {
      window.history.pushState(null, "", "/");
    }
    setPage("home");
  }, []);

  const onExampleLoadFailed = useCallback(() => {
    navigateHome(true);
  }, [navigateHome]);

  const session = usePortfolioSession({
    onPortfolioLoaded: navigateToDashboard,
    onExampleLoadFailed,
  });
  const dashboard = useDashboardModel(session);
  const model = { ...session, ...dashboard };

  // --- Variables ---

  const { clearPortfolio, loadExample, portfolio, withInflation, setWithInflation } = model;
  const loadedModel = portfolio ? { ...model, portfolio } : null;
  const isPortfolioLoaded = portfolio !== null;
  const portfolioImportRevision = model.portfolioImportRevision;

  // --- Effects ---

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
      } else {
        if (window.location.pathname === "/dashboard") {
          setPage("dashboard");
          if (!portfolio) {
            void loadExample();
          }
        }
      }
    }

    window.addEventListener("popstate", handlePopState);

    return () => window.removeEventListener("popstate", handlePopState);
  }, [clearPortfolio, loadExample, portfolio]);

  // --- Handlers ---

  function handleNavigateHome() {
    clearPortfolio();
    navigateHome();
  }

  // --- Return ---

  return (
    <div className="app-shell">
      <Header
        onNavigateHome={handleNavigateHome}
        onChangeJson={portfolio ? () => model.fileInput.current?.click() : undefined}
        projectionControls={portfolio && showHeaderControls ? (
          <StickyProjectionControls
            totalYears={model.totalYears}
            onTotalHorizonChange={model.setTotalHorizon}
            inflationRatePct={model.inflationRatePct}
            onInflationRateChange={model.setInflationRatePct}
            withInflation={withInflation}
            onWithInflationChange={setWithInflation}
          />
        ) : null}
      />

      <main id="inicio">
        {page === "home" && !loadedModel ? (
          <HomePage model={model} />
        ) : loadedModel ? (
          <Fragment key={loadedModel.portfolioImportRevision}>
            <DashboardPage model={loadedModel} heroCardRef={setHeroCardRef} />
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



