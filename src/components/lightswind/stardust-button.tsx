import * as React from "react";

export type StardustButtonVariant = "cosmic" | "aurora" | "nebula" | "glass";
export type StardustButtonSize = "sm" | "md" | "lg" | "xl";

export type StardustButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: StardustButtonVariant;
  size?: StardustButtonSize;
  /** @deprecated Kept for source compatibility; particles are intentionally disabled. */
  particleCount?: number;
  /** @deprecated Kept for source compatibility; particles are intentionally disabled. */
  particleSpeed?: number;
  theme?: "light" | "dark" | "system";
};

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

/**
 * Lightweight Stardust-style button.
 *
 * The portfolio uses the Aurora treatment as a CSS glow-only action control.
 * The previous canvas particle layer was deliberately removed so the RUN
 * control does not add a continuously painted surface or extra RAF work.
 */
const StardustButton = React.forwardRef<HTMLButtonElement, StardustButtonProps>(
  function StardustButton(
    {
      children,
      className,
      variant = "cosmic",
      size = "md",
      theme = "system",
      onPointerEnter,
      onPointerLeave,
      ...buttonProps
    },
    forwardedRef,
  ) {
    const [hovered, setHovered] = React.useState(false);

    return (
      <button
        {...buttonProps}
        ref={forwardedRef}
        data-stardust-variant={variant}
        data-stardust-theme={theme}
        data-stardust-hovered={hovered ? "true" : "false"}
        className={cx("lw-stardust-button", `lw-stardust-button--${size}`, className)}
        onPointerEnter={(event) => {
          setHovered(true);
          onPointerEnter?.(event);
        }}
        onPointerLeave={(event) => {
          setHovered(false);
          onPointerLeave?.(event);
        }}
      >
        <span className="lw-stardust-button__glow" aria-hidden="true" />
        <span className="lw-stardust-button__content">{children}</span>
      </button>
    );
  },
);

StardustButton.displayName = "StardustButton";

export default StardustButton;
export { StardustButton };
