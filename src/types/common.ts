export type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

export interface ApiEnvelope<T> {
  data?: T;
  error?: string;
  timestamp: string;
}
