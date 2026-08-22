/**
 * Real brand marks for the automation platforms shown in the portfolio.
 * Zapier / Make / n8n paths come from Simple Icons (single-path, brand color
 * applied via fill). GoHighLevel is drawn from its three-arrow mark.
 */

export type PlatformLogoKey = "zapier" | "make" | "n8n" | "ghl";

const ZAPIER_PATH =
  "M4.157 0A4.151 4.151 0 0 0 0 4.161v15.678A4.151 4.151 0 0 0 4.157 24h15.682A4.152 4.152 0 0 0 24 19.839V4.161A4.152 4.152 0 0 0 19.839 0H4.157Zm10.61 8.761h.03a.577.577 0 0 1 .23.038.585.585 0 0 1 .201.124.63.63 0 0 1 .162.431.612.612 0 0 1-.162.435.58.58 0 0 1-.201.128.58.58 0 0 1-.23.042.529.529 0 0 1-.235-.042.585.585 0 0 1-.332-.328.559.559 0 0 1-.038-.235.613.613 0 0 1 .17-.431.59.59 0 0 1 .405-.162Zm2.853 1.572c.03.004.061.004.095.004.325-.011.646.064.937.219.238.144.431.355.552.609.128.279.189.582.185.888v.193a2 2 0 0 1 0 .219h-2.498c.003.227.075.45.204.642a.78.78 0 0 0 .646.265.714.714 0 0 0 .484-.136.642.642 0 0 0 .23-.318l.915.257a1.398 1.398 0 0 1-.28.537c-.14.159-.321.284-.521.355a2.234 2.234 0 0 1-.836.136 1.923 1.923 0 0 1-1.001-.245 1.618 1.618 0 0 1-.665-.703 2.221 2.221 0 0 1-.227-1.036 1.95 1.95 0 0 1 .48-1.398 1.9 1.9 0 0 1 1.3-.488Zm-9.607.023c.162.004.325.026.48.079.207.065.4.174.563.314.26.302.393.692.366 1.088v2.276H8.53l-.109-.711h-.065c-.064.163-.155.31-.272.439a1.122 1.122 0 0 1-.374.264 1.023 1.023 0 0 1-.453.083 1.334 1.334 0 0 1-.866-.264.965.965 0 0 1-.329-.801.993.993 0 0 1 .076-.431 1.02 1.02 0 0 1 .242-.363 1.478 1.478 0 0 1 1.043-.303h.952v-.181a.696.696 0 0 0-.136-.454.553.553 0 0 0-.438-.154.695.695 0 0 0-.378.086.48.48 0 0 0-.193.254l-.99-.144a1.26 1.26 0 0 1 .257-.563c.14-.174.321-.302.533-.378.261-.091.54-.136.82-.129.053-.003.106-.007.163-.007Zm4.384.007c.174 0 .347.038.506.114.182.083.34.211.458.374.257.423.377.911.351 1.406a2.53 2.53 0 0 1-.355 1.448 1.148 1.148 0 0 1-1.009.517c-.204 0-.401-.045-.582-.136a1.052 1.052 0 0 1-.48-.457 1.298 1.298 0 0 1-.114-.234h-.045l.004 1.784h-1.059v-4.713h.904l.117.805h.057c.068-.208.177-.401.328-.56a1.129 1.129 0 0 1 .843-.344h.076v-.004Zm7.559.084h.903l.113.805h.053a1.37 1.37 0 0 1 .235-.484.813.813 0 0 1 .313-.242.82.82 0 0 1 .39-.076h.234v1.051h-.401a.662.662 0 0 0-.313.008.623.623 0 0 0-.272.155.663.663 0 0 0-.174.26.683.683 0 0 0-.027.314v1.875h-1.054v-3.666Zm-17.515.003h3.262v.896L3.73 13.104l.034.113h1.973l.042.9H2.4v-.9l1.931-1.754-.045-.117H2.441v-.896Zm11.815 0h1.055v3.659h-1.055V10.45Zm3.443.684.019.016a.69.69 0 0 0-.351.045.756.756 0 0 0-.287.204c-.11.155-.174.336-.189.522h1.545c-.034-.526-.257-.787-.74-.787h.003Zm-5.718.163c-.026 0-.057 0-.083.004a.78.78 0 0 0-.31.053.746.746 0 0 0-.257.189 1.016 1.016 0 0 0-.204.695v.064c-.015.257.057.507.204.711a.634.634 0 0 0 .253.196.638.638 0 0 0 .314.061.644.644 0 0 0 .578-.265c.14-.223.204-.48.189-.74a1.216 1.216 0 0 0-.181-.711.677.677 0 0 0-.503-.257Zm-4.509 1.266a.464.464 0 0 0-.268.102.373.373 0 0 0-.114.276c0 .053.008.106.027.155a.375.375 0 0 0 .087.132.576.576 0 0 0 .397.11v.004a.863.863 0 0 0 .563-.182.573.573 0 0 0 .211-.457v-.14h-.903Z";

