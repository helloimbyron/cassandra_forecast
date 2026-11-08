import { useEffect, useRef, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { createDebouncedCallback } from "@/shared/utils/createDebouncedCallback";

export const INPUT_DEBOUNCE_MS = 100;

type DebouncedSliderProps = Omit<React.ComponentProps<typeof Slider>, "value" | "onValueChange"> & {
  value: number[];
  onValueChange: (value: number[]) => void;
  onDraftValueChange?: (value: number[]) => void;
};

function sameValues(left: number[], right: number[]) {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

/** Keeps the thumb responsive while publishing only the last value after a short pause. */
export function DebouncedSlider({
  value,
  onValueChange,
  onDraftValueChange,
  ...props
}: DebouncedSliderProps) {
  const [draft, setDraft] = useState(value);
  const valueRef = useRef(value);
  const onValueChangeRef = useRef(onValueChange);
  const debouncedCommit = useRef<ReturnType<typeof createDebouncedCallback<[number[]]>> | null>(
    null,
  );
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
    if (sameValues(valueRef.current, value)) return;
    valueRef.current = value;
    debouncedCommit.current?.cancel();
    setDraft(value);
    onDraftValueChange?.(value);
  }, [value, onDraftValueChange]);

  function handleValueChange(next: number[]) {
    setDraft(next);
    onDraftValueChange?.(next);
    debouncedCommit.current?.(next);
  }

  return <Slider {...props} value={draft} onValueChange={handleValueChange} />;
}
