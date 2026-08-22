import { useEffect } from "react";
import Lenis from "lenis";
import { LENIS_DURATION, LENIS_EASING, setActiveLenis, setLenisWake } from "@/lib/lenis";

/**
 * Runs `fn` once the page has fully loaded and painted, after React has
 * hydrated lazy route content. Returns a cancel function.
 */
function afterHydration(fn: () => void) {
  let cancelled = false;
  const go = () =>
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        if (!cancelled) fn();
      }),
    );
  if (document.readyState === "complete") {
    go();
  } else {
    window.addEventListener("load", go, { once: true });
  }
  return () => {
    cancelled = true;
  };
}

/**
 * The portfolio keeps three motion systems only:
 * 1. the hero name word sweep;
 * 2. CTA-only magnetic motion with a local booking glow;
 * 3. one shared section fade-and-rise reveal.
 */
export function SmoothLayer() {
  // Match the Lightswind reference: ease desktop wheel input through Lenis while
  // leaving touch/coarse pointers and reduced-motion users on native scrolling.
  // Manual RAF keeps this lifecycle compatible with the existing motion layer.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || coarse) return;

    const lenis = new Lenis({
      smoothWheel: true,
      duration: LENIS_DURATION,
      easing: LENIS_EASING,
      autoRaf: false,
      anchors: false,
      prevent: (node) => Boolean(node.closest("[data-lenis-prevent]")),
    });
    setActiveLenis(lenis);

    // Lenis only needs frames while it is easing toward a new scroll position.
    // Keeping the loop asleep at rest removes an idle 60fps workload from the
    // entire page while preserving smooth wheel, keyboard, and button scrolling.
    let raf = 0;
    let running = false;
    const stop = () => {
      if (raf) window.cancelAnimationFrame(raf);
      raf = 0;
      running = false;
    };
    const frame = (time: number) => {
      raf = 0;
      lenis.raf(time);
      if (lenis.isScrolling) {
        raf = window.requestAnimationFrame(frame);
      } else {
        running = false;
      }
    };
    const wake = () => {
      if (running) return;
      running = true;
      raf = window.requestAnimationFrame(frame);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.matches("input, textarea, select, [contenteditable=\"true\"]")) return;
      if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(event.key)) {
        wake();
      }
    };

    setLenisWake(wake);
    window.addEventListener("wheel", wake, { passive: true });
    window.addEventListener("touchstart", wake, { passive: true });
    window.addEventListener("keydown", onKeyDown, { passive: true });

    return () => {
      stop();
      setLenisWake(null);
      window.removeEventListener("wheel", wake);
      window.removeEventListener("touchstart", wake);
      window.removeEventListener("keydown", onKeyDown);
      setActiveLenis(null);
      lenis.destroy();
    };
  }, []);

  // CTA-only magnetic motion. Pointer targets are eased toward their destination
  // so the glow feels attached to the cursor without jitter or a hard snap on leave.
  useEffect(() => {
    if (window.matchMedia("(hover: none), (pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;

    const targets = Array.from(document.querySelectorAll<HTMLElement>(".v-cta-primary.magnetic-target"));
    const cleanups: Array<() => void> = [];

    targets.forEach((target) => {
      let raf = 0;
      let running = false;
      let x = 0;
      let y = 0;
      let glowX = 50;
      let glowY = 50;
      let targetX = 0;
      let targetY = 0;
      let targetGlowX = 50;
      let targetGlowY = 50;

      const paint = () => {
        raf = 0;
        x += (targetX - x) * 0.18;
        y += (targetY - y) * 0.18;
        glowX += (targetGlowX - glowX) * 0.22;
        glowY += (targetGlowY - glowY) * 0.22;
        target.style.setProperty("--mag-x", `${x.toFixed(2)}px`);
        target.style.setProperty("--mag-y", `${y.toFixed(2)}px`);
        target.style.setProperty("--cta-glow-x", `${glowX.toFixed(1)}%`);
        target.style.setProperty("--cta-glow-y", `${glowY.toFixed(1)}%`);

        const settled = Math.abs(targetX - x) < 0.02 && Math.abs(targetY - y) < 0.02 && Math.abs(targetGlowX - glowX) < 0.08 && Math.abs(targetGlowY - glowY) < 0.08;
        if (!settled || running) raf = requestAnimationFrame(paint);
        if (settled) running = false;
      };
      const start = () => {
        if (running) return;
        running = true;
        if (!raf) raf = requestAnimationFrame(paint);
      };
      const move = (event: PointerEvent) => {
        target.style.willChange = "transform";
        const rect = target.getBoundingClientRect();
        const px = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
        const py = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
        targetX = (px - 0.5) * 7;
        targetY = (py - 0.5) * 5;
        targetGlowX = px * 100;
        targetGlowY = py * 100;
        start();
      };
      const reset = () => {
        target.style.willChange = "auto";
        targetX = 0;
        targetY = 0;
        targetGlowX = 50;
        targetGlowY = 50;
        start();
      };
      target.addEventListener("pointermove", move, { passive: true });
      target.addEventListener("pointerleave", reset, { passive: true });
      cleanups.push(() => {
        target.removeEventListener("pointermove", move);
        target.removeEventListener("pointerleave", reset);
        if (raf) cancelAnimationFrame(raf);
        target.style.removeProperty("will-change");
        target.style.removeProperty("--mag-x");
        target.style.removeProperty("--mag-y");
        target.style.removeProperty("--cta-glow-x");
        target.style.removeProperty("--cta-glow-y");
      });
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  // Workflow nodes use a fixed tooltip so inspection never changes layout. The
  // observer also catches workflow SVGs mounted later inside project dialogs.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tooltip = document.createElement("div");
    tooltip.className = "workflow-node-tooltip";
    tooltip.setAttribute("role", "status");
    tooltip.hidden = true;
    document.body.appendChild(tooltip);

    let active: SVGGElement | null = null;
    let roots: HTMLElement[] = [];
    const cleanups: Array<() => void> = [];

    const hide = () => {
      if (!active) return;
      active.removeAttribute("data-inspected");
      active.closest<HTMLElement>("[class*='workflow-viz']")?.classList.remove("workflow-node-inspected");
      active = null;
      tooltip.dataset.visible = "false";
      if (reduce) tooltip.hidden = true;
    };
    const show = (node: SVGGElement) => {
      const root = node.closest<HTMLElement>("[class*='workflow-viz']");
      if (!root) return;
      const label = node.querySelector<SVGTextElement>(".node-text")?.textContent?.trim();
      if (!label) return;
      active?.removeAttribute("data-inspected");
      active?.closest<HTMLElement>("[class*='workflow-viz']")?.classList.remove("workflow-node-inspected");
      active = node;
      active.setAttribute("data-inspected", "true");
      root.classList.add("workflow-node-inspected");
      tooltip.textContent = `Insight · ${label.toLowerCase()}`;
      tooltip.hidden = false;
      tooltip.dataset.visible = "true";
      const rect = node.getBoundingClientRect();
      tooltip.style.setProperty("--tooltip-x", `${rect.left + rect.width / 2}px`);
      tooltip.style.setProperty("--tooltip-y", `${Math.max(14, rect.top - 12)}px`);
    };
    const bindRoot = (root: HTMLElement) => {
      if (roots.includes(root)) return;
      roots.push(root);
      root.querySelectorAll<SVGGElement>("g").forEach((node) => {
        if (!node.querySelector(".card")) return;
        const label = node.querySelector<SVGTextElement>(".node-text")?.textContent?.trim();
        if (!label) return;
        node.tabIndex = 0;
        node.setAttribute("aria-label", `${label}: inspect workflow insight`);
        const enter = () => show(node);
        const leave = (event: PointerEvent) => {
          if (!node.contains(event.relatedTarget as Node | null)) hide();
        };
        const focusLeave = () => hide();
        node.addEventListener("pointerenter", enter);
        node.addEventListener("pointerleave", leave);
        node.addEventListener("focusin", enter);
        node.addEventListener("focusout", focusLeave);
        cleanups.push(() => {
          node.removeEventListener("pointerenter", enter);
          node.removeEventListener("pointerleave", leave);
          node.removeEventListener("focusin", enter);
          node.removeEventListener("focusout", focusLeave);
        });
      });
    };
    const discover = () => {
      document.querySelectorAll<HTMLElement>("[class*='workflow-viz']").forEach(bindRoot);
    };
    const mutation = new MutationObserver(discover);
    mutation.observe(document.body, { childList: true, subtree: true });
    discover();

    return () => {
      mutation.disconnect();
      cleanups.forEach((cleanup) => cleanup());
      tooltip.remove();
    };
  }, []);

  // One observer owns the master `.wb-reveal` class. Legacy selectors are
  // upgraded in place so existing sections keep their reveal behavior while
  // late-mounted project detail content can opt in without another system.
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const legacySelectors = [
      ".v-note > h2",
      ".v-featured-col",
      ".v-featured-note",
      ".v-role",
      ".v-tags",
      ".v-contact",
      ".v-contact-heading",
      ".v-note-footer",
    ];
    const observed = new WeakSet<HTMLElement>();
    const touched: HTMLElement[] = [];
    let observeRaf = 0;
    let safety = 0;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.dataset.reveal = "in";
          io.unobserve(el);
        }
      },
      { rootMargin: "-6% 0px -8% 0px", threshold: 0.05 },
    );

    const observeAll = () => {
      observeRaf = 0;
      for (const selector of legacySelectors) {
        document.querySelectorAll<HTMLElement>(selector).forEach((node) => {
          node.classList.add("wb-reveal");
        });
      }

      document.querySelectorAll<HTMLElement>(".wb-reveal").forEach((node) => {
        if (observed.has(node) || node.dataset.reveal === "in") return;
        node.dataset.reveal = "out";
        observed.add(node);
        touched.push(node);
        io.observe(node);
      });
    };

    const schedule = () => {
      if (!observeRaf) observeRaf = window.requestAnimationFrame(observeAll);
    };
    const cancel = afterHydration(() => {
      observeAll();
      safety = window.setTimeout(() => {
        for (const node of touched) {
          if (node.getBoundingClientRect().top < window.innerHeight) node.dataset.reveal = "in";
        }
      }, 1200);
    });
    const mutation = new MutationObserver(schedule);
    mutation.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mutation.disconnect();
      cancel();
      window.clearTimeout(safety);
      if (observeRaf) window.cancelAnimationFrame(observeRaf);
    };
  }, []);

  return null;
}
