export type TrackParams = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    posthog?: { capture: (event: string, params?: TrackParams) => void };
  }
}

/**
 * Fire an analytics event. Pushes a GTM-style event onto window.dataLayer
 * and forwards to PostHog when the PostHog snippet is configured.
 * Safe to call anywhere — it is a no-op during SSR.
 */
export function trackEvent(name: string, params: TrackParams = {}): void {
  if (typeof window === "undefined") return;
  try {
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({ event: name, ...params });
    window.posthog?.capture(name, params);
  } catch {
    // Analytics must never break the page.
  }
}
