// Lightweight client event tracking.
// Lovable's native analytics reports page views for published sites; this helper
// records interaction events and forwards them to any analytics layer present
// (dataLayer / gtag / Lovable events) without adding a dependency.
type EventProps = Record<string, string | number | boolean>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, props: EventProps = {}) {
  if (typeof window === "undefined") return;
  const payload = { event: name, ...props, path: window.location.pathname };
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
    window.gtag?.("event", name, props);
  } catch {
    /* analytics must never break the UI */
  }
  if (import.meta.env.DEV) console.debug("[analytics]", payload);
}
