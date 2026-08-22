import { forwardRef, useEffect, useRef, type ButtonHTMLAttributes, type ReactNode } from "react";

type MagneticButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  strength?: number;
};

export const MagneticButton = forwardRef<HTMLButtonElement, MagneticButtonProps>(
  ({ children, className = "", strength = 0.12, ...props }, forwardedRef) => {
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
      const button = buttonRef.current;
      if (!button) return;

      const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (!finePointer.matches || reduced.matches) return;

      let raf = 0;
      let targetX = 0;
      let targetY = 0;
      let currentX = 0;
      let currentY = 0;

      const paint = () => {
        raf = 0;
        currentX += (targetX - currentX) * 0.22;
        currentY += (targetY - currentY) * 0.22;
        button.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;
        const settled = Math.abs(targetX - currentX) < 0.05 && Math.abs(targetY - currentY) < 0.05;
        if (!settled) raf = requestAnimationFrame(paint);
      };

      const schedule = () => {
        if (!raf) raf = requestAnimationFrame(paint);
      };

      const move = (event: PointerEvent) => {
        const rect = button.getBoundingClientRect();
        targetX = (event.clientX - (rect.left + rect.width / 2)) * strength;
        targetY = (event.clientY - (rect.top + rect.height / 2)) * strength;
        schedule();
      };

      const reset = () => {
        targetX = 0;
        targetY = 0;
        schedule();
      };

      button.addEventListener("pointermove", move, { passive: true });
      button.addEventListener("pointerleave", reset, { passive: true });
      button.addEventListener("pointercancel", reset, { passive: true });

      return () => {
        button.removeEventListener("pointermove", move);
        button.removeEventListener("pointerleave", reset);
        button.removeEventListener("pointercancel", reset);
        if (raf) cancelAnimationFrame(raf);
        button.style.transform = "";
      };
    }, [strength]);

    const setRef = (node: HTMLButtonElement | null) => {
      buttonRef.current = node;
      if (typeof forwardedRef === "function") forwardedRef(node);
      else if (forwardedRef) forwardedRef.current = node;
    };

    return (
      <button
        {...props}
        ref={setRef}
        className={`lightswind-magnetic-button${className ? ` ${className}` : ""}`}
      >
        {children}
      </button>
    );
  },
);

MagneticButton.displayName = "MagneticButton";

export default MagneticButton;

export type { MagneticButtonProps };
