import type { ChangeEvent, DragEvent, RefObject } from "react";

export type PortfolioImportController = {
  error: string;
  dragging: boolean;
  setDragging: (dragging: boolean) => void;
  fileInput: RefObject<HTMLInputElement | null>;
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onDrop: (event: DragEvent<HTMLDivElement>) => void;
  loadExample: () => Promise<void>;
};

