import { useEffect, useMemo, useRef, useState } from "react";
import { BorderBeam } from "@/components/lightswind/border-beam";
import { MagneticButton } from "@/components/lightswind/magnetic-button";
import StardustButton from "@/components/lightswind/stardust-button";
import { useReveal } from "../hooks/use-reveal";
import { BlurUpPicture } from "./BlurUpPicture";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { PlatformLogo, type PlatformLogoKey } from "./PlatformLogo";

export type LivePreviewConfig = {
  heading: string;
  inputLabel: string;
  defaultQuestion: string;
  answer: string;
  source: string;
  traceTitle: string;
  answerTitle: string;
  trace: [string, string][];
};

export type ShowcaseProject = {
  index: string;
  title: string;
  description: string;
  stack: string[];
  steps?: string[];
  challenge?: string;
  solution?: string;
  value?: string;
  interactive?: string;
  direct?: {
    whatItDoes: string;
    howItWorks: string[];
    problemSolved: string;
    tools: string[];
  };
  ragPreview?: LivePreviewConfig;
  n8nPreview?: LivePreviewConfig;
  node?: string;
};

export type ShowcaseBlock = {
  key: PlatformLogoKey;
  name: string;
  tagline: string;
  accent: string;
  comingSoon?: boolean;
  projects: ShowcaseProject[];
};

export type ShowcaseImpact = {
  timeSaved: string;
  manualWork: string;
  errorReduction: string;
  clientBenefit: string;
  purpose?: string[];
};

type Shot = {
  src: string;
  webp: string;
  avif: string;
  placeholderWebp?: string;
  placeholderAvif?: string;
  width?: number;
  height?: number;
  previewClassName?: string;
  alt: string;
};

type RagStage = "idle" | "searching" | "retrieved" | "answered";

type PlatformTone = "n8n" | "make" | "zapier" | "facebook" | "asana" | "neutral";

function getPlatformTone(value: string): PlatformTone {
  const normalized = value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  if (normalized.includes("n8n")) return "n8n";
  if (normalized.includes("make")) return "make";
  if (normalized.includes("zapier")) return "zapier";
  if (normalized.includes("facebook") || normalized.includes("messenger") || normalized.includes("meta")) return "facebook";
  if (normalized.includes("asana")) return "asana";
  return "neutral";
}

function shortProcessLabel(value: string, index: number) {
  const normalized = value.replace(/[.?!]+$/g, "").trim();
  if (normalized.length <= 30) return normalized;
  const words = normalized.split(/\s+/);
  const limit = index === 0 ? 3 : 4;
  return `${words.slice(0, limit).join(" ")}…`;
}

function CountUpStat({ value }: { value: number }) {
  const { ref, revealed } = useReveal<HTMLSpanElement>();
  const [display, setDisplay] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!revealed || startedRef.current) return;
    startedRef.current = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }

    const durationToken = getComputedStyle(document.documentElement)
      .getPropertyValue("--duration-reveal")
      .trim();
    const duration = durationToken.endsWith("ms")
      ? parseFloat(durationToken)
      : parseFloat(durationToken) * 1000;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [revealed, value]);

  return (
    <span ref={ref} className="ab-countup" aria-label={`${value} items`}>
      {display}
    </span>
  );
}


const flowTitleByVerb: Record<string, string> = {
  watch: "Watch intake",
  detect: "Detect change",
  download: "Parse source",
  load: "Load context",
  create: "Create output",
  store: "Store context",
  receive: "Receive input",
  embed: "Retrieve context",
  use: "Generate response",
  send: "Send handoff",
  check: "Check decision",
  verify: "Verify event",
  maintain: "Maintain context",
  run: "Run action",
  route: "Route path",
  assign: "Assign priority",
  log: "Log record",
  upload: "Upload result",
  clear: "Clear staging",
  continue: "Continue filter",
  loop: "Loop outputs",
  publish: "Publish output",
  trigger: "Start workflow",
  format: "Format data",
  retrieve: "Retrieve data",
  iterate: "Iterate records",
  wait: "Wait for data",
  save: "Save record",
  generate: "Generate draft",
};

