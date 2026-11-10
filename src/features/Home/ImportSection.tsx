import * as veImportSectionStyles from "./ImportSection.css.ts";
import * as feedbackStyles from "@/shared/presentation/styles/feedback.css";
import { importSectionCopy } from "@/features/Home/presentation/copies/importSection.copy";
import type { PortfolioImportController } from "@/shared/presentation/types/PortfolioImportController.type";
import { Button } from "@/libraries/shadcn/components/Button";
import { Eye } from "lucide-react";
import { Upload } from "lucide-react";
import { Download } from "lucide-react";

// --- Components ---

export function ImportSection({ model }: { model: PortfolioImportController }) {
  // --- Variables ---

  const { error, dragging, setDragging, fileInput, onFileChange, onDrop, loadExample } = model;

  // --- Return ---

  return (
    <section className={veImportSectionStyles.importSection} aria-labelledby="onboarding-title">
      <div
        className={[
          veImportSectionStyles.importCard,
          veImportSectionStyles.importCardState[dragging ? "dragging" : "idle"],
        ]
          .filter(Boolean)
          .join(" ")}
        data-testid="home-import-card"
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
      >
        <div className={veImportSectionStyles.importActions}>
          <Button size="lg" onClick={() => fileInput.current?.click()}>
            <Upload className="icon-sm" /> {importSectionCopy.uploadPortfolioJson}
          </Button>
          <Button size="lg" variant="outline" onClick={() => void loadExample()}>
            <Eye className="icon-sm" /> {importSectionCopy.showExample}
          </Button>
        </div>
        {error && (
          <p className={feedbackStyles.errorMessage} role="alert">
            {error}
          </p>
        )}
        <div className={veImportSectionStyles.importMeta}>
          <span className={feedbackStyles.dropHint}>
            {importSectionCopy.orDropPortfolioJsonHere}
          </span>
          <a className={veImportSectionStyles.sampleLink} href="/portfolio.example.json" download>
            <Download className="icon-sm" /> {importSectionCopy.downloadExampleTemplate}
          </a>
        </div>
        <input
          ref={fileInput}
          className="visually-hidden"
          type="file"
          accept=".json,application/json"
          onChange={onFileChange}
          aria-label={importSectionCopy.selectPortfolioJsonFile}
        />
      </div>
    </section>
  );
}
