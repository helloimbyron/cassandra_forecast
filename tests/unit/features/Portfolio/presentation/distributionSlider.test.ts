import { describe, expect, it } from "vitest";
import { adjacentStepValue } from "../../../../../src/features/Portfolio/presentation/utils/adjacentStepValue.util";

describe("rate slider quarter steps", () => {
  it("moves an off-grid default to the adjacent quarter point", () => {
    expect(adjacentStepValue(6.13, 0.25, 1)).toBe(6.25);
    expect(adjacentStepValue(6.13, 0.25, -1)).toBe(6);
  });

  it("moves from a value already on the quarter-point grid", () => {
    expect(adjacentStepValue(6.25, 0.25, 1)).toBe(6.5);
    expect(adjacentStepValue(6.25, 0.25, -1)).toBe(6);
    expect(adjacentStepValue(-1, 0.25, 1)).toBe(-0.75);
    expect(adjacentStepValue(-1, 0.25, -1)).toBe(-1.25);
  });
});