const flowVerbRoots: Record<string, string> = {
  watches: "watch", detects: "detect", downloads: "download", loads: "load", creates: "create",
  stores: "store", receives: "receive", embeds: "embed", uses: "use", sends: "send",
  checks: "check", verifies: "verify", maintains: "maintain", runs: "run", routes: "route",
  assigns: "assign", logs: "log", uploads: "upload", clears: "clear", continues: "continue",
  loops: "loop", publishes: "publish", triggers: "trigger", formats: "format", retrieves: "retrieve",
  iterates: "iterate", waits: "wait", saves: "save", generates: "generate",
};

function getFlowStepTitle(step: string) {
  if (/approval|sign-off|review/i.test(step)) return "Request approval";
  if (/score|priority/i.test(step)) return "Score priority";
  if (/enrich/i.test(step)) return "Enrich context";
  if (/notify|notification|alert/i.test(step)) return "Notify team";
  if (/booking|reschedul|cancellation|cancel/i.test(step)) return "Complete next action";
  const firstWord = step.trim().split(/\s+/)[0]?.replace(/[^A-Za-z]/g, "").toLowerCase() ?? "";
  const verb = flowVerbRoots[firstWord] ?? firstWord;
  return flowTitleByVerb[verb] ?? "Next action";
}

const projectNodeLabels: Record<string, string> = {
  ai: "knowledge retrieval",
  content: "content distribution",
  asana: "stage automation",
  lead: "lead routing",
};

const blockNodeLabels: Record<string, string> = {
  n8n: "AI workflow",
  make: "process orchestration",
  zapier: "cross-app automation",
};

function getProjectNodeLabel(blockKey: string, node?: string) {
  return (node && projectNodeLabels[node]) || blockNodeLabels[blockKey] || "workflow system";
}

type ProjectSignals = {
  trigger: string;
  decision: string;
  handoff: string;
  outcome: string;
  tags: string[];
};

const projectSignalsByTitle: Record<string, ProjectSignals> = {
  "RAG AI Agent": {
    trigger: "New knowledge-base document",
    decision: "Retrieve relevant context",
    handoff: "Grounded AI answer",
    outcome: "Searchable knowledge",
    tags: ["Grounded answers", "Knowledge retrieval", "Conversation memory"],
  },
  "AI Customer Support Agent with Human Approval": {
    trigger: "Incoming support email",
    decision: "Apply approved policy",
    handoff: "Manager review → Gmail",
    outcome: "Consistent support drafts",
    tags: ["Human approval", "Policy-based replies", "Gmail handoff"],
  },
  "Lead Qualification, Enrichment & Sales Routing": {
    trigger: "New lead submission",
    decision: "Score and prioritize",
    handoff: "Sheets → Slack / Gmail",
    outcome: "Clear sales priority",
    tags: ["Lead scoring", "Context enrichment", "Priority routing"],
  },
  "Facebook Messenger AI Support Agent": {
    trigger: "Messenger event",
    decision: "Ground response in support content",
    handoff: "Reply through Meta",
    outcome: "Separate customer context",
    tags: ["Messenger support", "Grounded replies", "User memory"],
  },
  "Gmail Attachment Intelligence & Filing": {
    trigger: "Incoming Gmail attachment",
    decision: "Analyze and rename file",
    handoff: "Drive → Sheets → email",
    outcome: "Findable, logged files",
    tags: ["File intelligence", "Drive filing", "Record keeping"],
  },
  "Asana Completed Task → Xero & Google Sheets Processing Workflow": {
    trigger: "Completed Asana task",
    decision: "Process accounting data",
    handoff: "Compiled result → Asana",
    outcome: "Closed-loop task handoff",
    tags: ["Accounting handoff", "Data staging", "Task completion"],
  },
  "Content Repurposing": {
    trigger: "New Drive video",
    decision: "Generate reusable content",
    handoff: "Facebook + LinkedIn",
    outcome: "One source, several outputs",
    tags: ["Content distribution", "AI generation", "Multi-channel output"],
  },
  "Asana CRM Automation": {
    trigger: "Asana stage change",
    decision: "Select the matching path",
    handoff: "Folder or email action",
    outcome: "Defined next action",
    tags: ["Stage automation", "Follow-up", "Nurture paths"],
  },
  "Lead Enrichment": {
    trigger: "Youform submission",
    decision: "Enrich and route by priority",
    handoff: "Sheets / Slack / Gmail",
    outcome: "Relevant lead follow-up",
    tags: ["Lead enrichment", "Priority routing", "Sales alerts"],
  },
};

