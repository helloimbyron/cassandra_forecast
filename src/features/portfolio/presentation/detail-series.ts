export const DETAIL_SERIES = { total: "total", invested: "invested" } as const;
export type DetailSeries = (typeof DETAIL_SERIES)[keyof typeof DETAIL_SERIES];
