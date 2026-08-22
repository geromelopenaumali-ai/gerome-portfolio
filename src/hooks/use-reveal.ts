import { useEffect, useRef, useState } from "react";

/**
 * Fires once when the element first scrolls into view.
 * Falls back to "revealed" when IntersectionObserver is unavailable,
 * so content is never stuck hidden.
 */
export function useReveal<T extends HTMLElement>(rootMargin = "-8% 0px -10% 0px") {
  const ref = useRef<T | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setRevealed(true);
            io.disconnect();
          }
        }
      },
      { rootMargin, threshold: 0.05 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [rootMargin]);

  return { ref, revealed };
}
