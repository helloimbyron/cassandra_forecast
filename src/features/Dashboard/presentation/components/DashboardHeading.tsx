import "./DashboardHeading.css.ts";
import { dashboardHeadingCopy } from "@/features/Dashboard/presentation/copies/dashboardHeading.copy";
import type { LoadedDashboardModel } from "@/features/Dashboard/presentation/types/LoadedDashboardModel.type";

// --- Components ---

export function DashboardHeading({ model }: { model: LoadedDashboardModel }) {
  // --- Variables ---

  const { error, fileInput, onFileChange } = model;

  // --- Return ---

  return (
    <section className="dashboard-heading" aria-label={dashboardHeadingCopy.importedPortfolio}>
      <div>
        <div className="eyebrow">
          <span className="eyebrow-line" /> {dashboardHeadingCopy.portfolioSummary}
        </div>
      </div>
      <input
        ref={fileInput}
        className="visually-hidden"
        type="file"
        accept=".json,application/json"
        onChange={onFileChange}
        aria-label={dashboardHeadingCopy.selectAnotherPortfolioFile}
      />
      {error && (
        <p className="error-message dashboard-error" role="alert">
          {error}
        </p>
      )}
    </section>
  );
}
