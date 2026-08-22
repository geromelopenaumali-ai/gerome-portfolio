# Projects Section Audit

## Current structure

The Projects section begins after What I Build and is organized into three platform-specific dossier blocks: n8n, Zapier, and Make. Each block contains a platform header, a project index tablist, a workflow screenshot window, project copy, an Open case study action, and a workflow process rail. The n8n block also contains an inline RAG/support live preview.

## Live content inventory

- n8n: 4 projects; RAG AI Agent is selected by default; live retrieval preview is present.
- Zapier: 3 projects; Content Repurposing is selected by default.
- Make: 2 projects; Gmail Attachment Intelligence & Filing is selected by default.
- The page also has a separate Featured Project section for AI Receptionist (Hazel) before the Projects section.

## Current visual observations

- The experience is functionally rich but vertically long and repetitive: every platform repeats the same dossier pattern (header, index, workflow window, copy, CTA, process rail).
- The platform grouping is clear, but the primary unit of attention is currently the platform rather than the project outcome or the system story.
- The project index lists are dense, especially n8n, and long titles compete with the actual case-study copy.
- The workflow screenshot window has a strong product/terminal frame, but the screenshot and narrative are separated into parallel regions rather than forming one clear story.
- The process rail contains useful information but behaves visually like a second navigation layer; it adds density without clearly showing the project’s result.
- “Active”, “Project Index”, platform toolbar chrome, and repeated platform metadata contribute to a dashboard/dossier feeling.
- The current section has a strong charcoal visual identity and good interaction depth, but it would benefit from a clearer editorial hierarchy, stronger outcome-first framing, and fewer repeated chrome elements.
- The responsive layout stacks the index, screenshot, copy, and live slot into a long sequence; this is usable but increases scroll fatigue on mobile.

## Recommended redesign constraint

Create a distinct editorial systems archive rather than another repeated platform dossier. Preserve the charcoal/terminal language, real workflow imagery, project case-study dialogs, and live previews, but make the project—not the platform—the primary object. Use one featured project lane plus a compact filterable project archive or rail, with platform labels as metadata instead of top-level sections.


## Project Atlas implementation verification

The live preview now renders a unified Projects archive with 09 project tabs and one active project canvas. The archive presents project title, platform metadata, and system type; the active canvas presents the selected system, outcome-oriented copy, TRIGGER / PROCESS / HANDOFF signature, workflow screenshot, case-study action, and preserved RAG live preview for the n8n project. Selecting the second archive tab changed the active canvas from RAG AI Agent to AI Customer Support Agent with Human Approval without leaving the section; the screenshot, copy, workflow signature, live preview label, and query placeholder updated accordingly. The build completed successfully with `pnpm run build` before live verification.


## Interaction verification

The active project case-study dialog opens correctly from the Atlas canvas, displays the selected project’s challenge, solution, workflow steps, tools, and workflow image, and closes back to the Atlas view. The preserved support live preview remains visible below the active project actions, with its query field and RUN control intact. The GoHighLevel archive notice is rendered as a compact coming-soon row rather than a repeated empty dossier.


## Preview-first reconstruction verification

The updated Project Atlas active canvas now renders in the requested order: the active project header is followed by the workflow preview, then the Open case study action, then the preserved live preview when available, and finally the explanation block with selected-system metadata, title, benefit description, and TRIGGER / PROCESS / HANDOFF signature. The live page exposes the workflow enlarge action, Open case study action, and RAG RUN control in the preview-first sequence. The production build passed after the reorder and spacing changes.
## Explanation + workflow inspection verification

The production build passed after tightening the bottom explanation block and adding workflow inspection hotspots. The live Project Atlas preview exposed seven accessible node buttons for the active RAG AI Agent workflow, each with an inspection label and `aria-pressed` state. Clicking the first node displayed the selected `NODE INSPECTION · TRIGGER` panel with `INPUT RECEIVED`, the node title `DOCUMENT INGESTION`, its step detail, and the workflow role. The full-size workflow screenshot button and `OPEN CASE STUDY` action remained available and the preview-first order was preserved.

The explanation block is now more spacious: wider text measure, improved body line height, stronger headline rhythm, and more generous system-signature row padding. Responsive and reduced-motion rules were included for the hotspot markers and inspector panel.

## Horizontal terminal preview audit

The live Project Atlas screenshot currently appears as a wide horizontal workflow composition inside the terminal workbench. The requested adjustment should therefore make the horizontal frame explicit and stable across project changes and responsive breakpoints, without altering the explanation-led canvas order.

## Horizontal composition correction — Aug 20, 2026

Live verification at a 1280px viewport confirms the Project Atlas terminal preview is horizontal again. The workflow shot measured 733 × 412 px with a 1.78 aspect ratio, matching 16:9. The workbench measured 735 × 484 px and spans the full Atlas canvas width; the explanation remains above it in the current explanation-led order. The Atlas child order remains: canvas top, intro, workbench, actions, live slot.

The correction removed the narrow desktop two-column override that was making the overall composition feel vertical, while preserving the horizontal terminal frame and responsive mobile stack.
