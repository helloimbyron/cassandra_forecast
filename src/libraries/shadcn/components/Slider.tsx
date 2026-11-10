import * as veSliderStyles from "./Slider.css.ts";
import * as React from "react";
import { cn } from "@/libraries/shadcn/utils/cn.util";
import { Slider as SliderPrimitive } from "radix-ui";

// --- Components ---

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  // --- Variables ---

  const _values = React.useMemo(
    () => (Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [min, max]),
    [value, defaultValue, min, max],
  );

  // --- Return ---

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={[veSliderStyles.sliderRoot, cn("ui-slider", className)].filter(Boolean).join(" ")}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={[veSliderStyles.sliderTrackRoot, "ui-slider-track"].filter(Boolean).join(" ")}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={[veSliderStyles.sliderRangeRoot, "ui-slider-range"].filter(Boolean).join(" ")}
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className={[veSliderStyles.sliderThumbRoot, "ui-slider-thumb"].filter(Boolean).join(" ")}
        />
      ))}
    </SliderPrimitive.Root>
  );
}

export { Slider };
