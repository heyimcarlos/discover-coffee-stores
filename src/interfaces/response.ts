export type Response = {};

export type QueryResponse<T> = {
  results: T[];
  context?: { geo_bounds: { circle: [{}] } };
};