const MAKE_PATH =
  "M13.38 3.498c-.27 0-.511.19-.566.465L9.85 18.986a.578.578 0 0 0 .453.678l4.095.826a.58.58 0 0 0 .682-.455l2.963-15.021a.578.578 0 0 0-.453-.678l-4.096-.826a.589.589 0 0 0-.113-.012zm-5.876.098a.576.576 0 0 0-.516.318L.062 17.697a.575.575 0 0 0 .256.774l3.733 1.877a.578.578 0 0 0 .775-.258l6.926-13.781a.577.577 0 0 0-.256-.776L7.762 3.658a.571.571 0 0 0-.258-.062zm11.74.115a.576.576 0 0 0-.576.576v15.426c0 .318.258.578.576.578h4.178a.58.58 0 0 0 .578-.578V4.287a.578.578 0 0 0-.578-.576Z";

const N8N_PATH =
  "M21.4737 5.6842c-1.1772 0-2.1663.8051-2.4468 1.8947h-2.8955c-1.235 0-2.289.893-2.492 2.111l-.1038.623a1.263 1.263 0 0 1-1.246 1.0555H11.289c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947s-2.1663.8051-2.4467 1.8947H4.973c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947C1.1311 9.4737 0 10.6047 0 12s1.131 2.5263 2.5263 2.5263c1.1772 0 2.1663-.8051 2.4468-1.8947h1.4223c.2804 1.0896 1.2696 1.8947 2.4467 1.8947 1.1772 0 2.1663-.8051 2.4468-1.8947h1.0008a1.263 1.263 0 0 1 1.2459 1.0555l.1038.623c.203 1.218 1.257 2.111 2.492 2.111h.3692c.2804 1.0895 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.131 2.5263-2.5263s-1.131-2.5263-2.5263-2.5263c-1.1772 0-2.1664.805-2.4468 1.8947h-.3692a1.263 1.263 0 0 1-1.246-1.0555l-.1037-.623A2.52 2.52 0 0 0 13.9607 12a2.52 2.52 0 0 0 .821-1.4794l.1038-.623a1.263 1.263 0 0 1 1.2459-1.0555h2.8955c.2805 1.0896 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.131 2.5263-2.5263s-1.131-2.5263-2.5263-2.5263m0 1.2632a1.263 1.263 0 0 1 1.2631 1.2631 1.263 1.263 0 0 1-1.2631 1.2632 1.263 1.263 0 0 1-1.2632-1.2632 1.263 1.263 0 0 1 1.2632-1.2631M2.5263 10.7368A1.263 1.263 0 0 1 3.7895 12a1.263 1.263 0 0 1-1.2632 1.2632A1.263 1.263 0 0 1 1.2632 12a1.263 1.263 0 0 1 1.2631-1.2632m6.3158 0A1.263 1.263 0 0 1 10.1053 12a1.263 1.263 0 0 1-1.2632 1.2632A1.263 1.263 0 0 1 7.579 12a1.263 1.263 0 0 1 1.2632-1.2632m10.1053 3.7895a1.263 1.263 0 0 1 1.2631 1.2632 1.263 1.263 0 0 1-1.2631 1.2631 1.263 1.263 0 0 1-1.2632-1.2631 1.263 1.263 0 0 1 1.2632-1.2632";

/** Upward arrow used by the GoHighLevel mark. */
function GhlArrow({ x, top, color }: { x: number; top: number; color: string }) {
  const w = 4.4;
  const stem = 1.9;
  const bottom = 20;
  const head = top + 4.2;
  return (
    <path
      fill={color}
      d={`M${x} ${top} L${x + w} ${head} L${x + stem / 2} ${head} L${x + stem / 2} ${bottom} L${x - stem / 2} ${bottom} L${x - stem / 2} ${head} L${x - w} ${head} Z`}
    />
  );
}

/** Per-brand optical scale so every mark reads at the same visual weight. */
const OPTICAL_SCALE: Record<PlatformLogoKey, number> = {
  zapier: 1,
  make: 0.92,
  n8n: 1.06,
  ghl: 1,
};

