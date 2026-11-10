import * as veFormulaMathStyles from "./FormulaMath.css.ts";
import katex from "katex";
import "katex/dist/katex.min.css";

// --- Components ---

export function FormulaMath({
  tex,
  label,
  className,
}: {
  tex: string;
  label: string;
  className?: string;
}) {
  // --- Variables ---

  const html = katex.renderToString(tex, {
    displayMode: true,
    output: "htmlAndMathml",
    throwOnError: false,
  });

  // --- Return ---

  return (
    <div
      className={[veFormulaMathStyles.formulaMath, className].filter(Boolean).join(" ")}
      role="img"
      aria-label={label}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
