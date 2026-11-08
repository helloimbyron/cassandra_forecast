import type { DETAIL_SERIES_VALUES } from "@/features/Dashboard/presentation/enums/detailSeries.enum";

export type DetailSeries = (typeof DETAIL_SERIES_VALUES)[keyof typeof DETAIL_SERIES_VALUES];
