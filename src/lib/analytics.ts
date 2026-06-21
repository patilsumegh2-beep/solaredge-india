type Props = Record<string, string | number | boolean>;

type PlausibleFn = (event: string, options?: { props?: Props }) => void;

/**
 * Provider-agnostic, cookieless conversion tracking. No-ops unless an analytics
 * provider (Plausible) is actually loaded — so it's safe to call anywhere.
 */
export function track(event: string, props?: Props) {
  if (typeof window === "undefined") return;
  const fn = (window as unknown as { plausible?: PlausibleFn }).plausible;
  if (typeof fn === "function") fn(event, props ? { props } : undefined);
}
