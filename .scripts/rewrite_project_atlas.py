from pathlib import Path

path = Path('/home/ubuntu/audit_project/gerome-umali-portfolio/src/components/ProjectShowcase.tsx')
source = path.read_text()
marker = 'export function ProjectShowcase({'
prefix = source.split(marker, 1)[0]
replacement = r'''export function ProjectShowcase({
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

  const clearRagTimers = () => {
    ragTimersRef.current.forEach((timer) => window.clearTimeout(timer));
    ragTimersRef.current = [];
  };

  useEffect(() => () => clearRagTimers(), []);
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
  const hasLivePreview = block.key === "n8n" && Boolean(preview);
  const ragStageIndex = { idle: 0, searching: 1, retrieved: 2, answered: 3 }[ragStage];
  const ragSources = preview?.source.split("→").map((item) => item.trim()).filter(Boolean) ?? [];
  const projectCount = atlasProjects.length;
  const projectId = `${block.key}-${project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

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
                    <span className="ab-atlas-item-meta">{itemBlock.name} · {item.node ?? "automation system"}</span>
                  </span>
                  <span className="ab-atlas-item-marker" aria-hidden="true">↗</span>
                </button>
              );
            })}
          </div>
          <div className="ab-atlas-archive-foot">
            <span>Platform is metadata.</span>
            <span>Outcome is the system.</span>
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
              <span>{block.name} / {project.node ?? "connected system"}</span>
            </div>
            <div className="ab-atlas-state">ACTIVE <i aria-hidden="true" /></div>
          </div>

          <div className="ab-atlas-intro">
            <div className="ab-atlas-intro-copy">
              <p className="ab-atlas-project-meta">Selected system · {String(activeIndex + 1).padStart(2, "0")} / {String(projectCount).padStart(2, "0")}</p>
              <h3 className="ab-atlas-headline">{project.title}</h3>
              <p className="ab-atlas-body">{impact.clientBenefit || project.description}</p>
            </div>
            <div className="ab-atlas-signature" aria-label="System signature">
              {processItems.map((step, index) => (
                <div className="ab-atlas-signature-item" key={`${project.title}-${step}`}>
                  <span>{index === 0 ? "TRIGGER" : index === 1 ? "PROCESS" : "HANDOFF"}</span>
                  <strong>{shortProcessLabel(step, index)}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="ab-atlas-workbench">
            <div className="ab-atlas-window-bar">
              <span className="ab-dot" /><span className="ab-dot" /><span className="ab-dot" />
              <span>{block.name.toLowerCase()} · {project.title.toLowerCase().replace(/\s+/g, "-")}</span>
              <span className="ab-atlas-window-state">SYSTEM READY</span>
            </div>
            {shot ? (
              <button
                type="button"
                className="ab-atlas-shot"
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
                <span className="ab-shot-hint">click to enlarge</span>
              </button>
            ) : (
              <div className="ab-atlas-empty">Workflow visual coming soon.</div>
            )}
            <div className="ab-atlas-workbench-foot"><span>Workflow canvas</span><span>{project.stack.slice(0, 4).join(" · ")}</span></div>
          </div>

          <div className="ab-atlas-actions">
            <MagneticButton type="button" className="ab-dossier-open" strength={0.12} onClick={() => setDetail(true)}>
              <span className="ab-dossier-open-label">Open case study</span>
              <span aria-hidden="true">→</span>
              <BorderBeam size={42} duration={5.5} borderWidth={1} color={["#9b9b9b", "#ffffff"]} />
            </MagneticButton>
            <span className="ab-atlas-action-note">Inspect the trigger, decision, and next action.</span>
          </div>

          {hasLivePreview ? (
            <div className="ab-atlas-live-slot">
              <RagLivePreview
                blockKey={`atlas-${block.key}`}
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
            </div>
          ) : null}
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
        <DialogContent className="pd-modal">
          <DialogHeader>
            <div className="pd-kicker">{block.name} · {project.index} · case study</div>
            <DialogTitle className="pd-title">{project.title}</DialogTitle>
            <DialogDescription className="pd-lede">{project.direct?.whatItDoes ?? impact.clientBenefit}</DialogDescription>
          </DialogHeader>

          <div className="pd-body">
            {project.direct ? (
              <div className="pd-block pd-direct-section">
                <p className="pd-label">How it works</p>
                <ol className="pd-steps">
                  {project.direct.howItWorks.map((step, index) => (
                    <li key={step}><span>{String(index + 1).padStart(2, "0")}</span>{step}</li>
                  ))}
                </ol>
              </div>
            ) : <p className="pd-para">{project.description}</p>}

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

            {project.direct ? (
              <div className="pd-grid">
                <div className="pd-block">
                  <p className="pd-label">What problem it solves</p>
                  <p className="pd-para">{project.direct.problemSolved}</p>
                </div>
                <div className="pd-block">
                  <p className="pd-label">Tools used</p>
                  <ul className="ab-pills">
                    {project.direct.tools.map((tool) => <li className="ab-pill" key={tool}>{tool}</li>)}
                  </ul>
                </div>
              </div>
            ) : project.challenge || project.solution ? (
              <div className="pd-grid">
                {project.challenge ? (
                  <div className="pd-block">
                    <p className="pd-label">Challenge</p>
                    <p className="pd-para">{project.challenge}</p>
                  </div>
                ) : null}
                {project.solution ? (
                  <div className="pd-block">
                    <p className="pd-label">Solution</p>
                    <p className="pd-para">{project.solution}</p>
                  </div>
                ) : null}
              </div>
            ) : null}

            {!project.direct && steps.length ? (
              <div className="pd-block">
                <p className="pd-label">Workflow Steps</p>
                <ol className="pd-steps wb-reveal" data-direction="right" data-intensity="soft" data-stagger="children">
                  {steps.map((step, index) => (
                    <li key={step}><span>{String(index + 1).padStart(2, "0")}</span>{step}</li>
                  ))}
                </ol>
              </div>
            ) : null}

            {!project.direct ? (
              <div className="pd-grid">
                {project.value || impact.purpose ? (
                  <div className="pd-block">
                    <p className="pd-label">Value</p>
                    {project.value ? <p className="pd-para">{project.value}</p> : <ul className="pd-list">{impact.purpose?.map((purpose) => <li key={purpose}>{purpose}</li>)}</ul>}
                  </div>
                ) : null}
                <div className="pd-block">
                  <p className="pd-label">Tools &amp; Technologies</p>
                  <ul className="ab-pills">
                    {project.stack.map((stackItem) => <li className="ab-pill" key={stackItem}>{stackItem}</li>)}
                  </ul>
                </div>
              </div>
            ) : null}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
'''
path.write_text(prefix + replacement)
