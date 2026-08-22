import { useEffect, useRef } from "react";

export function SmoothCursor() {
  const promptRef = useRef<HTMLSpanElement>(null);
  const caretRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reduced.matches) return;

    document.documentElement.dataset.cursorEnhanced = "true";

    let raf = 0;
    let targetX = -100;
    let targetY = -100;
    let x = targetX;
    let y = targetY;
    let pressed = false;

    const paint = () => {
      raf = 0;
      x += (targetX - x) * 0.2;
      y += (targetY - y) * 0.2;
      const transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      promptRef.current?.style.setProperty("transform", transform);
      caretRef.current?.style.setProperty("transform", transform);

      const settled = Math.abs(targetX - x) < 0.05 && Math.abs(targetY - y) < 0.05;
      if (!settled) raf = requestAnimationFrame(paint);
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };

    const move = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      promptRef.current?.setAttribute("data-visible", "true");
      caretRef.current?.setAttribute("data-visible", "true");
      schedule();
    };
    const down = () => {
      pressed = true;
      promptRef.current?.setAttribute("data-pressed", "true");
      caretRef.current?.setAttribute("data-pressed", "true");
    };
    const up = () => {
      pressed = false;
      promptRef.current?.setAttribute("data-pressed", "false");
      caretRef.current?.setAttribute("data-pressed", "false");
    };
    const leave = () => {
      targetX = -100;
      targetY = -100;
      promptRef.current?.setAttribute("data-visible", "false");
      caretRef.current?.setAttribute("data-visible", "false");
      schedule();
    };
    const cancel = () => {
      pressed = false;
      promptRef.current?.setAttribute("data-pressed", "false");
      caretRef.current?.setAttribute("data-pressed", "false");
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down, { passive: true });
    window.addEventListener("pointerup", up, { passive: true });
    window.addEventListener("pointercancel", cancel, { passive: true });
    window.addEventListener("blur", cancel, { passive: true });
    window.addEventListener("pointerleave", leave, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", cancel);
      window.removeEventListener("blur", cancel);
      window.removeEventListener("pointerleave", leave);
      document.documentElement.removeAttribute("data-cursor-enhanced");
      if (raf) cancelAnimationFrame(raf);
      void pressed;
    };
  }, []);

  return (
    <div className="lightswind-smooth-cursor" aria-hidden="true">
      <span ref={promptRef} className="lightswind-smooth-cursor-prompt" data-visible="false" data-pressed="false" />
      <span ref={caretRef} className="lightswind-smooth-cursor-caret" data-visible="false" data-pressed="false" />
    </div>
  );
}

export default SmoothCursor;
