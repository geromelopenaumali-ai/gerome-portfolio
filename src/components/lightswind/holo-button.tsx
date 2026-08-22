import type { CSSProperties, ButtonHTMLAttributes, PointerEvent as ReactPointerEvent } from "react";
import { forwardRef, useRef } from "react";

type HoloButtonVariant = "primary" | "cyber" | "rosegold" | "glass";
type HoloButtonSize = "sm" | "md" | "lg" | "xl";
type HoloButtonTheme = "light" | "dark" | "system";

export interface HoloButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: HoloButtonVariant;
  size?: HoloButtonSize;
  glowSize?: number;
  theme?: HoloButtonTheme;
}

const callHandler = <T,>(handler: ((event: T) => void) | undefined, event: T) => {
  handler?.(event);
};

const HoloButton = forwardRef<HTMLButtonElement, HoloButtonProps>(
  function HoloButton(
    {
      children,
      className = "",
      variant = "primary",
      size = "md",
      glowSize = 120,
      theme = "system",
      style,
      onPointerMove,
      onPointerLeave,
      ...props
    },
    forwardedRef,
  ) {
    const localRef = useRef<HTMLButtonElement | null>(null);

    const setRefs = (node: HTMLButtonElement | null) => {
      localRef.current = node;
      if (typeof forwardedRef === "function") forwardedRef(node);
      else if (forwardedRef) forwardedRef.current = node;
    };

    const handlePointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
      const element = localRef.current;
      if (element) {
        const rect = element.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        element.style.setProperty("--holo-x", `${x.toFixed(2)}%`);
        element.style.setProperty("--holo-y", `${y.toFixed(2)}%`);
      }
      callHandler(onPointerMove, event);
    };

    const handlePointerLeave = (event: ReactPointerEvent<HTMLButtonElement>) => {
      const element = localRef.current;
      element?.style.setProperty("--holo-x", "50%");
      element?.style.setProperty("--holo-y", "50%");
      callHandler(onPointerLeave, event);
    };

    const mergedStyle = {
      ...style,
      "--holo-glow-size": `${glowSize}px`,
    } as CSSProperties;

    return (
      <button
        ref={setRefs}
        className={`lw-holo-button ${className}`.trim()}
        data-variant={variant}
        data-size={size}
        data-theme={theme}
        style={mergedStyle}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        {...props}
      >
        <span className="lw-holo-button-flare" aria-hidden="true" />
        <span className="lw-holo-button-content">{children}</span>
      </button>
    );
  },
);

HoloButton.displayName = "HoloButton";

export default HoloButton;
