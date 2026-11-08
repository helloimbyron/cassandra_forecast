import { describe, expect, it } from "vitest";
import { normalizeContributionInputValue } from "../../../../../src/features/Dashboard/presentation/utils/normalizeContributionInputValue.util";

describe("monthly contribution input normalization", () => {
  it.each([
    ["05", "5"],
    ["0005", "5"],
    ["0", "0"],
    ["0.5", "0.5"],
    ["50", "50"],
    ["", ""],
  ])("normalizes %j to %j", (input, expected) => {
    expect(normalizeContributionInputValue(input)).toBe(expected);
  });

  it("normalizes pasted values and redundant zero decimals", () => {
    expect(normalizeContributionInputValue("0005.25")).toBe("5.25");
    expect(normalizeContributionInputValue("00.5")).toBe("0.5");
  });
});
