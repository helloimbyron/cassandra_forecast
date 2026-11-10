import * as veDashboardPrimitivesStyles from "./DashboardPrimitives.css.ts";
import * as feedbackStyles from "@/shared/presentation/styles/feedback.css";
import * as veDashboardHeadingStyles from "./DashboardHeading.css.ts";
import { dashboardHeadingCopy } from "@/features/Dashboard/presentation/copies/dashboardHeading.copy";
import type { LoadedDashboardModel } from "@/features/Dashboard/presentation/types/LoadedDashboardModel.type";

// --- Components ---

export function DashboardHeading({ model }: { model: LoadedDashboardModel }) {
  // --- Variables ---

  const { error, fileInput, onFileChange } = model;

  // --- Return ---

  return (
    <section
      className={veDashboardHeadingStyles.dashboardHeading}
      data-testid="dashboard-heading"
      aria-label={dashboardHeadingCopy.importedPortfolio}
    >
      <div>
        <div className={[veDashboardPrimitivesStyles.eyebrow, "eyebrow"].filter(Boolean).join(" ")}>
          <span className={veDashboardPrimitivesStyles.eyebrowLine} />{" "}
          {dashboardHeadingCopy.portfolioSummary}
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
        <p
          className={[
            veDashboardHeadingStyles.dashboardError,
            [feedbackStyles.errorMessage, "error-message dashboard-error"]
              .filter(Boolean)
              .join(" "),
          ]
            .filter(Boolean)
            .join(" ")}
          role="alert"
        >
          {error}
        </p>
      )}
    </section>
  );
}