function getProjectSignals(project: ShowcaseProject, blockKey: string): ProjectSignals {
  return projectSignalsByTitle[project.title] ?? {
    trigger: project.steps?.[0] ?? "Workflow event",
    decision: getProjectNodeLabel(blockKey, project.node),
    handoff: project.stack[project.stack.length - 1] ?? "Connected tool handoff",
    outcome: project.description,
    tags: [getProjectNodeLabel(blockKey, project.node)],
  };
}

function cleanToolName(value: string) {
  return value.split("—")[0].trim();
}

function RagLivePreview({
  blockKey,
  project,
  ragQuery,
  ragStage,
  ragStageIndex,
  ragSources,
  onQueryChange,
  onRun,
}: {
  blockKey: string;
  project: ShowcaseProject;
  ragQuery: string;
  ragStage: RagStage;
  ragStageIndex: number;
  ragSources: string[];
  onQueryChange: (value: string) => void;
  onRun: () => void;
}) {
  const preview = project.ragPreview ?? project.n8nPreview;
  if (!preview) return null;

  return (
    <form
      className={`rag-terminal${ragStage !== "idle" ? " rag-terminal--active" : ""}`}
      onSubmit={(event) => {
        event.preventDefault();
        onRun();
      }}
    >
      <div className="rag-terminal-head">
        <span>{preview.heading}</span>
        <span className="rag-terminal-status"><i aria-hidden="true" /> READY</span>
      </div>
      <label className="rag-terminal-label" htmlFor={`rag-query-${blockKey}`}>
        {preview.inputLabel}
      </label>
      <p className="rag-terminal-purpose">Test the decision path — ask a question and inspect the handoff.</p>
      <div className="rag-terminal-input-row">
        <span aria-hidden="true">›</span>
        <input
          id={`rag-query-${blockKey}`}
          className="rag-terminal-input"
          value={ragQuery}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder={preview.defaultQuestion}
          aria-describedby={`rag-query-hint-${blockKey}`}
        />
        <StardustButton
          type="submit"
          variant="aurora"
          size="lg"
          theme="dark"
          className="rag-terminal-run"
          aria-label="Run live preview"
        >
          RUN
        </StardustButton>
      </div>
      <p id={`rag-query-hint-${blockKey}`} className="rag-terminal-hint">
        Ask a real question, then watch the system retrieve context and prepare the next action.
      </p>
      {ragStage !== "idle" ? (
          <div className="rag-terminal-result" aria-live="polite" data-lenis-prevent>
            <div className="rag-terminal-result-head">
                <span>{preview.traceTitle}</span>
              <span className="rag-terminal-stage-label">
                {ragStage === "searching" ? "SEARCHING" : ragStage === "retrieved" ? "CONTEXT FOUND" : "ANSWER READY"}
              </span>
            </div>
            <div className="rag-terminal-result-body">
              <div className="rag-terminal-trace-group">
                <div className="rag-terminal-trace" aria-label="Retrieval sequence">
                  {preview.trace.map(([label, description], index) => {
                    const stepIndex = index + 1;
                    const isDone = ragStageIndex > stepIndex;
                    const isCurrent = ragStageIndex === stepIndex;
                    return (
                      <div
                        className={`rag-terminal-trace-row${isDone ? " is-done" : ""}${isCurrent ? " is-current" : ""}`}
                        tabIndex={0}
                        key={label}
                      >
                        <span className="rag-terminal-trace-mark" aria-hidden="true">{isDone ? "✓" : isCurrent ? "•" : "·"}</span>
                        <span className="rag-terminal-trace-copy">
                          <strong>{label}</strong>
                          <small>{description}</small>
                        </span>
                      </div>
                    );
                  })}
                </div>
                {ragStageIndex >= 2 ? (
                  <div className="rag-terminal-context" aria-label="Retrieved sources">
                    {ragSources.map((source) => <span key={source}>{source}</span>)}
                  </div>
                ) : null}
              </div>
              {ragStage === "answered" ? (
                <div className="rag-terminal-answer">
                  <span className="rag-terminal-answer-label">{preview.answerTitle}</span>
                  <p>{preview.answer}</p>
                  <span className="rag-terminal-source">source path: {preview.source}</span>
                </div>
              ) : null}
            </div>
          </div>
      ) : null}
    </form>
  );
}