export function PlatformLogo({
  platform,
  className = "h-6 w-6",
  title,
}: {
  platform: PlatformLogoKey;
  className?: string;
  title?: string;
}) {
  const label =
    title ??
    (platform === "ghl"
      ? "GoHighLevel"
      : platform === "n8n"
        ? "n8n"
        : platform === "make"
          ? "Make"
          : "Zapier");

  const scale = OPTICAL_SCALE[platform];
  const offset = (24 - 24 * scale) / 2;

  if (platform === "zapier") {
    return (
      <svg
        viewBox="0 0 24 24"
        role="img"
        aria-label={label}
        className={`block shrink-0 ${className}`}
      >
        <g fill="#ff4f00" transform="translate(12 12)">
          <rect x="-2.2" y="-10" width="4.4" height="8" rx="1" />
          <rect x="-2.2" y="-10" width="4.4" height="8" rx="1" transform="rotate(45)" />
          <rect x="-2.2" y="-10" width="4.4" height="8" rx="1" transform="rotate(90)" />
          <rect x="-2.2" y="-10" width="4.4" height="8" rx="1" transform="rotate(135)" />
          <rect x="-2.2" y="-10" width="4.4" height="8" rx="1" transform="rotate(180)" />
          <rect x="-2.2" y="-10" width="4.4" height="8" rx="1" transform="rotate(225)" />
          <rect x="-2.2" y="-10" width="4.4" height="8" rx="1" transform="rotate(270)" />
          <rect x="-2.2" y="-10" width="4.4" height="8" rx="1" transform="rotate(315)" />
        </g>
      </svg>
    );
  }

  if (platform === "ghl") {
    return (
      <svg
        viewBox="0 0 24 24"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={label}
        className={`block shrink-0 ${className}`}
      >
        <GhlArrow x={6.4} top={4.6} color="#F2C230" />
        <GhlArrow x={12} top={9.2} color="#3FA9F5" />
        <GhlArrow x={17.6} top={4.6} color="#5CBB4B" />
      </svg>
    );
  }

  const config = {
    zapier: { path: ZAPIER_PATH, fill: "#8b6cf5" },
    make: { path: MAKE_PATH, fill: "#6D00CC" },
    n8n: { path: N8N_PATH, fill: "#EA4B71" },
  }[platform];

  return (
    <svg
      viewBox="0 0 24 24"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={label}
      className={`block shrink-0 ${className}`}
    >
      <g transform={`translate(${offset} ${offset}) scale(${scale})`}>
        <path d={config.path} fill={config.fill} />
      </g>
    </svg>
  );
}

/**
 * Inline SVG brand mark for compositions that already provide an outer SVG.
 * This avoids nested SVG sizing behavior while reusing the exact Project-section paths.
 */
export function PlatformLogoInline({
  platform,
  className,
}: {
  platform: PlatformLogoKey;
  className?: string;
}) {
  const config = {
    make: { path: MAKE_PATH, fill: "#6D00CC" },
    n8n: { path: N8N_PATH, fill: "#EA4B71" },
  } as const;

  if (platform === "zapier") {
    return (
      <g className={className} transform="translate(-12 -12)">
        <g fill="#ff4f00" transform="translate(12 12)">
          <rect x="-2.2" y="-10" width="4.4" height="8" rx="1" />
          <rect x="-2.2" y="-10" width="4.4" height="8" rx="1" transform="rotate(45)" />
          <rect x="-2.2" y="-10" width="4.4" height="8" rx="1" transform="rotate(90)" />
          <rect x="-2.2" y="-10" width="4.4" height="8" rx="1" transform="rotate(135)" />
          <rect x="-2.2" y="-10" width="4.4" height="8" rx="1" transform="rotate(180)" />
          <rect x="-2.2" y="-10" width="4.4" height="8" rx="1" transform="rotate(225)" />
          <rect x="-2.2" y="-10" width="4.4" height="8" rx="1" transform="rotate(270)" />
          <rect x="-2.2" y="-10" width="4.4" height="8" rx="1" transform="rotate(315)" />
        </g>
      </g>
    );
  }

  if (platform === "ghl") {
    return (
      <g className={className} transform="translate(-12 -12)">
        <GhlArrow x={6.4} top={4.6} color="#F2C230" />
        <GhlArrow x={12} top={9.2} color="#3FA9F5" />
        <GhlArrow x={17.6} top={4.6} color="#5CBB4B" />
      </g>
    );
  }

  return (
    <g className={className} transform="translate(-12 -12)">
      <path d={config[platform].path} fill={config[platform].fill} transform="translate(0.96 0.96) scale(0.92)" />
    </g>
  );
}

/**
 * Uniform badge wrapper: same square footprint, radius, and interaction
 * feedback for every platform mark, on cards and in dialogs.
 */
export function PlatformBadge({
  platform,
  title,
  size = "md",
  accentVar = "var(--tool-accent)",
  className = "",
}: {
  platform: PlatformLogoKey;
  title?: string;
  size?: "sm" | "md";
  accentVar?: string;
  className?: string;
}) {
  const box = size === "sm" ? "h-10 w-10 rounded-xl" : "h-12 w-12 rounded-2xl md:h-14 md:w-14";
  const glyph = size === "sm" ? "h-5 w-5" : "h-6 w-6 md:h-7 md:w-7";

  return (
    <span
      className={`inline-flex ${box} shrink-0 items-center justify-center border p-0 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.04] hover:shadow-[var(--shadow-lift)] active:translate-y-0 active:scale-95 group-hover/tool:-translate-y-0.5 group-hover/tool:scale-[1.04] motion-reduce:transform-none ${className}`}
      style={{
        borderColor: `color-mix(in oklab, ${accentVar} 45%, transparent)`,
        backgroundColor: `color-mix(in oklab, ${accentVar} 10%, transparent)`,
      }}
    >
      <PlatformLogo platform={platform} title={title} className={glyph} />
    </span>
  );
}
