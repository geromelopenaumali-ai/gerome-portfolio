import {
  BarChart3,
  Cable,
  Database,
  FileText,
  ListChecks,
  MessageSquareText,
  Play,
  RefreshCw,
  ScrollText,
  ShieldCheck,
  Workflow,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PlatformLogoInline, type PlatformLogoKey } from "@/components/PlatformLogo";

type PanelNode = {
  title: string;
  detail: string;
  status: string;
  description: string;
  icon: LucideIcon;
  y: number;
};

const INPUTS: PanelNode[] = [
  { title: "USER REQUEST", detail: "text / voice", status: "LISTENING", description: "Listening for incoming text or voice input.", icon: MessageSquareText, y: 100 },
  { title: "DATA SOURCES", detail: "internal / external", status: "SYNCING", description: "Syncing internal and external context.", icon: Database, y: 178 },
  { title: "SYSTEM EVENTS", detail: "triggers / signals", status: "MONITORING", description: "Monitoring triggers and system signals.", icon: Zap, y: 256 },
  { title: "DOCUMENTS", detail: "files / knowledge", status: "INDEXING", description: "Indexing files and knowledge for retrieval.", icon: FileText, y: 334 },
  { title: "APIs & SERVICES", detail: "endpoints / tools", status: "TOOLS READY", description: "Connected endpoints and tools are ready.", icon: Cable, y: 412 },
];

const ACTIONS: PanelNode[] = [
  { title: "PLAN", detail: "sequence steps", status: "BUILDING", description: "Building the next sequence of actions.", icon: ListChecks, y: 122 },
  { title: "EXECUTE", detail: "run actions", status: "RUNNING", description: "Running the approved workflow actions.", icon: Play, y: 200 },
  { title: "VERIFY", detail: "check results", status: "CHECKING", description: "Checking results against the intended outcome.", icon: ShieldCheck, y: 278 },
  { title: "ADAPT", detail: "learn / refine", status: "REFINING", description: "Refining the next step from what happened.", icon: RefreshCw, y: 356 },
];

const OUTPUTS: PanelNode[] = [
  { title: "RESPONSE", detail: "delivered", status: "READY", description: "Response is ready to be delivered.", icon: MessageSquareText, y: 122 },
  { title: "UPDATES", detail: "systems synced", status: "SYNCED", description: "Connected systems have been updated.", icon: Workflow, y: 200 },
  { title: "LOGS", detail: "recorded", status: "RECORDING", description: "Writing an auditable record of the run.", icon: ScrollText, y: 278 },
  { title: "INSIGHTS", detail: "summarized", status: "SURFACING", description: "Surfacing useful signals and summaries.", icon: BarChart3, y: 356 },
];

const HERO_PLATFORM_LABELS: Record<PlatformLogoKey, string> = {
  n8n: "n8n",
  make: "Make",
  zapier: "Zapier",
  ghl: "GoHighLevel",
};

function HeroPlatformLogo({
  platform,
  transform,
  driftClass,
}: {
  platform: PlatformLogoKey;
  transform: string;
  driftClass: string;
}) {
  const label = HERO_PLATFORM_LABELS[platform];

  return (
    <g
      className={`v-panel-platform v-panel-platform-${platform}`}
      transform={transform}
      role="img"
      aria-label={`${label} platform logo`}
    >
      <title>{label} platform logo</title>
      <rect className="v-panel-platform-hit-area" x="-15" y="-15" width="30" height="30" rx="15" />
      <g className={`v-panel-platform-drift ${driftClass}`}>
        <PlatformLogoInline platform={platform} className="v-panel-platform-logo" />
      </g>
    </g>
  );
}

function PanelNodeCard({
  item,
  x,
  width,
  iconX,
  textX,
}: {
  item: PanelNode;
  x: number;
  width: number;
  iconX: number;
  textX: number;
}) {
  const Icon = item.icon;

  return (
    <g
      className="v-panel-card"
      transform={`translate(${x} ${item.y})`}
      tabIndex={0}
      role="group"
      aria-label={`${item.title}: ${item.description}`}
    >
      <title>{item.title}: {item.description}</title>
      <rect width={width} height="62" rx="4" />
      <Icon
        className="v-panel-card-icon"
        x={iconX - 9}
        y="20"
        width="18"
        height="18"
        strokeWidth={1.8}
        aria-hidden="true"
        focusable="false"
      />
      <text className="v-panel-card-title" x={textX} y="26">{item.title}</text>
      <text className="v-panel-card-detail" x={textX} y="45">{item.detail}</text>
      <text className="v-panel-card-status-text" x={textX} y="45">STATUS // {item.status}</text>
    </g>
  );
}

