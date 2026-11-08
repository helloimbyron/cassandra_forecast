import { copy } from "@/features/Portfolio/presentation/copy/DashboardHeading.constant";
import type { LoadedDashboardModel } from "@/features/Portfolio/presentation/hooks/usePortfolioDashboard";

// --- Components ---

export function DashboardHeading({ model }: { model: LoadedDashboardModel }) {

  // --- Variables ---

  const { error, fileInput, onFileChange } = model;

  // --- Return ---

  return (
    <section className="dashboard-heading" aria-label={copy.carteraImportada}>
      <div>
        <div className="eyebrow">
          <span className="eyebrow-line" /> {copy.resumenDeCartera}
        </div>
      </div>
      <input
        ref={fileInput}
        className="visually-hidden"
        type="file"
        accept=".json,application/json"
        onChange={onFileChange}
        aria-label={copy.seleccionarOtroArchivoJson}
      />
      {error && (
        <p className="error-message dashboard-error" role="alert">
          {error}
        </p>
      )}
    </section>
  );
}
