import { describe, expect, it } from "vitest";
import { formatAbbreviatedValue } from "../../../../../src/features/Dashboard/presentation/formatters/formatAbbreviatedValue.util";

describe("presentation percent formatting", () => {
  it("shows ordinary percentages at two decimals", () => {
    expect(formatAbbreviatedValue(11.93, "percent")).toBe("11,93%");
  });

  it("abbreviates large percentages without a currency sign", () => {
    const abbreviated = formatAbbreviatedValue(478_249_312, "percent").replaceAll("\u200b", "");
    expect(abbreviated).toBe("478,25M%");
    expect(abbreviated).not.toContain("$");
  });
});
