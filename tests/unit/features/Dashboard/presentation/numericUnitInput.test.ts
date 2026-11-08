import { describe, expect, it } from "vitest";
import { formatNumericUnitValue } from "../../../../../src/features/Dashboard/presentation/formatters/formatNumericUnitValue.util";
import { parseNumericUnitValue } from "../../../../../src/features/Dashboard/presentation/formatters/parseNumericUnitValue.util";

describe("financial numeric input formatting", () => {
  it("formats two decimals with the es-EC decimal comma and no grouping", () => {
    expect(formatNumericUnitValue(2)).toBe("2,00");
    expect(formatNumericUnitValue(1234.5)).toBe("1234,50");
    expect(formatNumericUnitValue(-7)).toBe("-7,00");
  });

  it("parses comma or dot decimals and preserves partial drafts", () => {
    expect(parseNumericUnitValue("7,25")).toBe(7.25);
    expect(parseNumericUnitValue("7.25")).toBe(7.25);
    expect(parseNumericUnitValue("-")).toBeNull();
    expect(parseNumericUnitValue("")).toBeNull();
  });
});
