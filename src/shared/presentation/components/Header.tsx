import { brandLabel } from "@/shared/presentation/brand.constant";
import { copy } from "@/shared/presentation/Header.constant";
import { Upload } from "lucide-react";
import { BrandMark } from "@/shared/presentation/components/BrandMark";
import { ThemeToggle } from "@/shared/presentation/components/ThemeToggle";
import { Button } from "@/design-system/components/Button";
import type { MouseEvent, ReactNode } from "react";

// --- Components ---

export function Header({
  onNavigateHome,
  homeHref,
  onChangeJson,
  projectionControls,
}: {
  onNavigateHome: () => void;
  homeHref: string;
  onChangeJson?: () => void;
  projectionControls?: ReactNode;
}) {
  // --- Handlers ---

  function handleBrandClick(event: MouseEvent<HTMLAnchorElement>) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }
    event.preventDefault();
    onNavigateHome();
  }

  // --- Return ---

  return (
    <header className={`topbar${projectionControls ? "has-projection-controls" : ""}`}>
      <div className="brand-group">
        <a
          className="brand"
          href={homeHref}
          onClick={handleBrandClick}
          aria-label={copy.cassandraInicio}
        >
          <span className="brand-mark">
            <BrandMark />
          </span>
          <span>{brandLabel}</span>
        </a>
      </div>
      {projectionControls}
      <div className="topbar-actions" role="group" aria-label={copy.headerActions}>
        {onChangeJson && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="change-json-toggle"
            onClick={onChangeJson}
            aria-label={copy.cambiarJson}
            title={copy.cambiarJson}
          >
            <Upload aria-hidden="true" />
          </Button>
        )}
        <ThemeToggle />
      </div>
    </header>
  );
}
