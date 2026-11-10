import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { RateNoteTooltip } from "../../../../../src/features/Dashboard/presentation/components/RateNoteTooltip";

describe("RateNoteTooltip", () => {
  it("renders the accessible question-mark popover trigger when the note has text", () => {
    const html = renderToStaticMarkup(
      <RateNoteTooltip investmentName="SP500" note="Escenario ilustrativo de largo plazo." />,
    );

    expect(html).toContain("rate-note-tooltip-trigger");
    expect(html).toContain("formula-tooltip-trigger");
    expect(html).toMatch(/<span class="[^"]+" aria-hidden="true">\?<\/span>/);
    expect(html).not.toContain("lucide-circle-help");
    expect(html).toContain('aria-label="Leer nota de la tasa anual de SP500"');
    expect(html).toContain("<button");
  });

  it.each([null, undefined, "", "   "])("does not render a trigger when the note is %j", (note) => {
    const html = renderToStaticMarkup(<RateNoteTooltip investmentName="SP500" note={note} />);

    expect(html).toBe("");
  });
});
