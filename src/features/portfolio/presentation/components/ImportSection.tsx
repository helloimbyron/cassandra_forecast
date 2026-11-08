import { copy } from "../copy/ImportSection";
import type { DashboardModel } from "@/features/portfolio/presentation/hooks/usePortfolioDashboard";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Upload } from "lucide-react";
import { Download } from "lucide-react";

export function ImportSection({ model }: { model: DashboardModel }) {
  const { error, dragging, setDragging, fileInput, onFileChange, onDrop, loadExample } = model;
  return (
    <section className="import-section" aria-labelledby="onboarding-title">
      <div
        className={`import-card ${dragging ? "is-dragging" : ""}`}
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
      >
        <div className="import-actions">
          <Button size="lg" onClick={() => fileInput.current?.click()}>
            <Upload className="icon-sm" /> {copy.cargarMiJson}
          </Button>
          <Button size="lg" variant="outline" onClick={() => void loadExample()}>
            <Eye className="icon-sm" /> {copy.mostrarEjemplo}
          </Button>
        </div>
        {error && (
          <p className="error-message" role="alert">
            {error}
          </p>
        )}
        <div className="import-meta">
          <span className="drop-hint">{copy.oArrastraAquiTuArchivoJson}</span>
          <a className="sample-link" href="/portfolio.example.json" download>
            <Download className="icon-sm" /> {copy.descargarFormatoDeEjemplo}
          </a>
        </div>
        <input
          ref={fileInput}
          className="visually-hidden"
          type="file"
          accept=".json,application/json"
          onChange={onFileChange}
          aria-label={copy.seleccionarArchivoJsonDeCartera}
        />
      </div>
    </section>
  );
}