export function ProjectShowcase({
  blocks,
  impacts,
  defaultImpact,
  shots,
  onOpenShot,
}: {
  blocks: ShowcaseBlock[];
  impacts: Record<string, ShowcaseImpact>;
  defaultImpact: ShowcaseImpact;
  shots: Record<string, Shot>;
  onOpenShot: (shot: Shot) => void;
}) {
  const { ref, revealed } = useReveal<HTMLElement>();
  const atlasProjects = useMemo(
    () => blocks.filter((block) => !block.comingSoon).flatMap((block) => block.projects.map((project) => ({ block, project }))),
    [blocks],
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [detail, setDetail] = useState(false);
  const [ragQuery, setRagQuery] = useState("");
  const [ragStage, setRagStage] = useState<RagStage>("idle");
  const ragTimersRef = useRef<number[]>([]);
  const detailReturnFocusRef = useRef<HTMLElement | null>(null);

  const clearRagTimers = () => {
    ragTimersRef.current.forEach((timer) => window.clearTimeout(timer));
    ragTimersRef.current = [];
  };

  useEffect(() => () => clearRagTimers(), []);
  useEffect(() => {
    if (!detail) return;

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      const opener = detailReturnFocusRef.current;
      if (opener && document.contains(opener)) {
        window.requestAnimationFrame(() => opener.focus({ preventScroll: true }));
      }
    };
  }, [detail]);
  useEffect(() => {
    if (activeIndex < atlasProjects.length) return;
    setActiveIndex(Math.max(0, atlasProjects.length - 1));
  }, [activeIndex, atlasProjects.length]);

  const activeEntry = atlasProjects[activeIndex] ?? atlasProjects[0];
  if (!activeEntry) return null;

  const { block, project } = activeEntry;
  const impact = impacts[project.title] ?? defaultImpact;
  const shot = project.interactive ? shots[project.interactive] : undefined;
  const steps = project.steps ?? [];
  const processItems = steps.length ? steps.slice(0, 3) : project.stack.slice(0, 3);
  const preview = project.ragPreview ?? project.n8nPreview;
  const hasLivePreview = Boolean(preview);
  const signals = getProjectSignals(project, block.key);
  const ragStageIndex = { idle: 0, searching: 1, retrieved: 2, answered: 3 }[ragStage];
  const ragSources = preview?.source.split("→").map((item) => item.trim()).filter(Boolean) ?? [];
  const projectCount = atlasProjects.length;

  const resetRagPreview = () => {
    clearRagTimers();
    setRagQuery("");
    setRagStage("idle");
  };

  const selectProject = (index: number) => {
    setActiveIndex(index);
    setDetail(false);
    resetRagPreview();
  };

  const runRagPreview = () => {
    clearRagTimers();
    setRagQuery((current) => current.trim() || preview?.defaultQuestion || "");
    setRagStage("searching");
    ragTimersRef.current = [
      window.setTimeout(() => setRagStage("retrieved"), 720),
      window.setTimeout(() => setRagStage("answered"), 1480),
    ];
  };

  return (
    <section
      ref={ref}
      className="ab-section ab-atlas-section"
      data-revealed={revealed ? "true" : "false"}
    >
      <header className="ab-atlas-header">
        <div>
          <p className="ab-atlas-kicker">Selected systems / project archive</p>
          <h2 className="ab-title wb-reveal" id="projects">Projects</h2>
          <p className="ab-atlas-deck">A working archive of AI-powered systems built to capture information, move decisions forward, and make the next action happen automatically.</p>
          <p className="ab-atlas-coverage" aria-label="Workflow coverage">KNOWLEDGE · SUPPORT · ROUTING · CONTENT</p>
        </div>
        <div className="ab-atlas-count" aria-label={`${projectCount} selected projects`}>
          <span>ARCHIVE</span>
          <strong>{String(projectCount).padStart(2, "0")}</strong>
          <small>selected systems</small>
        </div>
      </header>

      <div className="ab-atlas">
        <nav className="ab-atlas-archive" aria-label="Project archive">
          <div className="ab-atlas-archive-head">
            <span>Project archive</span>
            <span>{String(projectCount).padStart(2, "0")} builds</span>
          </div>
          <div className="ab-atlas-list" role="tablist" aria-label="Selected projects">
            {atlasProjects.map(({ block: itemBlock, project: item }, index) => {
              const itemId = `${itemBlock.key}-${item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
              return (
                <button
                  key={itemId}
                  id={`atlas-project-tab-${index}`}
                  type="button"
                  role="tab"
                  aria-selected={index === activeIndex}
                  aria-controls="atlas-project-panel"
                  tabIndex={index === activeIndex ? 0 : -1}
                  className={`ab-atlas-item${index === activeIndex ? " is-active" : ""}`}
                  onClick={() => selectProject(index)}
                  onKeyDown={(event) => {
                    if (!["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft"].includes(event.key)) return;
                    event.preventDefault();
                    const delta = event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1;
                    const next = (index + delta + projectCount) % projectCount;
                    selectProject(next);
                    requestAnimationFrame(() => document.getElementById(`atlas-project-tab-${next}`)?.focus());
                  }}
                >
                  <span className="ab-atlas-item-number">{item.index}</span>
                  <span className="ab-atlas-item-copy">
                    <strong className="ab-atlas-item-name">{item.title}</strong>
                    <span className="ab-atlas-item-meta">
                      <span className="ab-atlas-item-platform" data-platform={getPlatformTone(itemBlock.name)}>{itemBlock.name}</span>
                      <span aria-hidden="true"> · </span>
                      <span>{getProjectNodeLabel(itemBlock.key, item.node)}</span>
                      <span aria-hidden="true"> · </span>
                      <span className="ab-atlas-item-outcome">{getProjectSignals(item, itemBlock.key).tags[0]}</span>
                    </span>
                  </span>
                  <span className="ab-atlas-item-tail">
                    <span className="ab-atlas-item-state">{index === activeIndex ? "VIEWING" : "OPEN"}</span>
                    <span className="ab-atlas-item-marker" aria-hidden="true">↗</span>
                  </span>
                </button>
              );
            })}
          </div>
        </nav>

        <article
          className="ab-atlas-canvas"
          id="atlas-project-panel"
          role="tabpanel"
          aria-labelledby={`atlas-project-tab-${activeIndex}`}
        >
          <div className="ab-atlas-canvas-top">
            <div className="ab-atlas-ident">
              <PlatformLogo platform={block.key} title={block.name} className="ab-atlas-platform-logo" />
              <span>{block.name} / {getProjectNodeLabel(block.key, project.node)}</span>
            </div>
          </div>

          <div className="ab-atlas-intro">
            <div className="ab-atlas-intro-copy">
              <p className="ab-atlas-project-meta">Selected system · {String(activeIndex + 1).padStart(2, "0")} / {String(projectCount).padStart(2, "0")}</p>
              <h3 className="ab-atlas-headline">{project.title}</h3>
              <p className="ab-atlas-body">{impact.clientBenefit || project.description}</p>
              <p className="ab-atlas-flowline" aria-label="System architecture">TRIGGER <span>→</span> AI DECISION <span>→</span> TOOL HANDOFF <span>→</span> LOGGED OUTCOME</p>
            </div>
            <div className="ab-atlas-meta-action">
              <MagneticButton
                type="button"
                className="ab-dossier-open"
                strength={0.12}
                onClick={() => {
                  detailReturnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
                  setDetail(true);
                }}
              >
                <span className="ab-dossier-open-label">View Project Details</span>
                <span aria-hidden="true">→</span>
                <BorderBeam size={42} duration={8.2} borderWidth={1.5} color={["#394140", "#78988d"]} />
              </MagneticButton>
            </div>
          </div>

          <div className="ab-atlas-workbench">
            <div className="ab-atlas-window-bar">
              <span className="ab-dot" /><span className="ab-dot" /><span className="ab-dot" />
              <span>{block.name.toLowerCase()} · {project.title.toLowerCase().replace(/\s+/g, "-")}</span>
            </div>
            {shot ? (
              <div className="ab-atlas-shot" role="group" aria-label={`Interactive workflow preview: ${project.title}`}>
                <button
                  type="button"
                  className="ab-atlas-shot-image"
                  onClick={() => onOpenShot(shot)}
                  aria-label={`Open full size diagram: ${project.title}`}
                >
                  <BlurUpPicture
                    src={shot.src}
                    avif={shot.avif}
                    webp={shot.webp}
                    placeholderAvif={shot.placeholderAvif}
                    placeholderWebp={shot.placeholderWebp}
                    width={shot.width ?? 1280}
                    height={shot.height ?? 720}
                    alt={shot.alt}
                  />
                </button>
                <span className="ab-shot-hint">click to enlarge</span>
              </div>
            ) : (
              <div className="ab-atlas-empty">Workflow visual coming soon.</div>
            )}
            <div className="ab-atlas-workbench-foot"><span>{project.stack.slice(0, 4).join(" · ")}</span></div>
          </div>

        </article>
      </div>

      {blocks.find((item) => item.comingSoon) ? (
        <div className="ab-atlas-coming" role="status">
          <span className="ab-atlas-coming-mark" aria-hidden="true">/</span>
          <span><strong>GoHighLevel</strong> system archive is in progress.</span>
          <span>COMING SOON</span>
        </div>
      ) : null}

      <Dialog open={detail} onOpenChange={setDetail}>
        <DialogContent className="pd-modal" data-project-details-dialog>
          <DialogHeader className="pd-modal-header">
            <div className="pd-kicker">{block.name} · {project.index} · case study</div>
            <DialogTitle className="pd-title">{project.title}</DialogTitle>
            <DialogDescription className="pd-lede">{project.direct?.whatItDoes ?? project.description}</DialogDescription>
          </DialogHeader>

          <div className="pd-scroll-region" data-lenis-prevent tabIndex={0} aria-label={`Project details for ${project.title}`}>
            <div className="pd-body">
            <div className="pd-at-glance" aria-label="Project at a glance">
              <div className="pd-at-glance-head">
                <p className="pd-label">At a glance</p>
                <span className="pd-architecture-line">TRIGGER → DECISION → HANDOFF → OUTCOME</span>
              </div>
              <div className="pd-signal-grid">
                <div><span>Trigger</span><strong>{signals.trigger}</strong></div>
                <div><span>Decision</span><strong>{signals.decision}</strong></div>
                <div><span>Handoff</span><strong>{signals.handoff}</strong></div>
                <div><span>Outcome</span><strong>{signals.outcome}</strong></div>
              </div>
              <div className="pd-outcome-tags" aria-label="Project outcome tags">
                {signals.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </div>

            {shot ? (
              <button
                type="button"
                className="pd-shot"
                onClick={() => {
                  setDetail(false);
                  onOpenShot(shot);
                }}
                aria-label={`Open full size diagram: ${project.title}`}
              >
                <BlurUpPicture
                  src={shot.src}
                  avif={shot.avif}
                  webp={shot.webp}
                  placeholderAvif={shot.placeholderAvif}
                  placeholderWebp={shot.placeholderWebp}
                  width={shot.width ?? 1280}
                  height={shot.height ?? 720}
                  alt={shot.alt}
                />
              </button>
            ) : null}

            {shot ? (
              <p className="pd-shot-caption" aria-label="Workflow map">
                <span className="pd-shot-caption-label">Workflow map</span>
                <span>{signals.trigger} <span aria-hidden="true">→</span> {signals.decision} <span aria-hidden="true">→</span> {signals.handoff} <span aria-hidden="true">→</span> {signals.outcome}</span>
              </p>
            ) : null}

            {(() => {
              const problemCopy = project.direct?.problemSolved ?? project.challenge ?? "The workflow needed a clearer, more reliable next step.";
              const systemCopy = project.direct?.whatItDoes ?? project.solution ?? project.description;
              const flowSteps = project.direct?.howItWorks ?? steps;
              const resultCopy = project.value ?? impact.clientBenefit ?? project.description;
              const tools = project.direct?.tools ?? project.stack;

              return (
                <div className="pd-explanation-stack">
                  <div className="pd-grid pd-explanation-grid">
                    <div className="pd-block">
                      <p className="pd-label">The Problem</p>
                      <p className="pd-para">{problemCopy}</p>
                    </div>
                    <div className="pd-block">
                      <p className="pd-label">The System</p>
                      <p className="pd-para">{systemCopy}</p>
                    </div>
                  </div>

                  <div className="pd-block pd-direct-section">
                    <p className="pd-label">The Flow</p>
                    <ol className="pd-steps wb-reveal" data-direction="right" data-intensity="soft" data-stagger="children">
                      {flowSteps.map((step, index) => (
                        <li key={step}>
                          <span className="pd-step-index">{String(index + 1).padStart(2, "0")}</span>
                          <span className="pd-step-copy">
                            <strong>{getFlowStepTitle(step)}</strong>
                            <small>{step}</small>
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="pd-grid pd-explanation-grid">
                    <div className="pd-block">
                      <p className="pd-label">The Result</p>
                      <p className="pd-para">{resultCopy}</p>
                    </div>
                    <div className="pd-block">
                      <p className="pd-label">Tools &amp; Technologies</p>
                      <ul className="ab-pills pd-tool-rail">
                        {tools.map((tool) => <li className="ab-pill" key={tool}>{cleanToolName(tool)}</li>)}
                      </ul>
                      <details className="pd-technical-depth">
                        <summary>Technical depth</summary>
                        <ul>
                          {project.stack.map((tool) => <li key={tool}>{tool}</li>)}
                        </ul>
                      </details>
                    </div>
                  </div>
                </div>
              );
            })()}

            {hasLivePreview ? (
              <section className="pd-live-preview" aria-label="Live AI terminal preview">
                <RagLivePreview
                  blockKey={`details-${block.key}`}
                  project={project}
                  ragQuery={ragQuery}
                  ragStage={ragStage}
                  ragStageIndex={ragStageIndex}
                  ragSources={ragSources}
                  onQueryChange={(value) => {
                    clearRagTimers();
                    setRagQuery(value);
                    setRagStage("idle");
                  }}
                  onRun={runRagPreview}
                />
              </section>
            ) : null}

            <nav className="pd-modal-nav" aria-label="Project navigation">
              <button type="button" onClick={() => { setActiveIndex((activeIndex - 1 + projectCount) % projectCount); resetRagPreview(); }}>
                <span aria-hidden="true">←</span> Previous project
              </button>
              <span>{String(activeIndex + 1).padStart(2, "0")} / {String(projectCount).padStart(2, "0")}</span>
              <button type="button" onClick={() => { setActiveIndex((activeIndex + 1) % projectCount); resetRagPreview(); }}>
                Next project <span aria-hidden="true">→</span>
              </button>
            </nav>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
