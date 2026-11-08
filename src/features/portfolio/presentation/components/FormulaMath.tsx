import katex from "katex";
import "katex/dist/katex.min.css";

export function FormulaMath({
  tex,
  label,
  className,
}: {
  tex: string;
  label: string;
  className?: string;
}) {
  const html = katex.renderToString(tex, {
    displayMode: true,
    output: "htmlAndMathml",
    throwOnError: false,
  });

  return (
    <div
      className={className ? `formula-math ${className}` : "formula-math"}
      role="img"
      aria-label={label}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