export function HeroAutomationAnimation() {
  return (
    <figure className="v-automation-figure v-automation-reference-figure" aria-labelledby="automation-visual-title">
      <div className="v-automation-animated-visual">
        <svg
          className="v-automation-animated-svg"
          viewBox="0 0 1000 500"
          role="img"
          aria-labelledby="automation-visual-title"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <radialGradient id="panel-core-glow" cx="50%" cy="50%" r="62%">
              <stop offset="0%" stopColor="#a1c2c8" stopOpacity=".22" />
              <stop offset="58%" stopColor="#a1c2c8" stopOpacity=".06" />
              <stop offset="100%" stopColor="#a1c2c8" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="panel-line" x1="0" x2="1">
              <stop offset="0%" stopColor="#9bb8bf" stopOpacity=".18" />
              <stop offset="50%" stopColor="#b9d1d5" stopOpacity=".68" />
              <stop offset="100%" stopColor="#9bb8bf" stopOpacity=".18" />
            </linearGradient>
            <filter id="panel-soft-glow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          <text className="v-panel-kicker" x="30" y="32">PROCESS / AI AUTOMATION</text>

          <text className="v-panel-stage-title" x="149" y="77" textAnchor="middle">INPUT</text>
          <text className="v-panel-stage-title" x="450" y="77" textAnchor="middle">AI LAYER</text>
          <text className="v-panel-stage-title" x="680" y="77" textAnchor="middle">WORKFLOW</text>
          <text className="v-panel-stage-title" x="893" y="77" textAnchor="middle">OUTPUT</text>

          <g className="v-panel-connectors" aria-hidden="true">
            <g className="v-panel-connector-lane"><path className="v-panel-connector-base" pathLength="100" d="M 274 131 C 316 131, 338 170, 379.86 192.03" /><path className="v-panel-connector-signal" pathLength="100" d="M 274 131 C 316 131, 338 170, 379.86 192.03" /></g>
            <g className="v-panel-connector-lane"><path className="v-panel-connector-base" pathLength="100" d="M 274 209 C 318 209, 338 218, 362.48 225.09" /><path className="v-panel-connector-signal" pathLength="100" d="M 274 209 C 318 209, 338 218, 362.48 225.09" /></g>
            <g className="v-panel-connector-lane"><path className="v-panel-connector-base" pathLength="100" d="M 274 287 C 318 287, 338 278, 361.86 272.64" /><path className="v-panel-connector-signal" pathLength="100" d="M 274 287 C 318 287, 338 278, 361.86 272.64" /></g>
            <g className="v-panel-connector-lane"><path className="v-panel-connector-base" pathLength="100" d="M 274 365 C 316 365, 338 330, 378.90 306.78" /><path className="v-panel-connector-signal" pathLength="100" d="M 274 365 C 316 365, 338 330, 378.90 306.78" /></g>
            <g className="v-panel-connector-lane"><path className="v-panel-connector-base" pathLength="100" d="M 274 443 C 316 443, 346 350, 395.59 322.93" /><path className="v-panel-connector-signal" pathLength="100" d="M 274 443 C 316 443, 346 350, 395.59 322.93" /></g>
            <g className="v-panel-connector-lane"><path className="v-panel-connector-base" pathLength="100" d="M 528.07 203.26 C 558 203, 570 153, 600 153" /><path className="v-panel-connector-signal" pathLength="100" d="M 528.07 203.26 C 558 203, 570 153, 600 153" /></g>
            <g className="v-panel-connector-lane"><path className="v-panel-connector-base" pathLength="100" d="M 540.38 239.40 C 562 239, 570 231, 600 231" /><path className="v-panel-connector-signal" pathLength="100" d="M 540.38 239.40 C 562 239, 570 231, 600 231" /></g>
            <g className="v-panel-connector-lane"><path className="v-panel-connector-base" pathLength="100" d="M 535.51 281.14 C 560 282, 568 309, 600 309" /><path className="v-panel-connector-signal" pathLength="100" d="M 535.51 281.14 C 560 282, 568 309, 600 309" /></g>
            <g className="v-panel-connector-lane"><path className="v-panel-connector-base" pathLength="100" d="M 519.48 308.76 C 550 310, 568 387, 600 387" /><path className="v-panel-connector-signal" pathLength="100" d="M 519.48 308.76 C 550 310, 568 387, 600 387" /></g>
            <g className="v-panel-connector-lane"><path className="v-panel-connector-base v-panel-handoff-base" pathLength="100" d="M 760 153 C 772 153, 784 153, 808 153" /><path className="v-panel-connector-signal v-panel-handoff-signal" pathLength="100" d="M 760 153 C 772 153, 784 153, 808 153" /></g>
            <g className="v-panel-connector-lane"><path className="v-panel-connector-base v-panel-handoff-base" pathLength="100" d="M 760 231 C 772 231, 784 231, 808 231" /><path className="v-panel-connector-signal v-panel-handoff-signal" pathLength="100" d="M 760 231 C 772 231, 784 231, 808 231" /></g>
            <g className="v-panel-connector-lane"><path className="v-panel-connector-base v-panel-handoff-base" pathLength="100" d="M 760 309 C 772 309, 784 309, 808 309" /><path className="v-panel-connector-signal v-panel-handoff-signal" pathLength="100" d="M 760 309 C 772 309, 784 309, 808 309" /></g>
            <g className="v-panel-connector-lane"><path className="v-panel-connector-base v-panel-handoff-base" pathLength="100" d="M 760 387 C 772 387, 784 387, 808 387" /><path className="v-panel-connector-signal v-panel-handoff-signal" pathLength="100" d="M 760 387 C 772 387, 784 387, 808 387" /></g>
            <path className="v-panel-channel-bus" d="M 784 153 L 784 387" />
          </g>


          <g className="v-panel-card-column v-panel-input-column">
            {INPUTS.map((item) => (
              <PanelNodeCard key={item.title} item={item} x={24} width={250} iconX={18} textX={43} />
            ))}
          </g>

          <g className="v-panel-core" transform="translate(350 108)">
            <circle className="v-panel-core-halo" cx="100" cy="142" r="144" fill="url(#panel-core-glow)" />
              <circle className="v-panel-core-orbit" cx="100" cy="142" r="91" />
              <circle className="v-panel-core-signal" cx="100" cy="142" r="86" />
              <circle className="v-panel-core-ring" cx="100" cy="142" r="78" />
              <circle className="v-panel-core-ring v-panel-core-ring-secondary" cx="100" cy="142" r="66" />
              <g className="v-panel-core-platforms">
                <HeroPlatformLogo platform="n8n" transform="translate(100 91)" driftClass="v-panel-platform-drift-n8n" />
                <HeroPlatformLogo platform="make" transform="translate(151 142)" driftClass="v-panel-platform-drift-make" />
                <HeroPlatformLogo platform="zapier" transform="translate(100 193)" driftClass="v-panel-platform-drift-zapier" />
                <HeroPlatformLogo platform="ghl" transform="translate(49 142)" driftClass="v-panel-platform-drift-ghl" />
              </g>
              <text className="v-panel-core-ai" x="100" y="147" textAnchor="middle">AI</text>
              <text className="v-panel-core-title" x="100" y="248" textAnchor="middle">AI DECISION CORE</text>
              <text className="v-panel-core-principle" x="100" y="270" textAnchor="middle">UNDERSTAND</text>
              <text className="v-panel-core-principle" x="100" y="285" textAnchor="middle">REASON</text>
              <text className="v-panel-core-principle" x="100" y="300" textAnchor="middle">DECIDE</text>
              <text className="v-panel-core-principle" x="100" y="315" textAnchor="middle">PRIORITIZE</text>
          </g>

          <g className="v-panel-card-column v-panel-workflow-column">
            {ACTIONS.map((item) => (
              <PanelNodeCard key={item.title} item={item} x={600} width={160} iconX={16} textX={40} />
            ))}
          </g>

          <g className="v-panel-card-column v-panel-output-column">
            {OUTPUTS.map((item) => (
              <PanelNodeCard key={item.title} item={item} x={808} width={170} iconX={15} textX={38} />
            ))}
          </g>
        </svg>
      </div>
      <figcaption id="automation-visual-title" className="sr-only">
        Animated AI automation operating panel showing information entering an AI decision core, moving through workflow actions, and producing useful outputs.
      </figcaption>
    </figure>
  );
}
