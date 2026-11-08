export const copy = {
  label: (name: string, value: string, rounded: boolean) =>
    rounded ? `${name}: ${value}; las cifras visibles están redondeadas` : `${name}: ${value}`,
} as const;
