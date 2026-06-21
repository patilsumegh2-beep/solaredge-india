/**
 * Minimal in-memory sliding-window rate limiter.
 *
 * Good enough to blunt form abuse on a single instance. NOTE: it resets on
 * redeploy and is per-instance — for multi-region/serverless scale, swap the
 * Map for Upstash Redis (env vars are already scaffolded in .env.example).
 */
type Hits = number[];
const store = new Map<string, Hits>();

export type RateLimitResult = {
  ok: boolean;
  remaining: number;
  retryAfterSeconds: number;
};

export function rateLimit(
  key: string,
  limit = 5,
  windowMs = 10 * 60 * 1000,
): RateLimitResult {
  const now = Date.now();
  const recent = (store.get(key) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  store.set(key, recent);

  // Opportunistic cleanup so the Map can't grow unbounded.
  if (store.size > 5000) {
    for (const [k, v] of store) {
      if (v.every((t) => now - t >= windowMs)) store.delete(k);
    }
  }

  const oldest = recent[0] ?? now;
  return {
    ok: recent.length <= limit,
    remaining: Math.max(0, limit - recent.length),
    retryAfterSeconds: Math.ceil((windowMs - (now - oldest)) / 1000),
  };
}
