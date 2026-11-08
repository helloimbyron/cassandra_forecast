import { copy } from "../copy/DashboardHeading";
import type { LoadedDashboardModel } from "@/features/portfolio/presentation/hooks/usePortfolioDashboard";

export function DashboardHeading({ model }: { model: LoadedDashboardModel }) {
  const { error, fileInput, onFileChange } = model;
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
