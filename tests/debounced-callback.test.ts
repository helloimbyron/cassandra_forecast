import { afterEach, describe, expect, it, vi } from "vitest";
import { createDebouncedCallback } from "../src/shared/utils/createDebouncedCallback";

describe("createDebouncedCallback", () => {
  afterEach(() => vi.useRealTimers());

  it("waits for the delay and commits only the latest value after rapid changes", () => {
    vi.useFakeTimers();
    const callback = vi.fn();
    const debounced = createDebouncedCallback(callback, 100);

    debounced(4);
    vi.advanceTimersByTime(50);
    debounced(9);
    vi.advanceTimersByTime(99);
    expect(callback).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(9);
  });

  it("cancels a pending value when an external update replaces it", () => {
    vi.useFakeTimers();
    const callback = vi.fn();
    const debounced = createDebouncedCallback(callback, 100);

    debounced(12);
    debounced.cancel();
    vi.advanceTimersByTime(100);
    expect(callback).not.toHaveBeenCalled();
  });
});
