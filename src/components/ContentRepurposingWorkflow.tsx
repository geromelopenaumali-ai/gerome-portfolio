import { useEffect, useRef } from "react";

/**
 * Content Repurposing workflow visualization.
 * SVG structure and animation timing preserved from source;
 * container chrome restyled to match the Zapier accent.
 */
export function ContentRepurposingWorkflow() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const NS = "http://www.w3.org/2000/svg";

    function buildGrid(
      id: string,
      cols: number,
      rows: number,
      cell: number,
      gap: number,
      density: number,
    ) {
      const g = svg!.querySelector(`#${id}`);
      if (!g) return;
      g.innerHTML = "";
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (Math.random() > density) continue;
          const rect = document.createElementNS(NS, "rect");
          rect.setAttribute("x", String(c * (cell + gap)));
          rect.setAttribute("y", String(r * (cell + gap)));
          rect.setAttribute("width", String(cell));
          rect.setAttribute("height", String(cell));
          rect.setAttribute("fill", "#d6d6d6");
          rect.setAttribute(
            "opacity",
            (Math.random() * 0.6 + 0.15).toFixed(2),
          );
          rect.classList.add("px");
          g.appendChild(rect);
        }
      }
    }
    buildGrid("gridC", 5, 4, 2.4, 1.4, 0.6);
    buildGrid("gridD", 5, 4, 2.4, 1.4, 0.45);

    const pixels = svg.querySelectorAll<SVGElement>(".px");
    const pxInterval = window.setInterval(() => {
      pixels.forEach((p) => {
        if (Math.random() < 0.3)
          p.style.opacity = (Math.random() * 0.65 + 0.12).toFixed(2);
      });
    }, 200);

    const q = (id: string) => svg.querySelector(`#${id}`) as SVGGElement | null;
    const els = {
      A: q("nA"),
      B: q("nB"),
      C: q("nC"),
      D: q("nD"),
      E: q("nE"),
      F: q("nF"),
      pillL: q("pillL"),
      pillR: q("pillR"),
      fbL: q("nFbL"),
      fbR: q("nFbR"),
      liL: q("nLiL"),
      liR: q("nLiR"),
    };

    const pJL = q("pJL") as unknown as SVGPathElement | null;
    const pJR = q("pJR") as unknown as SVGPathElement | null;
    const dot = q("dot");
    const dotL = q("dotL");
    const dotR = q("dotR");

    function pointAt(path: SVGPathElement, t: number) {
      const len = path.getTotalLength();
      return path.getPointAtLength(Math.max(0, Math.min(1, t)) * len);
    }
    function lerp(
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      t: number,
    ) {
      return { x: x1 + (x2 - x1) * t, y: y1 + (y2 - y1) * t };
    }

    const T = 6.0;
    let start: number | null = null;
    const state: Record<string, boolean> = {};
    function apply(key: string, el: SVGGElement | null, on: boolean) {
      if (!el) return;
      if (state[key] === on) return;
      state[key] = on;
      el.classList.toggle("active", on);
    }

    const seg = {
      ab: [0.0, 0.42],
      bGlow: [0.42, 0.64],
      bc: [0.64, 1.06],
      cGlow: [1.06, 1.28],
      cd: [1.28, 1.7],
      dGlow: [1.7, 1.92],
      de: [1.92, 2.34],
      eGlow: [2.34, 2.56],
      ef: [2.56, 2.98],
      fGlow: [2.98, 3.2],
      fj: [3.2, 3.4],
      jp: [3.4, 3.82],
      pGlow: [3.82, 4.0],
      pfb: [4.0, 4.42],
      fbGlow: [4.42, 4.64],
      fbli: [4.64, 5.06],
      liGlow: [5.06, 5.34],
    };

    let raf = 0;
    function frame(ts: number) {
      if (!start) start = ts;
      const t = ((ts - start) / 1000) % T;

      apply("A", els.A, t < 0.15);
      apply("B", els.B, t > seg.bGlow[0] && t < seg.bGlow[1]);
      apply("C", els.C, t > seg.cGlow[0] && t < seg.cGlow[1]);
      apply("D", els.D, t > seg.dGlow[0] && t < seg.dGlow[1]);
      apply("E", els.E, t > seg.eGlow[0] && t < seg.eGlow[1]);
      apply("F", els.F, t > seg.fGlow[0] && t < seg.fGlow[1]);
      apply("pillL", els.pillL, t > seg.pGlow[0] && t < seg.pGlow[1]);
      apply("pillR", els.pillR, t > seg.pGlow[0] && t < seg.pGlow[1]);
      apply("fbL", els.fbL, t > seg.fbGlow[0] && t < seg.fbGlow[1]);
      apply("fbR", els.fbR, t > seg.fbGlow[0] && t < seg.fbGlow[1]);
      apply("liL", els.liL, t > seg.liGlow[0] && t < seg.liGlow[1]);
      apply("liR", els.liR, t > seg.liGlow[0] && t < seg.liGlow[1]);

      let p: { x: number; y: number } | null = null;
      let show = false;
      let showL = false;
      let showR = false;
      if (t >= seg.ab[0] && t < seg.ab[1]) {
        p = lerp(310, 82, 310, 122, (t - seg.ab[0]) / 0.42);
        show = true;
      } else if (t >= seg.bc[0] && t < seg.bc[1]) {
        p = lerp(310, 168, 310, 208, (t - seg.bc[0]) / 0.42);
        show = true;
      } else if (t >= seg.cd[0] && t < seg.cd[1]) {
        p = lerp(310, 254, 310, 294, (t - seg.cd[0]) / 0.42);
        show = true;
      } else if (t >= seg.de[0] && t < seg.de[1]) {
        p = lerp(310, 340, 310, 380, (t - seg.de[0]) / 0.42);
        show = true;
      } else if (t >= seg.ef[0] && t < seg.ef[1]) {
        p = lerp(310, 426, 310, 466, (t - seg.ef[0]) / 0.42);
        show = true;
      } else if (t >= seg.fj[0] && t < seg.fj[1]) {
        p = lerp(310, 512, 310, 536, (t - seg.fj[0]) / 0.2);
        show = true;
      }

      if (show && p && dot) {
        dot.setAttribute("cx", String(p.x));
        dot.setAttribute("cy", String(p.y));
        dot.setAttribute("opacity", "1");
      } else if (dot) {
        dot.setAttribute("opacity", "0");
      }

      if (t >= seg.jp[0] && t < seg.jp[1] && pJL && pJR && dotL && dotR) {
        const tt = (t - seg.jp[0]) / 0.42;
        const pl = pointAt(pJL, tt);
        const pr = pointAt(pJR, tt);
        dotL.setAttribute("cx", String(pl.x));
        dotL.setAttribute("cy", String(pl.y));
        dotL.setAttribute("opacity", "1");
        dotR.setAttribute("cx", String(pr.x));
        dotR.setAttribute("cy", String(pr.y));
        dotR.setAttribute("opacity", "1");
        showL = showR = true;
      } else if (t >= seg.pfb[0] && t < seg.pfb[1] && dotL && dotR) {
        const tt = (t - seg.pfb[0]) / 0.42;
        const pl = lerp(170, 582, 170, 612, tt);
        const pr = lerp(450, 582, 450, 612, tt);
        dotL.setAttribute("cx", String(pl.x));
        dotL.setAttribute("cy", String(pl.y));
        dotL.setAttribute("opacity", "1");
        dotR.setAttribute("cx", String(pr.x));
        dotR.setAttribute("cy", String(pr.y));
        dotR.setAttribute("opacity", "1");
        showL = showR = true;
      } else if (t >= seg.fbli[0] && t < seg.fbli[1] && dotL && dotR) {
        const tt = (t - seg.fbli[0]) / 0.42;
        const pl = lerp(170, 656, 170, 690, tt);
        const pr = lerp(450, 656, 450, 690, tt);
        dotL.setAttribute("cx", String(pl.x));
        dotL.setAttribute("cy", String(pl.y));
        dotL.setAttribute("opacity", "1");
        dotR.setAttribute("cx", String(pr.x));
        dotR.setAttribute("cy", String(pr.y));
        dotR.setAttribute("opacity", "1");
        showL = showR = true;
      }
      if (!showL && dotL) dotL.setAttribute("opacity", "0");
      if (!showR && dotR) dotR.setAttribute("opacity", "0");

      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      window.clearInterval(pxInterval);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="workflow-viz w-full">
      <style>{`
        .workflow-viz svg { width: 100%; height: auto; display: block; font-family: ui-monospace, "SF Mono", "JetBrains Mono", "Courier New", monospace; }
        .workflow-viz .node-text { fill: #93a0b0; font-size: 11px; letter-spacing: 1.2px; transition: fill .35s ease; }
        .workflow-viz .node-text-active { fill: #eef1f5; font-size: 11px; letter-spacing: 1.2px; font-weight: 700; transition: fill .35s ease; }
        .workflow-viz .pill-text { fill: #7d8694; font-size: 10px; letter-spacing: 1.5px; transition: fill .35s ease; }
        .workflow-viz .card { fill: #12151f; stroke: rgba(255,255,255,0.07); stroke-width: 1; transition: stroke .35s ease, filter .35s ease; }
        .workflow-viz .proc-box { fill: #0e1119; stroke: rgba(255,255,255,0.18); stroke-width: 1; stroke-dasharray: 4 3; transition: stroke .35s ease, filter .35s ease; }
        .workflow-viz .pill { fill: #12151f; stroke: rgba(255,255,255,0.12); stroke-width: 1; transition: stroke .35s ease, filter .35s ease; }
        .workflow-viz .flow { stroke: rgba(255,255,255,0.24); stroke-width: 1; stroke-dasharray: 4 4; fill: none; animation: wfdash 1.1s linear infinite; }
        @keyframes wfdash { to { stroke-dashoffset: -16; } }
        .workflow-viz .px { transition: opacity .35s ease, fill .35s ease; }
        .workflow-viz .packet { fill: #d6d6d6; }
        .workflow-viz .junction { fill: rgba(255,255,255,0.3); }
        .workflow-viz .icon { color: #8792a1; transition: color .35s ease; }

        .workflow-viz #nA.active rect { stroke: #b9b9b9; filter: drop-shadow(0 0 7px rgba(255,255,255,0.35)); }
        .workflow-viz #nA.active .icon { color: #c0c0c0; }
        .workflow-viz #nA.active .node-text { fill: #f0f0f0; }

        .workflow-viz #nB.active rect, .workflow-viz #nF.active rect { stroke: #c0c0c0; filter: drop-shadow(0 0 6px rgba(255,255,255,0.3)); }
        .workflow-viz #nB.active .icon, .workflow-viz #nF.active .icon { color: #d6d6d6; }
        .workflow-viz #nB.active .node-text, .workflow-viz #nF.active .node-text { fill: #f0f0f0; }

        .workflow-viz #nC.active rect { stroke: #b9b9b9; filter: drop-shadow(0 0 9px rgba(255,255,255,0.4)); }
        .workflow-viz #nC.active .px { fill: #d6d6d6; }

        .workflow-viz #nD.active rect { stroke: #c0c0c0; filter: drop-shadow(0 0 9px rgba(255,255,255,0.4)); }
        .workflow-viz #nD.active .px { fill: #f0f0f0; }

        .workflow-viz #nE.active rect { stroke: #b9b9b9; filter: drop-shadow(0 0 8px rgba(255,255,255,0.35)); }
        .workflow-viz #nE.active .icon { color: #c0c0c0; }
        .workflow-viz #nE.active .node-text { fill: #f0f0f0; }

        .workflow-viz #pillL.active rect, .workflow-viz #pillR.active rect { stroke: rgba(255,255,255,0.45); filter: drop-shadow(0 0 5px rgba(255,255,255,0.3)); }
        .workflow-viz #pillL.active .pill-text, .workflow-viz #pillR.active .pill-text { fill: #f0f0f0; }

        .workflow-viz #nFbL.active rect, .workflow-viz #nFbR.active rect { stroke: #c0c0c0; filter: drop-shadow(0 0 8px rgba(255,255,255,0.35)); }
        .workflow-viz #nFbL.active .icon, .workflow-viz #nFbR.active .icon { color: #d6d6d6; }
        .workflow-viz #nFbL.active .node-text, .workflow-viz #nFbR.active .node-text { fill: #f0f0f0; }

        .workflow-viz #nLiL.active rect, .workflow-viz #nLiR.active rect { stroke: #b9b9b9; filter: drop-shadow(0 0 8px rgba(255,255,255,0.35)); }
        .workflow-viz #nLiL.active .icon, .workflow-viz #nLiR.active .icon { color: #c0c0c0; }
        .workflow-viz #nLiL.active .node-text, .workflow-viz #nLiR.active .node-text { fill: #f0f0f0; }
      `}</style>
      <svg
        ref={svgRef}
        viewBox="0 0 620 780"
        role="img"
        aria-label="Google Drive video is filtered, transcribed and turned into blog posts, then looped and split to post on Facebook and LinkedIn along two paths"
      >
        <rect
          x="15"
          y="14"
          width="590"
          height="750"
          rx="20"
          fill="#0a0c12"
          stroke="rgba(167,139,250,0.15)"
        />

        <path className="flow" d="M310,82 L310,122" />
        <path className="flow" d="M310,168 L310,208" />
        <path className="flow" d="M310,254 L310,294" />
        <path className="flow" d="M310,340 L310,380" />
        <path className="flow" d="M310,426 L310,466" />
        <path className="flow" d="M310,512 L310,536" />
        <path id="pJL" className="flow" d="M310,536 C310,548 250,548 170,556" fill="none" />
        <path id="pJR" className="flow" d="M310,536 C310,548 370,548 450,556" fill="none" />
        <path className="flow" d="M170,582 L170,612" />
        <path className="flow" d="M450,582 L450,612" />
        <path className="flow" d="M170,656 L170,690" />
        <path className="flow" d="M450,656 L450,690" />
        <circle className="junction" cx="310" cy="536" r="2.5" />

        <circle id="dot" className="packet" r="3.2" opacity="0" />
        <circle id="dotL" className="packet" r="3.2" opacity="0" />
        <circle id="dotR" className="packet" r="3.2" opacity="0" />

        <g id="nA" transform="translate(160,36)">
          <rect className="card" width="300" height="46" rx="10" />
          <g className="icon" transform="translate(18,15)">
            <path d="M0,3 L6,3 L8,5.5 L16,5.5 L16,13 L0,13 Z" fill="none" stroke="currentColor" strokeWidth="1.1" />
          </g>
          <text className="node-text" x="46" y="27">GOOGLE DRIVE</text>
        </g>

        <g id="nB" transform="translate(160,122)">
          <rect className="card" width="300" height="46" rx="10" />
          <g className="icon" transform="translate(18,15)">
            <path d="M0,0 L16,0 L10,7 L10,13 L6,13 L6,7 Z" fill="none" stroke="currentColor" strokeWidth="1.1" />
          </g>
          <text className="node-text" x="46" y="27">FILTER</text>
        </g>

        <g id="nC" transform="translate(160,208)">
          <rect className="proc-box" width="300" height="46" rx="10" />
          <g id="gridC" transform="translate(19,16)" />
          <text className="node-text-active" x="46" y="27">AI TRANSCRIPTION</text>
        </g>

        <g id="nD" transform="translate(160,294)">
          <rect className="proc-box" width="300" height="46" rx="10" />
          <g id="gridD" transform="translate(19,16)" />
          <text className="node-text-active" x="46" y="27">GENERATE BLOG POSTS</text>
        </g>

        <g id="nE" transform="translate(160,380)">
          <rect className="card" width="300" height="46" rx="10" />
          <g className="icon" transform="translate(18,15)">
            <g>
              <path d="M8,1.5 A6.5,6.5 0 1 1 1.7,5" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              <path d="M1.7,5 L1,1.3 L4.6,2.4 Z" fill="currentColor" stroke="none" />
            </g>
          </g>
          <text className="node-text" x="46" y="27">LOOPING BY ZAPIER</text>
        </g>

        <g id="nF" transform="translate(160,466)">
          <rect className="card" width="300" height="46" rx="10" />
          <g className="icon" transform="translate(18,15)">
            <path d="M8,1 L8,6 M8,6 L2,13 M8,6 L14,13" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
          </g>
          <text className="node-text" x="46" y="27">SPLIT PATHS</text>
        </g>

        <g id="pillL" transform="translate(125,556)">
          <rect className="pill" width="90" height="26" rx="13" />
          <text className="pill-text" x="45" y="17" textAnchor="middle">PATH A</text>
        </g>
        <g id="pillR" transform="translate(405,556)">
          <rect className="pill" width="90" height="26" rx="13" />
          <text className="pill-text" x="45" y="17" textAnchor="middle">PATH B</text>
        </g>

        <g id="nFbL" transform="translate(40,612)">
          <rect className="card" width="260" height="44" rx="10" />
          <g className="icon" transform="translate(16,14)">
            <path d="M1,2 H15 V10 H6 L2,13 V10 H1 Z" fill="none" stroke="currentColor" strokeWidth="1.1" />
          </g>
          <text className="node-text" x="42" y="26">FACEBOOK</text>
        </g>
        <g id="nFbR" transform="translate(320,612)">
          <rect className="card" width="260" height="44" rx="10" />
          <g className="icon" transform="translate(16,14)">
            <path d="M1,2 H15 V10 H6 L2,13 V10 H1 Z" fill="none" stroke="currentColor" strokeWidth="1.1" />
          </g>
          <text className="node-text" x="42" y="26">FACEBOOK</text>
        </g>

        <g id="nLiL" transform="translate(40,690)">
          <rect className="card" width="260" height="44" rx="10" />
          <g className="icon" transform="translate(16,14)">
            <circle cx="2" cy="2" r="1.5" fill="currentColor" />
            <circle cx="13" cy="2" r="1.5" fill="currentColor" />
            <circle cx="7.5" cy="12" r="1.5" fill="currentColor" />
            <path d="M3.2,3 L6.8,10.7 M11.8,3.2 L8.3,10.7" stroke="currentColor" strokeWidth="1" fill="none" />
          </g>
          <text className="node-text" x="42" y="26">LINKEDIN</text>
        </g>
        <g id="nLiR" transform="translate(320,690)">
          <rect className="card" width="260" height="44" rx="10" />
          <g className="icon" transform="translate(16,14)">
            <circle cx="2" cy="2" r="1.5" fill="currentColor" />
            <circle cx="13" cy="2" r="1.5" fill="currentColor" />
            <circle cx="7.5" cy="12" r="1.5" fill="currentColor" />
            <path d="M3.2,3 L6.8,10.7 M11.8,3.2 L8.3,10.7" stroke="currentColor" strokeWidth="1" fill="none" />
          </g>
          <text className="node-text" x="42" y="26">LINKEDIN</text>
        </g>
      </svg>
    </div>
  );
}
