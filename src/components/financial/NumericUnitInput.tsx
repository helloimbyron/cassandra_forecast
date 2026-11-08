import { useEffect, useRef, useState, type ChangeEvent, type KeyboardEvent } from "react";
import { Input } from "@/components/ui/input";
import {
  formatNumericUnitValue,
  parseNumericUnitValue,
} from "@/shared/format/format-numeric-unit-input";
import { adjacentStepValue } from "@/features/portfolio/presentation/utils/adjacentStepValue";
import { INPUT_DEBOUNCE_MS } from "@/components/ui/DebouncedSlider";
import { createDebouncedCallback } from "@/shared/utils/createDebouncedCallback";

export type NumericUnitInputProps = {
  id: string;
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  unit: "money" | "percent";
  onChange: (value: number) => void;
};

export function NumericUnitInput({
  id,
  label,
  value,
  min = -Infinity,
  max = Infinity,
  step,
  unit,
  onChange,
}: NumericUnitInputProps) {
  const increment = step ?? (unit === "money" ? 10 : 0.1);
  const [draft, setDraft] = useState(() => formatNumericUnitValue(value));
  const focused = useRef(false);
  const dirty = useRef(false);
  const onChangeRef = useRef(onChange);
  const debouncedChange = useRef<ReturnType<typeof createDebouncedCallback<[number]>> | null>(null);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    const debounced = createDebouncedCallback(
      (next: number) => onChangeRef.current(next),
      INPUT_DEBOUNCE_MS,
    );
    debouncedChange.current = debounced;
    return () => {
      debounced.cancel();
      debouncedChange.current = null;
    };
  }, []);

  function scheduleChange(next: number) {
    debouncedChange.current?.(next);
  }

  useEffect(() => {
    debouncedChange.current?.cancel();
    if (!focused.current) setDraft(formatNumericUnitValue(value));
  }, [value]);

  function commit(next: number) {
    const clamped = Math.min(max, Math.max(min, next));
    scheduleChange(clamped);
    setDraft(formatNumericUnitValue(clamped));
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const text = event.currentTarget.value;
    setDraft(text);
    dirty.current = true;
    const parsed = parseNumericUnitValue(text);
    if (parsed !== null) scheduleChange(Math.min(max, Math.max(min, parsed)));
  }

  function handleBlur() {
    focused.current = false;
    if (!dirty.current) {
      setDraft(formatNumericUnitValue(value));
      return;
    }
    dirty.current = false;
    commit(parseNumericUnitValue(draft) ?? value);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
    event.preventDefault();
    event.stopPropagation();
    const direction = event.key === "ArrowUp" ? 1 : -1;
    const current = parseNumericUnitValue(draft) ?? value;
    commit(Math.min(max, Math.max(min, adjacentStepValue(current, increment, direction))));
    dirty.current = false;
  }

  return (
    <div className={`numeric-unit-input is-${unit}`}>
      {unit === "money" && (
        <span className="numeric-unit-affix" aria-hidden="true">
          $
        </span>
      )}
      <Input
        id={id}
        type="text"
        inputMode="decimal"
        value={draft}
        aria-label={label}
        onFocus={() => {
          focused.current = true;
        }}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />
      {unit === "percent" && (
        <span className="numeric-unit-affix" aria-hidden="true">
          %
        </span>
      )}
    </div>
  );
}
