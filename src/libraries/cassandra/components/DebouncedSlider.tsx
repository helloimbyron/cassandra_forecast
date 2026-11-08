import { useEffect, useRef, useState } from "react";
import { Slider } from "@/libraries/shadcn/components/Slider";
import { INPUT_DEBOUNCE_MS } from "@/libraries/cassandra/constants/inputDebounceMs.constant";
import { createDebouncedCallback } from "@/shared/utils/createDebouncedCallback.util";
import { areNumberArraysEqual } from "@/shared/utils/areNumberArraysEqual.util";

// --- Props ---

type DebouncedSliderProps = Omit<React.ComponentProps<typeof Slider>, "value" | "onValueChange"> & {
  value: number[];
  onValueChange: (value: number[]) => void;
  onDraftValueChange?: (value: number[]) => void;
};

// --- Components ---

/** Mantiene el control ágil y publica solo el último valor tras una breve pausa. */
export function DebouncedSlider({
  value,
  onValueChange,
  onDraftValueChange,
  ...props
}: DebouncedSliderProps) {
  // --- States ---

  const [draft, setDraft] = useState(value);
  const valueRef = useRef(value);
  const onValueChangeRef = useRef(onValueChange);
  const debouncedCommit = useRef<ReturnType<typeof createDebouncedCallback<[number[]]>> | null>(
    null,
  );

  // --- Effects ---

  useEffect(() => {
    onValueChangeRef.current = onValueChange;
  }, [onValueChange]);

  useEffect(() => {
    const debounced = createDebouncedCallback((next: number[]) => {
      valueRef.current = next;
      onValueChangeRef.current(next);
    }, INPUT_DEBOUNCE_MS);
    debouncedCommit.current = debounced;

    return () => {
      debounced.cancel();
      debouncedCommit.current = null;
    };
  }, []);

  useEffect(() => {
    if (areNumberArraysEqual(valueRef.current, value)) {
      return;
    }
    valueRef.current = value;
    debouncedCommit.current?.cancel();
    setDraft(value);
    onDraftValueChange?.(value);
  }, [value, onDraftValueChange]);

  // --- Handlers ---

  function handleValueChange(next: number[]) {
    setDraft(next);
    onDraftValueChange?.(next);
    debouncedCommit.current?.(next);
  }

  // --- Return ---

  return <Slider {...props} value={draft} onValueChange={handleValueChange} />;
}
