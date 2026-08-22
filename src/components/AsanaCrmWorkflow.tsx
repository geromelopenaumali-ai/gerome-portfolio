import { useEffect, useRef } from "react";

/**
 * Asana CRM Automation workflow visualization.
 * 1:1 port of the source HTML, animation logic ported into a scoped effect.
 */
export function AsanaCrmWorkflow() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const q = <T extends Element = SVGElement>(id: string) =>
      svg.querySelector<T>(`#${id}`);

    const dot = q<SVGCircleElement>("dot");
    const dots = [
      q<SVGCircleElement>("dot1"),
      q<SVGCircleElement>("dot2"),
      q<SVGCircleElement>("dot3"),
      q<SVGCircleElement>("dot4"),
      q<SVGCircleElement>("dot5"),
    ];

    const paths = {
      main1: q<SVGPathElement>("pMain1"),
      main2: q<SVGPathElement>("pMain2"),
      b: [
        q<SVGPathElement>("pB1"),
        q<SVGPathElement>("pB2"),
        q<SVGPathElement>("pB3"),
        q<SVGPathElement>("pB4"),
        q<SVGPathElement>("pB5"),
      ],
      v1: [q<SVGPathElement>("p1_1"), q<SVGPathElement>("p1_2"), q<SVGPathElement>("p1_3")],
      v2: [
        q<SVGPathElement>("p2_1"),
        q<SVGPathElement>("p2_2"),
        q<SVGPathElement>("p2_3"),
        q<SVGPathElement>("p2_4"),
        q<SVGPathElement>("p2_5"),
        q<SVGPathElement>("p2_6"),
      ],
      v3: [
        q<SVGPathElement>("p3_1"),
        q<SVGPathElement>("p3_2"),
        q<SVGPathElement>("p3_3"),
        q<SVGPathElement>("p3_4"),
        q<SVGPathElement>("p3_5"),
        q<SVGPathElement>("p3_6"),
      ],
      v4: [q<SVGPathElement>("p4_1"), q<SVGPathElement>("p4_2"), q<SVGPathElement>("p4_3")],
      v5: [q<SVGPathElement>("p5_1"), q<SVGPathElement>("p5_2"), q<SVGPathElement>("p5_3")],
    };

    const nodes = {
      A: q<SVGGElement>("node-A"),
      B: q<SVGGElement>("node-B"),
      n1: [q<SVGGElement>("node-1-1"), q<SVGGElement>("node-1-2"), q<SVGGElement>("node-1-3")],
      n2: [
        q<SVGGElement>("node-2-1"),
        q<SVGGElement>("node-2-2"),
        q<SVGGElement>("node-2-3"),
        q<SVGGElement>("node-2-4"),
        q<SVGGElement>("node-2-5"),
        q<SVGGElement>("node-2-6"),
      ],
      n3: [
        q<SVGGElement>("node-3-1"),
        q<SVGGElement>("node-3-2"),
        q<SVGGElement>("node-3-3"),
        q<SVGGElement>("node-3-4"),
        q<SVGGElement>("node-3-5"),
        q<SVGGElement>("node-3-6"),
      ],
      n4: [q<SVGGElement>("node-4-1"), q<SVGGElement>("node-4-2"), q<SVGGElement>("node-4-3")],
      n5: [q<SVGGElement>("node-5-1"), q<SVGGElement>("node-5-2"), q<SVGGElement>("node-5-3")],
    };

    function getPoint(path: SVGPathElement | null, t: number) {
      if (!path) return { x: 0, y: 0 };
      const len = path.getTotalLength();
      return path.getPointAtLength(Math.max(0, Math.min(1, t)) * len);
    }

    function setDot(d: SVGCircleElement | null, x: number, y: number, opacity: number) {
      if (!d) return;
      d.setAttribute("cx", String(x));
      d.setAttribute("cy", String(y));
      d.setAttribute("opacity", String(opacity));
    }

    let start: number | null = null;
    const T = 10.0;
    let raf = 0;

    function frame(ts: number) {
      if (!start) start = ts;
      const t = ((ts - start) / 1000) % T;

      svg!.querySelectorAll(".active").forEach((el) => el.classList.remove("active"));
      if (dot) dot.setAttribute("opacity", "0");
      dots.forEach((d) => d && d.setAttribute("opacity", "0"));

      if (t < 0.6) nodes.A?.classList.add("active");
      if (t >= 0.6 && t < 1.3) {
        const p = getPoint(paths.main1, (t - 0.6) / 0.7);
        setDot(dot, p.x, p.y, 1);
      }
      if (t >= 1.3 && t < 2.0) nodes.B?.classList.add("active");
      if (t >= 2.0 && t < 2.7) {
        const p = getPoint(paths.main2, (t - 2.0) / 0.7);
        setDot(dot, p.x, p.y, 1);
      }
      if (t >= 2.7 && t < 3.7) {
        const tt = (t - 2.7) / 1.0;
        dots.forEach((d, i) => {
          const p = getPoint(paths.b[i] ?? null, tt);
          setDot(d, p.x, p.y, 1);
        });
      }

      const branchStart = 3.7;
      const stepTime = 1.0;
      const nGroups = [nodes.n1, nodes.n2, nodes.n3, nodes.n4, nodes.n5];
      const pGroups = [paths.v1, paths.v2, paths.v3, paths.v4, paths.v5];
      for (let i = 0; i < 6; i++) {
        const s = branchStart + i * stepTime;
        const e = s + stepTime;
        if (t >= s && t < e) {
          const tt = (t - s) / stepTime;
          const moveT = tt * 2;
          if (tt > 0.5) {
            nGroups.forEach((group) => {
              if (group[i]) group[i]!.classList.add("active");
            });
          }
          if (moveT < 1.0) {
            pGroups.forEach((group, idx) => {
              if (group[i]) {
                const p = getPoint(group[i] ?? null, moveT);
                setDot(dots[idx], p.x, p.y, 1);
              }
            });
          }
        }
      }
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="workflow-viz-asana w-full">
      <style>{`
        .workflow-viz-asana svg { width: 100%; height: auto; display: block; font-family: ui-monospace, "SF Mono", "JetBrains Mono", "Courier New", monospace; }
        .workflow-viz-asana .node-text { fill: #93a0b0; font-size: 8px; letter-spacing: 1px; transition: fill 0.35s ease; }
        .workflow-viz-asana .pill-text { fill: #7d8694; font-size: 7px; letter-spacing: 1.2px; transition: fill 0.35s ease; }
        .workflow-viz-asana .card { fill: #12151f; stroke: rgba(255,255,255,0.07); stroke-width: 1; transition: stroke 0.35s ease, filter 0.35s ease; }
        .workflow-viz-asana .pill { fill: #12151f; stroke: rgba(255,255,255,0.12); stroke-width: 1; }
        .workflow-viz-asana .flow { stroke: rgba(255,255,255,0.18); stroke-width: 1; stroke-dasharray: 4 4; fill: none; animation: asanaDash 0.7s linear infinite; }
        @keyframes asanaDash { to { stroke-dashoffset: -16; } }
        .workflow-viz-asana .packet { fill: #d0d0d0; filter: drop-shadow(0 0 3px #d0d0d0); }
        .workflow-viz-asana .junction { fill: rgba(255,255,255,0.25); }
        .workflow-viz-asana .icon { color: #8792a1; transition: color 0.35s ease; }

        .workflow-viz-asana .active.asana rect { stroke: #a5a5a5; filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.35)); }
        .workflow-viz-asana .active.asana .icon { color: #a5a5a5; }
        .workflow-viz-asana .active.paths rect { stroke: #8593a8; filter: drop-shadow(0 0 8px rgba(133, 147, 168, 0.6)); }
        .workflow-viz-asana .active.paths .icon { color: #8593a8; }
        .workflow-viz-asana .active.gmail rect { stroke: #b0b0b0; filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.35)); }
        .workflow-viz-asana .active.gmail .icon { color: #b0b0b0; }
        .workflow-viz-asana .active.drive rect { stroke: #8f8f8f; filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.3)); }
        .workflow-viz-asana .active.drive .icon { color: #8f8f8f; }
        .workflow-viz-asana .active.zapier rect { stroke: #b5b5b5; filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.35)); }
        .workflow-viz-asana .active.zapier .icon { color: #b5b5b5; }
        .workflow-viz-asana .active.ai rect { stroke: #c0c0c0; filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.4)); }
        .workflow-viz-asana .active.ai .icon { color: #c0c0c0; }
        .workflow-viz-asana .active .node-text { fill: #eef1f5; }
      `}</style>
      <svg ref={svgRef} viewBox="0 0 1200 780" role="img" aria-label="Asana CRM automation">
        <rect x="15" y="14" width="1170" height="742" rx="20" fill="#0a0c12" stroke="rgba(255,255,255,0.06)" />

        <g id="paths-group">
          <path id="pMain1" className="flow" d="M600,82 L600,120" />
          <path id="pMain2" className="flow" d="M600,166 L600,190" />
          <path id="pB1" className="flow" d="M600,190 L136,190 L136,210" />
          <path id="pB2" className="flow" d="M600,190 L368,190 L368,210" />
          <path id="pB3" className="flow" d="M600,190 L600,210" />
          <path id="pB4" className="flow" d="M600,190 L832,190 L832,210" />
          <path id="pB5" className="flow" d="M600,190 L1064,190 L1064,210" />
          <path id="p1_1" className="flow" d="M136,236 L136,270" />
          <path id="p1_2" className="flow" d="M136,316 L136,350" />
          <path id="p1_3" className="flow" d="M136,396 L136,430" />
          <path id="p2_1" className="flow" d="M368,236 L368,270" />
          <path id="p2_2" className="flow" d="M368,316 L368,350" />
          <path id="p2_3" className="flow" d="M368,396 L368,430" />
          <path id="p2_4" className="flow" d="M368,476 L368,510" />
          <path id="p2_5" className="flow" d="M368,556 L368,590" />
          <path id="p2_6" className="flow" d="M368,636 L368,670" />
          <path id="p3_1" className="flow" d="M600,236 L600,270" />
          <path id="p3_2" className="flow" d="M600,316 L600,350" />
          <path id="p3_3" className="flow" d="M600,396 L600,430" />
          <path id="p3_4" className="flow" d="M600,476 L600,510" />
          <path id="p3_5" className="flow" d="M600,556 L600,590" />
          <path id="p3_6" className="flow" d="M600,636 L600,670" />
          <path id="p4_1" className="flow" d="M832,236 L832,270" />
          <path id="p4_2" className="flow" d="M832,316 L832,350" />
          <path id="p4_3" className="flow" d="M832,396 L832,430" />
          <path id="p5_1" className="flow" d="M1064,236 L1064,270" />
          <path id="p5_2" className="flow" d="M1064,316 L1064,350" />
          <path id="p5_3" className="flow" d="M1064,396 L1064,430" />
          <path className="flow" d="M136,476 L136,510" />
          <path className="flow" d="M832,476 L832,510" />
          <path className="flow" d="M1064,476 L1064,510" />
        </g>
        <circle className="junction" cx="600" cy="190" r="2.5" />

        <circle id="dot" className="packet" r="3" opacity="0" />
        <circle id="dot1" className="packet" r="3" opacity="0" />
        <circle id="dot2" className="packet" r="3" opacity="0" />
        <circle id="dot3" className="packet" r="3" opacity="0" />
        <circle id="dot4" className="packet" r="3" opacity="0" />
        <circle id="dot5" className="packet" r="3" opacity="0" />

        <defs>
          <g id="icon-asana">
            <circle cx="8" cy="4" r="2.5" fill="currentColor" />
            <circle cx="4" cy="11" r="2.5" fill="currentColor" />
            <circle cx="12" cy="11" r="2.5" fill="currentColor" />
          </g>
          <g id="icon-paths">
            <path d="M2,14 L2,8 C2,4 4,2 8,2 L14,2 M8,2 L6,0 M8,2 L6,4" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M2,8 C2,12 4,14 8,14 L14,14 M8,14 L6,12 M8,14 L6,16" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </g>
          <g id="icon-gmail">
            <path d="M2,4 L8,9 L14,4 M2,4 H14 V12 H2 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </g>
          <g id="icon-drive">
            <path d="M8,2 L14,12 H2 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </g>
          <g id="icon-zapier">
            <path d="M8,2 V14 M2,8 H14 M4,4 L12,12 M12,4 L4,12" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </g>
          <g id="icon-ai">
            <path d="M8,2 L9,5 L12,6 L9,7 L8,10 L7,7 L4,6 L7,5 Z" fill="currentColor" />
            <circle cx="13" cy="3" r="1" fill="currentColor" />
            <circle cx="3" cy="13" r="1" fill="currentColor" />
          </g>
        </defs>

        <g id="node-A" className="asana" transform="translate(500,36)">
          <rect className="card" width="200" height="46" rx="10" />
          <g className="icon" transform="translate(12,15)"><use href="#icon-asana" /></g>
          <text className="node-text" x="40" y="27">ASANA</text>
        </g>
        <g id="node-B" className="paths" transform="translate(500,120)">
          <rect className="card" width="200" height="46" rx="10" />
          <g className="icon" transform="translate(12,15)"><use href="#icon-paths" /></g>
          <text className="node-text" x="40" y="27">SPLIT INTO PATHS</text>
        </g>

        <g transform="translate(36,210)">
          <rect className="pill" width="200" height="26" rx="13" />
          <text className="pill-text" x="100" y="17" textAnchor="middle">READY TO START</text>
        </g>
        <g id="node-1-1" className="paths" transform="translate(36,270)">
          <rect className="card" width="200" height="46" rx="10" />
          <g className="icon" transform="translate(12,15)"><use href="#icon-paths" /></g>
          <text className="node-text" x="40" y="27">PATH CONDITIONS</text>
        </g>
        <g id="node-1-2" className="drive" transform="translate(36,350)">
          <rect className="card" width="200" height="46" rx="10" />
          <g className="icon" transform="translate(12,15)"><use href="#icon-drive" /></g>
          <text className="node-text" x="40" y="27">CREATE LEAD FOLDER</text>
        </g>
        <g id="node-1-3" className="asana" transform="translate(36,430)">
          <rect className="card" width="200" height="46" rx="10" />
          <g className="icon" transform="translate(12,15)"><use href="#icon-asana" /></g>
          <text className="node-text" x="40" y="27">CREATE CONTENT FOLDER</text>
        </g>
        <g transform="translate(36,510)">
          <rect className="pill" width="200" height="26" rx="13" />
          <text className="pill-text" x="100" y="17" textAnchor="middle">PATH ENDS</text>
        </g>


        <g transform="translate(268,210)">
          <rect className="pill" width="200" height="26" rx="13" />
          <text className="pill-text" x="100" y="17" textAnchor="middle">NO RESPONSE</text>
        </g>
        <g id="node-2-1" className="paths" transform="translate(268,270)">
          <rect className="card" width="200" height="46" rx="10" />
          <g className="icon" transform="translate(12,15)"><use href="#icon-paths" /></g>
          <text className="node-text" x="40" y="27">PATH CONDITIONS</text>
        </g>
        <g id="node-2-2" className="gmail" transform="translate(268,350)">
          <rect className="card" width="200" height="46" rx="10" />
          <g className="icon" transform="translate(12,15)"><use href="#icon-gmail" /></g>
          <text className="node-text" x="40" y="27">SEND FOLLOW-UP EMAIL</text>
        </g>
        <g id="node-2-3" className="zapier" transform="translate(268,430)">
          <rect className="card" width="200" height="46" rx="10" />
          <g className="icon" transform="translate(12,15)"><use href="#icon-zapier" /></g>
          <text className="node-text" x="40" y="27">DELAY FOR</text>
        </g>
        <g id="node-2-4" className="gmail" transform="translate(268,510)">
          <rect className="card" width="200" height="46" rx="10" />
          <g className="icon" transform="translate(12,15)"><use href="#icon-gmail" /></g>
          <text className="node-text" x="40" y="27">FIND EMAIL</text>
        </g>
        <g id="node-2-5" className="zapier" transform="translate(268,590)">
          <rect className="card" width="200" height="46" rx="10" />
          <g className="icon" transform="translate(12,15)"><use href="#icon-zapier" /></g>
          <text className="node-text" x="40" y="27">FILTER CONDITIONS</text>
        </g>
        <g id="node-2-6" className="gmail" transform="translate(268,670)">
          <rect className="card" width="200" height="46" rx="10" />
          <g className="icon" transform="translate(12,15)"><use href="#icon-gmail" /></g>
          <text className="node-text" x="40" y="27">SEND FOLLOW-UP EMAIL 2</text>
        </g>

        <g transform="translate(500,210)">
          <rect className="pill" width="200" height="26" rx="13" />
          <text className="pill-text" x="100" y="17" textAnchor="middle">QUOTED</text>
        </g>
        <g id="node-3-1" className="paths" transform="translate(500,270)">
          <rect className="card" width="200" height="46" rx="10" />
          <g className="icon" transform="translate(12,15)"><use href="#icon-paths" /></g>
          <text className="node-text" x="40" y="27">PATH CONDITIONS</text>
        </g>
        <g id="node-3-2" className="gmail" transform="translate(500,350)">
          <rect className="card" width="200" height="46" rx="10" />
          <g className="icon" transform="translate(12,15)"><use href="#icon-gmail" /></g>
          <text className="node-text" x="40" y="27">SEND FOLLOW-UP QUOTE</text>
        </g>
        <g id="node-3-3" className="zapier" transform="translate(500,430)">
          <rect className="card" width="200" height="46" rx="10" />
          <g className="icon" transform="translate(12,15)"><use href="#icon-zapier" /></g>
          <text className="node-text" x="40" y="27">DELAY FOR</text>
        </g>
        <g id="node-3-4" className="gmail" transform="translate(500,510)">
          <rect className="card" width="200" height="46" rx="10" />
          <g className="icon" transform="translate(12,15)"><use href="#icon-gmail" /></g>
          <text className="node-text" x="40" y="27">FIND EMAIL</text>
        </g>
        <g id="node-3-5" className="zapier" transform="translate(500,590)">
          <rect className="card" width="200" height="46" rx="10" />
          <g className="icon" transform="translate(12,15)"><use href="#icon-zapier" /></g>
          <text className="node-text" x="40" y="27">FILTER CONDITIONS</text>
        </g>
        <g id="node-3-6" className="gmail" transform="translate(500,670)">
          <rect className="card" width="200" height="46" rx="10" />
          <g className="icon" transform="translate(12,15)"><use href="#icon-gmail" /></g>
          <text className="node-text" x="40" y="27">SEND FOLLOW-UP QUOTE 2</text>
        </g>

        <g transform="translate(732,210)">
          <rect className="pill" width="200" height="26" rx="13" />
          <text className="pill-text" x="100" y="17" textAnchor="middle">APPROVED</text>
        </g>
        <g id="node-4-1" className="paths" transform="translate(732,270)">
          <rect className="card" width="200" height="46" rx="10" />
          <g className="icon" transform="translate(12,15)"><use href="#icon-paths" /></g>
          <text className="node-text" x="40" y="27">PATH CONDITIONS</text>
        </g>
        <g id="node-4-2" className="ai" transform="translate(732,350)">
          <rect className="card" width="200" height="46" rx="10" />
          <g className="icon" transform="translate(12,15)"><use href="#icon-ai" /></g>
          <text className="node-text" x="40" y="27">AI PERSONALIZED EMAIL</text>
        </g>
        <g id="node-4-3" className="gmail" transform="translate(732,430)">
          <rect className="card" width="200" height="46" rx="10" />
          <g className="icon" transform="translate(12,15)"><use href="#icon-gmail" /></g>
          <text className="node-text" x="40" y="27">SEND WELCOME EMAIL</text>
        </g>
        <g transform="translate(732,510)">
          <rect className="pill" width="200" height="26" rx="13" />
          <text className="pill-text" x="100" y="17" textAnchor="middle">PATH ENDS</text>
        </g>


        <g transform="translate(964,210)">
          <rect className="pill" width="200" height="26" rx="13" />
          <text className="pill-text" x="100" y="17" textAnchor="middle">PAID AND CLOSED</text>
        </g>
        <g id="node-5-1" className="paths" transform="translate(964,270)">
          <rect className="card" width="200" height="46" rx="10" />
          <g className="icon" transform="translate(12,15)"><use href="#icon-paths" /></g>
          <text className="node-text" x="40" y="27">PATH CONDITIONS</text>
        </g>
        <g id="node-5-2" className="ai" transform="translate(964,350)">
          <rect className="card" width="200" height="46" rx="10" />
          <g className="icon" transform="translate(12,15)"><use href="#icon-ai" /></g>
          <text className="node-text" x="40" y="27">AI PERSONALIZED EMAIL</text>
        </g>
        <g id="node-5-3" className="gmail" transform="translate(964,430)">
          <rect className="card" width="200" height="46" rx="10" />
          <g className="icon" transform="translate(12,15)"><use href="#icon-gmail" /></g>
          <text className="node-text" x="40" y="27">SEND RECOMMENDATION</text>
        </g>
        <g transform="translate(964,510)">
          <rect className="pill" width="200" height="26" rx="13" />
          <text className="pill-text" x="100" y="17" textAnchor="middle">PATH ENDS</text>
        </g>

      </svg>
    </div>
  );
}
