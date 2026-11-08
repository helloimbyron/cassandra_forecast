export const PROJECTION_SCOPE = { investment: "investment", position: "position" } as const;
export type ProjectionScope = (typeof PROJECTION_SCOPE)[keyof typeof PROJECTION_SCOPE];
