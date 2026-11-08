import { describe, expect, it } from "vitest";
import {
  formatAbbreviatedUsd,
  formatAxisUsd,
  formatFullUsd,
} from "../../../../../src/features/Portfolio";
import { formatAbbreviatedValue } from "../../../../../src/features/Portfolio/presentation/format/formatAbbreviatedValue.util";
import { formatFullValue } from "../../../../../src/features/Portfolio/presentation/format/formatFullValue.util";

const visible = (value: string) => value.replaceAll("\u200b", "");

describe("shared abbreviated-value formatter", () => {
  it("preserves locale and unit for small and negative values", () => {
    expect(formatAbbreviatedUsd(0)).toBe(formatFullUsd(0));
    expect(formatAbbreviatedUsd(999.99)).toBe(formatFullUsd(999.99));
    expect(formatAbbreviatedUsd(-999.99)).toBe(formatFullUsd(-999.99));
    expect(visible(formatAbbreviatedValue(-23_990.4, "currency"))).toBe("$-23,99K");
    expect(visible(formatAbbreviatedValue(-11_245, "percent"))).toBe("-11,25K%");
    expect(formatFullValue(11.93, "percent")).toBe("11,93%");
  });

  it("uses SI powers through Q and a Q coefficient before 1e33", () => {
    const suffixes = ["K", "M", "G", "T", "P", "E", "Z", "Y", "R", "Q"];
    suffixes.forEach((suffix, index) => {
      expect(visible(formatAbbreviatedUsd(10 ** ((index + 1) * 3)))).toBe(`$1${suffix}`);
    });
    expect(visible(formatAbbreviatedUsd(123e30))).toBe("$123Q");
    expect(visible(formatAbbreviatedValue(478_249_312.25, "percent"))).toBe("478,25M%");
  });

  it("promotes rounded values and switches to scientific text at 1e33", () => {
    expect(visible(formatAbbreviatedUsd(999_995))).toBe("$1M");
    expect(visible(formatAbbreviatedUsd(999_995_000))).toBe("$1G");
    expect(visible(formatAbbreviatedUsd(1e33))).toMatch(/^\$1E33$/);
    expect(visible(formatAbbreviatedValue(1e33, "percent"))).toMatch(/^1E33%$/);
    expect(visible(formatAbbreviatedUsd(1e123))).toMatch(/^\$1E123$/);
  });

  it("uses the same scale for plain chart-axis text", () => {
    expect(visible(formatAxisUsd(23_990))).toBe("$24K");
    expect(visible(formatAxisUsd(999_999))).toBe("$1M");
    expect(visible(formatAxisUsd(1e9))).toBe("$1G");
    expect(visible(formatAxisUsd(1e33))).toMatch(/^\$1E33$/);
  });

  it("guards non-finite values and preserves precise ordinary percentages", () => {
    for (const value of [NaN, Infinity, -Infinity]) {
      expect(formatAbbreviatedValue(value, "currency")).toBe("—");
      expect(formatAbbreviatedValue(value, "percent")).toBe("—");
      expect(formatFullValue(value, "currency")).toBe("—");
    }
    expect(formatAbbreviatedValue(9.3333333333, "percent", "precise")).toBe("9,3333333333%");
  });
});
