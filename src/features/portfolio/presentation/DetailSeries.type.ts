import type { DETAIL_SERIES_VALUES } from "./detailSeries.enum";

export type DetailSeries = (typeof DETAIL_SERIES_VALUES)[keyof typeof DETAIL_SERIES_VALUES];
