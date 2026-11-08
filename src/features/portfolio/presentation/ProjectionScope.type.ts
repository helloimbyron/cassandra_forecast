import type { PROJECTION_SCOPE_VALUES } from "./projectionScope.enum";

export type ProjectionScope =
  (typeof PROJECTION_SCOPE_VALUES)[keyof typeof PROJECTION_SCOPE_VALUES];
