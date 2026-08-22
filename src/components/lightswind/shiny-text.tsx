import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

type ShinyTextProps = HTMLAttributes<HTMLSpanElement> & {
  children?: ReactNode;
  text?: string;
  speed?: number;
  disabled?: boolean;
};

export function ShinyText({
  children,
  text,
  speed = 3.2,
  disabled = false,
  className = "",
  style,
  ...props
}: ShinyTextProps) {
  const mergedStyle = {
    ...style,
    "--shiny-text-speed": `${speed}s`,
  } as CSSProperties;

  return (
    <span
      {...props}
      className={`lightswind-shiny-text${disabled ? " is-disabled" : ""}${className ? ` ${className}` : ""}`}
      style={mergedStyle}
    >
      {children ?? text}
    </span>
  );
}

export default ShinyText;

export type { ShinyTextProps };
