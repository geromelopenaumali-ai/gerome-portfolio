import type Lenis from "lenis";

export const LENIS_DURATION = 1.4;

// A softer ease-out avoids the abrupt stop of a short exponential curve while
// keeping the scroll responsive enough for repeated wheel input.
export const LENIS_EASING = (t: number) => 1 - Math.pow(1 - t, 4);

let activeLenis: Lenis | null = null;
let wakeLenis: (() => void) | null = null;

export function setActiveLenis(instance: Lenis | null) {
  activeLenis = instance;
}

export function getActiveLenis() {
  return activeLenis;
}

export function isLenisActive() {
  return activeLenis !== null;
}

export function setLenisWake(callback: (() => void) | null) {
  wakeLenis = callback;
}

export function scrollToTopWithLenis() {
  if (!activeLenis) return false;
  activeLenis.scrollTo(0, {
    duration: LENIS_DURATION,
    easing: LENIS_EASING,
    force: true,
  });
  wakeLenis?.();
  return true;
}
