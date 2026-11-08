import { useRef, useState, type ChangeEvent, type DragEvent } from "react";
import type { Portfolio } from "@/shared/domain/types/Portfolio.type";
import { readPortfolioFile } from "@/shared/infrastructure/services/readPortfolioFile.service";
import { importMessages } from "@/shared/infrastructure/copies/importMessages.copy";

type Callbacks = { onPortfolioLoaded?: () => void; onExampleLoadFailed?: () => void };

export function usePortfolioSession({ onPortfolioLoaded, onExampleLoadFailed }: Callbacks = {}) {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [portfolioImportRevision, setPortfolioImportRevision] = useState(0);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
  const importRequest = useRef(0);
  const exampleAbort = useRef<AbortController | null>(null);
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
      setPortfolioImportRevision((r) => r + 1);
      setFileName(file.name);
      onPortfolioLoaded?.();
      return true;
    } catch (issue) {
      if (requestId === importRequest.current)
        setError(issue instanceof Error ? issue.message : importMessages.unreadable);
      return false;
    }
  }
  async function loadFile(file?: File) {
    if (file) await parseAndLoadFile(file, startImportRequest());
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
      if (requestId === importRequest.current) exampleAbort.current = null;
    }
  }
  function clearPortfolio() {
    importRequest.current += 1;
    exampleAbort.current?.abort();
    exampleAbort.current = null;
    setPortfolio(null);
    setPortfolioImportRevision((r) => r + 1);
    setFileName("");
    setError("");
    setDragging(false);
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
  return {
    portfolio,
    setPortfolio,
    portfolioImportRevision,
    fileName,
    error,
    dragging,
    setDragging,
    fileInput,
    loadFile,
    loadExample,
    clearPortfolio,
    onFileChange,
    onDrop,
  };
}
