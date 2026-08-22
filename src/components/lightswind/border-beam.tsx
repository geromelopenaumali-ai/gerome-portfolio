import type { CSSProperties } from "react";

type BorderBeamProps = {
  size?: number;
  duration?: number;
  borderWidth?: number;
  color?: string | [string, string];
  className?: string;
};

export function BorderBeam({
  size = 48,
  duration = 5.5,
  borderWidth = 1,
  color = ["#bcbcbc", "#ffffff"],
  className = "",
}: BorderBeamProps) {
  const colors = Array.isArray(color) ? color : [color, color];
  const style = {
    "--border-beam-size": `${size}px`,
    "--border-beam-duration": `${duration}s`,
    "--border-beam-width": `${borderWidth}px`,
    "--border-beam-color": colors[0],
    "--border-beam-color-bright": colors[1],
  } as CSSProperties;

  return <span aria-hidden="true" className={`lightswind-border-beam ${className}`.trim()} style={style} />;
}
