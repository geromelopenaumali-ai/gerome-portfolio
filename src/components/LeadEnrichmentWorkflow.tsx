import { useEffect, useRef } from "react";

/**
 * Lead Enrichment workflow visualization.
 * Matches the Zapier-accent workflow style used across the portfolio.
 */
export function LeadEnrichmentWorkflow() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const q = (id: string) => svg.querySelector(`#${id}`) as SVGGElement | null;
    const paths = {
      p1: svg.querySelector("#p1") as SVGPathElement | null,
      p2: svg.querySelector("#p2") as SVGPathElement | null,
      p3: svg.querySelector("#p3") as SVGPathElement | null,
      p4: svg.querySelector("#p4") as SVGPathElement | null,
      pHigh: svg.querySelector("#pHigh") as SVGPathElement | null,
      pLow: svg.querySelector("#pLow") as SVGPathElement | null,
      pHigh1: svg.querySelector("#pHigh1") as SVGPathElement | null,
      pHigh2: svg.querySelector("#pHigh2") as SVGPathElement | null,
      pHigh3: svg.querySelector("#pHigh3") as SVGPathElement | null,
      pHigh4: svg.querySelector("#pHigh4") as SVGPathElement | null,
      pLow1: svg.querySelector("#pLow1") as SVGPathElement | null,
    };

    const nodes = {
      n1: q("n1"),
      n2: q("n2"),
      n3: q("n3"),
      n4: q("n4"),
      high1: q("high1"),
      high2: q("high2"),
      high3: q("high3"),
      high4: q("high4"),
      high5: q("high5"),
      low1: q("low1"),
      low2: q("low2"),
    };

    const dot = q("dot") as unknown as SVGCircleElement | null;
    const dotHigh = q("dotHigh") as unknown as SVGCircleElement | null;
    const dotLow = q("dotLow") as unknown as SVGCircleElement | null;

    function pointAt(path: SVGPathElement | null, t: number) {
      if (!path) return { x: 0, y: 0 };
      const len = path.getTotalLength();
      return path.getPointAtLength(Math.max(0, Math.min(1, t)) * len);
    }

    function setNode(key: keyof typeof nodes, on: boolean) {
      const el = nodes[key];
      if (!el) return;
      el.classList.toggle("active", on);
    }

    function setDot(
      d: SVGCircleElement | null,
      x: number,
      y: number,
      opacity: number,
    ) {
      if (!d) return;
      d.setAttribute("cx", String(x));
      d.setAttribute("cy", String(y));
      d.setAttribute("opacity", String(opacity));
    }

    let start: number | null = null;
    const T = 9.0;
    let raf = 0;

    function frame(ts: number) {
      if (!svg) return;
      if (!start) start = ts;
      const t = ((ts - start) / 1000) % T;

      svg.querySelectorAll(".active").forEach((el) => el.classList.remove("active"));
      setDot(dot, 0, 0, 0);
      setDot(dotHigh, 0, 0, 0);
      setDot(dotLow, 0, 0, 0);

      // Main trunk timing
      const seg = {
        n1: [0.0, 0.5],
        p1: [0.5, 1.0],
        n2: [1.0, 1.5],
        p2: [1.5, 2.0],
        n3: [2.0, 2.5],
        p3: [2.5, 3.0],
        n4: [3.0, 3.5],
        split: [3.5, 4.0],
      };

      if (t >= seg.n1[0] && t < seg.n1[1]) setNode("n1", true);
      if (t >= seg.p1[0] && t < seg.p1[1] && paths.p1 && dot) {
        const tt = (t - seg.p1[0]) / 0.5;
        const p = pointAt(paths.p1, tt);
        setDot(dot, p.x, p.y, 1);
      }
      if (t >= seg.n2[0] && t < seg.n2[1]) setNode("n2", true);
      if (t >= seg.p2[0] && t < seg.p2[1] && paths.p2 && dot) {
        const tt = (t - seg.p2[0]) / 0.5;
        const p = pointAt(paths.p2, tt);
        setDot(dot, p.x, p.y, 1);
      }
      if (t >= seg.n3[0] && t < seg.n3[1]) setNode("n3", true);
      if (t >= seg.p3[0] && t < seg.p3[1] && paths.p3 && dot) {
        const tt = (t - seg.p3[0]) / 0.5;
        const p = pointAt(paths.p3, tt);
        setDot(dot, p.x, p.y, 1);
      }
      if (t >= seg.n4[0] && t < seg.n4[1]) setNode("n4", true);

      // Branch out to high / low priority
      if (t >= seg.split[0] && t < seg.split[1] && paths.pHigh && paths.pLow) {
        const tt = (t - seg.split[0]) / 0.5;
        const ph = pointAt(paths.pHigh, tt);
        const pl = pointAt(paths.pLow, tt);
        setDot(dotHigh, ph.x, ph.y, 1);
        setDot(dotLow, pl.x, pl.y, 1);
      }

      // High priority branch
      const highStart = 4.0;
      const highSteps = [
        { node: "high1", path: paths.pHigh1, dur: 0.5 },
        { node: "high2", path: paths.pHigh2, dur: 0.5 },
        { node: "high3", path: paths.pHigh3, dur: 0.5 },
        { node: "high4", path: paths.pHigh4, dur: 0.5 },
        { node: "high5", path: null as SVGPathElement | null, dur: 0.5 },
      ] as const;

      let cursor = highStart;
      for (const step of highSteps) {
        const nodeWindow = [cursor, cursor + 0.4];
        const pathWindow = [cursor + 0.4, cursor + 0.4 + step.dur];
        if (t >= nodeWindow[0] && t < nodeWindow[1]) setNode(step.node as keyof typeof nodes, true);
        if (step.path && t >= pathWindow[0] && t < pathWindow[1] && dotHigh) {
          const tt = (t - pathWindow[0]) / step.dur;
          const p = pointAt(step.path, tt);
          setDot(dotHigh, p.x, p.y, 1);
        }
        cursor += 0.4 + step.dur;
      }

      // Low priority branch
      const lowStart = 4.0;
      const lowSteps = [
        { node: "low1", path: paths.pLow1, dur: 0.5 },
        { node: "low2", path: null as SVGPathElement | null, dur: 0.5 },
      ] as const;

      let lcursor = lowStart;
      for (const step of lowSteps) {
        const nodeWindow = [lcursor, lcursor + 0.4];
        const pathWindow = [lcursor + 0.4, lcursor + 0.4 + step.dur];
        if (t >= nodeWindow[0] && t < nodeWindow[1]) setNode(step.node as keyof typeof nodes, true);
        if (step.path && t >= pathWindow[0] && t < pathWindow[1] && dotLow) {
          const tt = (t - pathWindow[0]) / step.dur;
          const p = pointAt(step.path, tt);
          setDot(dotLow, p.x, p.y, 1);
        }
        lcursor += 0.4 + step.dur;
      }

      raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="workflow-viz-lead w-full">
      <style>{`
        .workflow-viz-lead svg { width: 100%; height: auto; display: block; font-family: ui-monospace, "SF Mono", "JetBrains Mono", "Courier New", monospace; }
        .workflow-viz-lead .node-text { fill: #93a0b0; font-size: 11px; letter-spacing: 1.2px; transition: fill .35s ease; }
        .workflow-viz-lead .pill-text { fill: #7d8694; font-size: 10px; letter-spacing: 1.5px; transition: fill .35s ease; }
        .workflow-viz-lead .card { fill: #12151f; stroke: rgba(255,255,255,0.07); stroke-width: 1; transition: stroke .35s ease, filter .35s ease; }
        .workflow-viz-lead .proc-box { fill: #0e1119; stroke: rgba(255,255,255,0.18); stroke-width: 1; stroke-dasharray: 4 3; transition: stroke .35s ease, filter .35s ease; }
        .workflow-viz-lead .pill { fill: #12151f; stroke: rgba(255,255,255,0.12); stroke-width: 1; transition: stroke .35s ease, filter .35s ease; }
        .workflow-viz-lead .flow { stroke: rgba(255,255,255,0.24); stroke-width: 1; stroke-dasharray: 4 4; fill: none; animation: leadDash 1.1s linear infinite; }
        @keyframes leadDash { to { stroke-dashoffset: -16; } }
        .workflow-viz-lead .packet { fill: #d6d6d6; }
        .workflow-viz-lead .junction { fill: rgba(255,255,255,0.3); }
        .workflow-viz-lead .icon { color: #8792a1; transition: color .35s ease; }

        .workflow-viz-lead g.active rect { stroke: #c0c0c0; filter: drop-shadow(0 0 7px rgba(255,255,255,0.35)); }
        .workflow-viz-lead g.active .icon { color: #e0e0e0; }
        .workflow-viz-lead g.active .node-text { fill: #f0f0f0; }
        .workflow-viz-lead g.active .pill-text { fill: #f0f0f0; }
      `}</style>
      <svg
        ref={svgRef}
        viewBox="0 0 620 766"
        role="img"
        aria-label="Lead enrichment workflow: form submission is parsed, enriched via Apollo, split by priority, then routed to Sheets, Slack, AI draft, and Gmail"
      >
        <rect
          x="15"
          y="14"
          width="590"
          height="738"
          rx="20"
          fill="#0a0c12"
          stroke="rgba(167,139,250,0.15)"
        />

        {/* Main trunk flows */}
        <path id="p1" className="flow" d="M310,86 L310,122" />
        <path id="p2" className="flow" d="M310,168 L310,208" />
        <path id="p3" className="flow" d="M310,254 L310,294" />
        <path id="p4" className="flow" d="M310,340 L310,362" />

        {/* Split to branches */}
        <path id="pHigh" className="flow" d="M310,362 C310,384 240,382 170,398" fill="none" />
        <path id="pLow" className="flow" d="M310,362 C310,384 380,382 450,398" fill="none" />

        {/* High priority branch flows */}
        <path id="pHigh1" className="flow" d="M170,424 L170,452" />
        <path id="pHigh2" className="flow" d="M170,496 L170,524" />
        <path id="pHigh3" className="flow" d="M170,568 L170,596" />
        <path id="pHigh4" className="flow" d="M170,640 L170,668" />

        {/* Low priority branch flows */}
        <path id="pLow1" className="flow" d="M450,424 L450,452" />
        <path className="flow" d="M450,496 L450,524" />

        <circle className="junction" cx="310" cy="362" r="2.5" />

        <circle id="dot" className="packet" r="3.2" opacity="0" />
        <circle id="dotHigh" className="packet" r="3.2" opacity="0" />
        <circle id="dotLow" className="packet" r="3.2" opacity="0" />

        {/* Node 1: Lead comes in */}
        <g id="n1" transform="translate(160,40)">
          <rect className="card" width="300" height="46" rx="10" />
          <g className="icon" transform="translate(18,15)">
            <path d="M2,4 L14,4 L14,12 L2,12 Z" fill="none" stroke="currentColor" strokeWidth="1.1" />
            <path d="M2,4 L8,9 L14,4" fill="none" stroke="currentColor" strokeWidth="1.1" />
          </g>
          <text className="node-text" x="46" y="27">LEAD COMES IN</text>
        </g>

        {/* Node 2: Formatter */}
        <g id="n2" transform="translate(160,122)">
          <rect className="card" width="300" height="46" rx="10" />
          <g className="icon" transform="translate(18,15)">
            <path d="M2,2 H14 V14 H2 Z" fill="none" stroke="currentColor" strokeWidth="1.1" />
            <path d="M5,5 H11 M5,8 H11 M5,11 H8" stroke="currentColor" strokeWidth="1.1" />
          </g>
          <text className="node-text" x="46" y="27">GET COMPANY URL</text>
        </g>

        {/* Node 3: Apollo enrichment */}
        <g id="n3" transform="translate(160,208)">
          <rect className="proc-box" width="300" height="46" rx="10" />
          <text className="node-text" x="46" y="27">ENRICH WITH APOLLO</text>
        </g>

        {/* Node 4: Split paths */}
        <g id="n4" transform="translate(160,294)">
          <rect className="card" width="300" height="46" rx="10" />
          <g className="icon" transform="translate(18,15)">
            <path d="M8,1 L8,6 M8,6 L2,13 M8,6 L14,13" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
          </g>
          <text className="node-text" x="46" y="27">SPLIT INTO PATHS</text>
        </g>

        {/* High priority label */}
        <g id="high1" transform="translate(100,398)">
          <rect className="pill" width="140" height="26" rx="13" />
          <text className="pill-text" x="70" y="17" textAnchor="middle">HIGH PRIORITY</text>
        </g>

        {/* High priority nodes */}
        <g id="high2" transform="translate(40,452)">
          <rect className="card" width="260" height="44" rx="10" />
          <text className="node-text" x="20" y="26">SAVE HIGH-PRIO LEADS</text>
        </g>

        <g id="high3" transform="translate(40,524)">
          <rect className="card" width="260" height="44" rx="10" />
          <text className="node-text" x="20" y="26">NOTIFY SALES TEAM</text>
        </g>

        <g id="high4" transform="translate(40,596)">
          <rect className="proc-box" width="260" height="44" rx="10" />
          <text className="node-text" x="20" y="26">AI EMAIL DRAFT</text>
        </g>

        <g id="high5" transform="translate(40,668)">
          <rect className="card" width="260" height="44" rx="10" />
          <text className="node-text" x="20" y="26">SEND EMAIL TO CLIENT</text>
        </g>

        {/* Low priority label */}
        <g id="low1" transform="translate(380,398)">
          <rect className="pill" width="140" height="26" rx="13" />
          <text className="pill-text" x="70" y="17" textAnchor="middle">LOW PRIORITY</text>
        </g>

        {/* Low priority node */}
        <g id="low2" transform="translate(320,452)">
          <rect className="card" width="260" height="44" rx="10" />
          <text className="node-text" x="20" y="26">NOTIFY SALES TEAM</text>
        </g>

        {/* Low priority terminator */}
        <g transform="translate(380,524)">
          <rect className="pill" width="140" height="26" rx="13" />
          <text className="pill-text" x="70" y="17" textAnchor="middle">PATH ENDS</text>
        </g>
      </svg>

    </div>
  );
}
