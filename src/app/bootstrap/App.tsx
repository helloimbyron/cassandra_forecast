import "./App.css.ts";
import { useCallback, useEffect, useRef, useState } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router";
import { usePortfolioSession } from "@/shared/presentation/hooks/usePortfolioSession";
import { APP_PATHS } from "@/app/routes/appPaths";
import { DashboardPage, StickyProjectionControls, useDashboardModel } from "@/features/Dashboard";
import { HomePage } from "@/features/Home";
import { Header } from "@/shared/presentation/components/Header";
import { Footer } from "@/shared/presentation/components/Footer";

// --- Components ---

export function App() {
  // --- States ---

  const [showHeaderControls, setShowHeaderControls] = useState(false);
  const didLoadDashboardExample = useRef(false);
  const heroCardRef = useRef<HTMLElement | null>(null);

  // --- Hooks ---

  const location = useLocation();
  const navigate = useNavigate();
  const previousPathname = useRef(location.pathname);

  const setHeroCardRef = useCallback((node: HTMLElement | null) => {
    heroCardRef.current = node;
  }, []);

  const navigateToDashboard = useCallback(() => {
    didLoadDashboardExample.current = true;
    if (location.pathname !== APP_PATHS.DASHBOARD) navigate(APP_PATHS.DASHBOARD);
  }, [location.pathname, navigate]);

  const navigateHome = useCallback(
    (replace = false) => {
      navigate(APP_PATHS.HOME, {
        replace: replace || location.pathname === APP_PATHS.HOME,
      });
    },
    [location.pathname, navigate],
  );

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

  const routeActions = useRef({ clearPortfolio, loadExample });

  useEffect(() => {
    routeActions.current = { clearPortfolio, loadExample };
  }, [clearPortfolio, loadExample]);

  // --- Effects ---

  useEffect(() => {
    const heroCard = heroCardRef.current;
    if (!isPortfolioLoaded || !heroCard) {
      setShowHeaderControls(false);

      return;
    }

    const syncHeaderControlsVisibility = () => {
      const { top, bottom } = heroCard.getBoundingClientRect();
      setShowHeaderControls(bottom <= 0 || top >= window.innerHeight);
    };

    syncHeaderControlsVisibility();

    const observer = new IntersectionObserver(syncHeaderControlsVisibility, { threshold: 0 });
    observer.observe(heroCard);
    window.addEventListener("scroll", syncHeaderControlsVisibility, {
      capture: true,
      passive: true,
    });
    window.addEventListener("resize", syncHeaderControlsVisibility);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", syncHeaderControlsVisibility, true);
      window.removeEventListener("resize", syncHeaderControlsVisibility);
    };
  }, [isPortfolioLoaded, portfolioImportRevision]);

  useEffect(() => {
    const previousPath = previousPathname.current;
    previousPathname.current = location.pathname;

    if (location.pathname === APP_PATHS.HOME) {
      didLoadDashboardExample.current = false;
      if (previousPath === APP_PATHS.DASHBOARD && portfolio) {
        routeActions.current.clearPortfolio();
      }
      return;
    }

    if (
      location.pathname === APP_PATHS.DASHBOARD &&
      !portfolio &&
      !didLoadDashboardExample.current
    ) {
      didLoadDashboardExample.current = true;
      void routeActions.current.loadExample();
    }
  }, [location.pathname, portfolio]);

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
        homeHref={APP_PATHS.HOME}
        onChangeJson={portfolio ? () => model.fileInput.current?.click() : undefined}
        projectionControls={
          portfolio && showHeaderControls ? (
            <StickyProjectionControls
              totalYears={model.totalYears}
              onTotalHorizonChange={model.setTotalHorizon}
              inflationRatePct={model.inflationRatePct}
              onInflationRateChange={model.setInflationRatePct}
              withInflation={withInflation}
              onWithInflationChange={setWithInflation}
            />
          ) : null
        }
      />

      <main id="inicio">
        <Routes>
          <Route path={APP_PATHS.HOME} element={<HomePage model={model} />} />
          <Route
            path={APP_PATHS.DASHBOARD}
            element={
              <DashboardPage
                key={portfolioImportRevision}
                model={loadedModel}
                heroCardRef={setHeroCardRef}
              />
            }
          />
          <Route path="*" element={<Navigate to={APP_PATHS.HOME} replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
