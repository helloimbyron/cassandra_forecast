import type { PROJECTION_SCOPE_VALUES } from "@/features/Portfolio/presentation/enums/projectionScope.enum";

export type ProjectionScope =
  (typeof PROJECTION_SCOPE_VALUES)[keyof typeof PROJECTION_SCOPE_VALUES];
