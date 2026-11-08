import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { AbbreviatedValue } from "../src/components/money/AbbreviatedValue";

describe("AbbreviatedValue interaction", () => {
  it("renders an interactive trigger for abbreviated standalone values", () => {
    const html = renderToStaticMarkup(<AbbreviatedValue value={12_345} unit="currency" />);
    expect(html).toContain("<button");
    expect(html).toContain("$12,35");
    expect(html).toContain("valor completo");
  });

  it("renders only text inside a floating tooltip", () => {
    const html = renderToStaticMarkup(
      <AbbreviatedValue value={12_345} unit="currency" interaction="text" />,
    );
    expect(html).toContain("<span");
    expect(html).toContain("$12,35");
    expect(html).not.toContain("<button");
    expect(html).not.toContain("aria-label");
  });
});
