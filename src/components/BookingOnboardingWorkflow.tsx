import { useEffect, useRef } from "react";

/**
 * GoHighLevel Booking → Onboarding workflow visualization.
 * Same animated-SVG concept as the Zapier workflows, tinted with the GHL accent.
 */
export function BookingOnboardingWorkflow() {
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
      pClient: svg.querySelector("#pClient") as SVGPathElement | null,
      pInternal: svg.querySelector("#pInternal") as SVGPathElement | null,
      pClient1: svg.querySelector("#pClient1") as SVGPathElement | null,
      pClient2: svg.querySelector("#pClient2") as SVGPathElement | null,
      pInternal1: svg.querySelector("#pInternal1") as SVGPathElement | null,
      pInternal2: svg.querySelector("#pInternal2") as SVGPathElement | null,
    };

    const nodes = {
      n1: q("n1"),
      n2: q("n2"),
      n3: q("n3"),
      n4: q("n4"),
      n5: q("n5"),
      client1: q("client1"),
      client2: q("client2"),
      client3: q("client3"),
      internal1: q("internal1"),
      internal2: q("internal2"),
      internal3: q("internal3"),
    };

    const dot = q("dot") as unknown as SVGCircleElement | null;
    const dotClient = q("dotClient") as unknown as SVGCircleElement | null;
    const dotInternal = q("dotInternal") as unknown as SVGCircleElement | null;

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
    const T = 10.0;
    let raf = 0;

    function frame(ts: number) {
      if (!svg) return;
      if (!start) start = ts;
      const t = ((ts - start) / 1000) % T;

      svg.querySelectorAll(".active").forEach((el) => el.classList.remove("active"));
      setDot(dot, 0, 0, 0);
      setDot(dotClient, 0, 0, 0);
      setDot(dotInternal, 0, 0, 0);

      const seg = {
        n1: [0.0, 0.5],
        p1: [0.5, 1.0],
        n2: [1.0, 1.5],
        p2: [1.5, 2.0],
        n3: [2.0, 2.5],
        p3: [2.5, 3.0],
        n4: [3.0, 3.5],
        p4: [3.5, 4.0],
        n5: [4.0, 4.5],
        split: [4.5, 5.0],
      };

      if (t >= seg.n1[0] && t < seg.n1[1]) setNode("n1", true);
      if (t >= seg.p1[0] && t < seg.p1[1] && paths.p1 && dot) {
        const p = pointAt(paths.p1, (t - seg.p1[0]) / 0.5);
        setDot(dot, p.x, p.y, 1);
      }
      if (t >= seg.n2[0] && t < seg.n2[1]) setNode("n2", true);
      if (t >= seg.p2[0] && t < seg.p2[1] && paths.p2 && dot) {
        const p = pointAt(paths.p2, (t - seg.p2[0]) / 0.5);
        setDot(dot, p.x, p.y, 1);
      }
      if (t >= seg.n3[0] && t < seg.n3[1]) setNode("n3", true);
      if (t >= seg.p3[0] && t < seg.p3[1] && paths.p3 && dot) {
        const p = pointAt(paths.p3, (t - seg.p3[0]) / 0.5);
        setDot(dot, p.x, p.y, 1);
      }
      if (t >= seg.n4[0] && t < seg.n4[1]) setNode("n4", true);
      if (t >= seg.p4[0] && t < seg.p4[1] && paths.p4 && dot) {
        const p = pointAt(paths.p4, (t - seg.p4[0]) / 0.5);
        setDot(dot, p.x, p.y, 1);
      }
      if (t >= seg.n5[0] && t < seg.n5[1]) setNode("n5", true);

      if (t >= seg.split[0] && t < seg.split[1] && paths.pClient && paths.pInternal) {
        const tt = (t - seg.split[0]) / 0.5;
        const pc = pointAt(paths.pClient, tt);
        const pi = pointAt(paths.pInternal, tt);
        setDot(dotClient, pc.x, pc.y, 1);
        setDot(dotInternal, pi.x, pi.y, 1);
      }

      // Client branch
      const clientStart = 5.0;
      const clientSteps = [
        { node: "client1", path: null as SVGPathElement | null, dur: 0.5 },
        { node: "client2", path: paths.pClient1, dur: 0.5 },
        { node: "client3", path: paths.pClient2, dur: 0.5 },
      ] as const;

      let cc = clientStart;
      for (const step of clientSteps) {
        const nodeWindow = [cc, cc + 0.4];
        const pathWindow = [cc + 0.4, cc + 0.4 + step.dur];
        if (t >= nodeWindow[0] && t < nodeWindow[1]) setNode(step.node as keyof typeof nodes, true);
        if (step.path && t >= pathWindow[0] && t < pathWindow[1] && dotClient) {
          const p = pointAt(step.path, (t - pathWindow[0]) / step.dur);
          setDot(dotClient, p.x, p.y, 1);
        }
        cc += 0.4 + step.dur;
      }

      // Internal branch
      const intStart = 5.0;
      const intSteps = [
        { node: "internal1", path: null as SVGPathElement | null, dur: 0.5 },
        { node: "internal2", path: paths.pInternal1, dur: 0.5 },
        { node: "internal3", path: paths.pInternal2, dur: 0.5 },
      ] as const;

      let ic = intStart;
      for (const step of intSteps) {
        const nodeWindow = [ic, ic + 0.4];
        const pathWindow = [ic + 0.4, ic + 0.4 + step.dur];
        if (t >= nodeWindow[0] && t < nodeWindow[1]) setNode(step.node as keyof typeof nodes, true);
        if (step.path && t >= pathWindow[0] && t < pathWindow[1] && dotInternal) {
          const p = pointAt(step.path, (t - pathWindow[0]) / step.dur);
          setDot(dotInternal, p.x, p.y, 1);
        }
        ic += 0.4 + step.dur;
      }

      raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="workflow-viz-ghl w-full">
      <style>{`
        .workflow-viz-ghl svg { width: 100%; height: auto; display: block; font-family: ui-monospace, "SF Mono", "JetBrains Mono", "Courier New", monospace; }
        .workflow-viz-ghl .node-text { fill: #93a0b0; font-size: 11px; letter-spacing: 1.2px; transition: fill .35s ease; }
        .workflow-viz-ghl .pill-text { fill: #7d8694; font-size: 10px; letter-spacing: 1.5px; transition: fill .35s ease; }
        .workflow-viz-ghl .card { fill: #12151f; stroke: rgba(255,255,255,0.07); stroke-width: 1; transition: stroke .35s ease, filter .35s ease; }
        .workflow-viz-ghl .proc-box { fill: #0e1119; stroke: rgba(255,255,255,0.18); stroke-width: 1; stroke-dasharray: 4 3; transition: stroke .35s ease, filter .35s ease; }
        .workflow-viz-ghl .pill { fill: #12151f; stroke: rgba(255,255,255,0.12); stroke-width: 1; transition: stroke .35s ease, filter .35s ease; }
        .workflow-viz-ghl .flow { stroke: rgba(255,255,255,0.24); stroke-width: 1; stroke-dasharray: 4 4; fill: none; animation: ghlDash 1.1s linear infinite; }
        @keyframes ghlDash { to { stroke-dashoffset: -16; } }
        .workflow-viz-ghl .packet { fill: #d0d0d0; }
        .workflow-viz-ghl .junction { fill: rgba(255,255,255,0.3); }
        .workflow-viz-ghl .icon { color: #8792a1; transition: color .35s ease; }

        .workflow-viz-ghl g.active rect { stroke: #b5b5b5; filter: drop-shadow(0 0 7px rgba(255,255,255,0.35)); }
        .workflow-viz-ghl g.active .icon { color: #d0d0d0; }
        .workflow-viz-ghl g.active .node-text { fill: #f0f0f0; }
        .workflow-viz-ghl g.active .pill-text { fill: #f0f0f0; }
      `}</style>
      <svg
        ref={svgRef}
        viewBox="0 0 620 820"
        role="img"
        aria-label="Booking to onboarding workflow: calendar booking triggers confirmation, checkout, contract, then splits into a client welcome sequence and an internal delivery handoff"
      >
        <rect
          x="15"
          y="14"
          width="590"
          height="790"
          rx="20"
          fill="#0a0c12"
          stroke="rgba(255,255,255,0.12)"
        />

        {/* Trunk flows */}
        <path id="p1" className="flow" d="M310,82 L310,122" />
        <path id="p2" className="flow" d="M310,168 L310,208" />
        <path id="p3" className="flow" d="M310,254 L310,294" />
        <path id="p4" className="flow" d="M310,340 L310,380" />

        {/* Split */}
        <path id="pClient" className="flow" d="M310,466 C310,478 250,478 170,486" fill="none" />
        <path id="pInternal" className="flow" d="M310,466 C310,478 370,478 450,486" fill="none" />

        {/* Client branch flows */}
        <path id="pClient1" className="flow" d="M170,552 L170,586" />
        <path id="pClient2" className="flow" d="M170,632 L170,666" />

        {/* Internal branch flows */}
        <path id="pInternal1" className="flow" d="M450,552 L450,586" />
        <path id="pInternal2" className="flow" d="M450,632 L450,666" />

        <circle className="junction" cx="310" cy="466" r="2.5" />

        <circle id="dot" className="packet" r="3.2" opacity="0" />
        <circle id="dotClient" className="packet" r="3.2" opacity="0" />
        <circle id="dotInternal" className="packet" r="3.2" opacity="0" />

        {/* Trunk nodes */}
        <g id="n1" transform="translate(160,36)">
          <rect className="card" width="300" height="46" rx="10" />
          <g className="icon" transform="translate(18,14)">
            <rect x="2" y="3" width="12" height="11" fill="none" stroke="currentColor" strokeWidth="1.1" rx="1" />
            <path d="M2,6 L14,6" stroke="currentColor" strokeWidth="1.1" />
            <path d="M5,1 L5,4 M11,1 L11,4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
          </g>
          <text className="node-text" x="46" y="27">CALENDAR BOOKING</text>
        </g>

        <g id="n2" transform="translate(160,122)">
          <rect className="card" width="300" height="46" rx="10" />
          <g className="icon" transform="translate(18,15)">
            <path d="M2,4 L14,4 L14,12 L2,12 Z" fill="none" stroke="currentColor" strokeWidth="1.1" />
            <path d="M2,4 L8,9 L14,4" fill="none" stroke="currentColor" strokeWidth="1.1" />
          </g>
          <text className="node-text" x="46" y="27">CONFIRMATION EMAIL + SMS</text>
        </g>

        <g id="n3" transform="translate(160,208)">
          <rect className="card" width="300" height="46" rx="10" />
          <g className="icon" transform="translate(18,15)">
            <rect x="2" y="3" width="12" height="10" fill="none" stroke="currentColor" strokeWidth="1.1" rx="1.5" />
            <path d="M5,8 L11,8" stroke="currentColor" strokeWidth="1.1" />
          </g>
          <text className="node-text" x="46" y="27">STRIPE CHECKOUT LINK</text>
        </g>

        <g id="n4" transform="translate(160,294)">
          <rect className="card" width="300" height="46" rx="10" />
          <g className="icon" transform="translate(18,15)">
            <path d="M3,2 H11 L14,5 V14 H3 Z" fill="none" stroke="currentColor" strokeWidth="1.1" />
            <path d="M6,8 H11 M6,11 H10" stroke="currentColor" strokeWidth="1.1" />
          </g>
          <text className="node-text" x="46" y="27">CONTRACT E-SIGN</text>
        </g>

        <g id="n5" transform="translate(160,380)">
          <rect className="proc-box" width="300" height="46" rx="10" />
          <text className="node-text" x="46" y="27">PAYMENT CONFIRMED — SPLIT</text>
        </g>

        {/* Client branch */}
        <g id="client1" transform="translate(125,486)">
          <rect className="pill" width="90" height="26" rx="13" />
          <text className="pill-text" x="45" y="17" textAnchor="middle">CLIENT PATH</text>
        </g>

        <g id="client2" transform="translate(40,532)">
          <rect className="card" width="260" height="44" rx="10" />
          <text className="node-text" x="20" y="26">WELCOME SEQUENCE</text>
        </g>

        <g id="client3" transform="translate(40,612)">
          <rect className="card" width="260" height="44" rx="10" />
          <text className="node-text" x="20" y="26">KICKOFF + ONBOARDING DOC</text>
        </g>

        {/* Internal branch */}
        <g id="internal1" transform="translate(405,486)">
          <rect className="pill" width="90" height="26" rx="13" />
          <text className="pill-text" x="45" y="17" textAnchor="middle">INTERNAL</text>
        </g>

        <g id="internal2" transform="translate(320,532)">
          <rect className="card" width="260" height="44" rx="10" />
          <text className="node-text" x="20" y="26">CREATE CLIENT WORKSPACE</text>
        </g>

        <g id="internal3" transform="translate(320,612)">
          <rect className="card" width="260" height="44" rx="10" />
          <text className="node-text" x="20" y="26">SLACK HANDOFF TO DELIVERY</text>
        </g>
      </svg>
    </div>
  );
}
