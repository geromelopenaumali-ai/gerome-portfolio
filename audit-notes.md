# Portfolio audit notes

## Live baseline — 2026-08-22

- Preview URL: https://4183-in6c5oavpe8uz6rudhxc5-436cab69.us4.manus.computer/#projects
- Desktop viewport observed by browser: 892 × 768.
- The Projects archive exposes 9 project tabs: 4 n8n, 2 Make, and 3 Zapier.
- The Make project “Gmail Attachment Intelligence & Filing” opens the existing project detail modal.
- Its modal includes a horizontal terminal preview with label “ATTACHMENT ROUTER / LIVE PREVIEW”, a text input, RUN action, file trace, and answer-ready state after the interaction. No obvious horizontal overflow was visible at the inspected desktop viewport.
- The detail modal uses an internal scroll region; lower content including the terminal preview is reached by scrolling within the modal. This is expected behavior, but needs mobile verification.
- The existing archive layout and project content remain unchanged in the live baseline.
- The browser screenshot overlays numbered annotation boxes; these are browser inspection markers, not site UI.
- One interaction attempt on the modal close control did not close it until using the visible top-right coordinate; this may be an inspection targeting issue rather than a site defect and should be confirmed with keyboard/DOM checks.
- Need to continue with Zapier preview, n8n regression, responsive viewports, automated checks, and console/accessibility inspection.

## Platform preview regression check

The Zapier project “Content Repurposing” also opens the same detail modal and exposes a horizontal terminal preview labeled “CONTENT ROUTER / LIVE PREVIEW”. Its input placeholder, RUN control, and lower trace area are present. At the inspected desktop viewport, the terminal fits inside the modal width with no visible horizontal overflow. The modal’s internal scroll reaches the terminal cleanly. The preview label, prompt, input, and action remain readable in the dark terminal treatment.

## Confirmed defect and fix

The Experience certificate dialog contained a broken `/certificate-top-agent.jpg` reference. Live inspection showed the dialog rendering the browser’s broken-image state, so this was a real user-visible defect rather than a false-positive source scan. No matching certificate artwork existed in the repository or the supplied portfolio archive. The image was replaced with an accessible certificate record panel using the existing verified award title and description; no new metrics or claims were introduced.

Post-fix verification passed: `pnpm run typecheck`, `pnpm run build`, and the structural audit. The audit now reports 9 preview configs, no legacy n8n-only gate, no legacy “Open Case Study” copy, and no missing local asset references. The stylesheet remains large at 11,193 lines with 1,223 `!important` tokens; this is a maintainability concern but was not refactored during this bounded defect-fix pass because the user asked for a full check, not a redesign or broad stylesheet rewrite.

## Responsive capture note

The first headless screenshots at desktop, tablet, and mobile sizes were solid charcoal because the capture tool did not paint the client-rendered page, even after a virtual-time wait. This is not treated as a site defect: the same headless run produced a hydrated DOM containing the page title and “Gerome Umali”, while the interactive browser session rendered the site correctly. The live browser DOM measured `scrollWidth === clientWidth` (1,265px), and the certificate dialog measured 768px wide with matching client and scroll widths and no broken images after the fix. A dedicated browser automation package was not present for a separate multi-viewport run.

## Cross-platform live interaction check

The existing n8n RAG AI Agent modal still opens with the same horizontal terminal preview, input, RUN control, technical-depth content, and project navigation. Clicking RUN visibly advances the terminal from its initial state to the answer-ready state, with the retrieval trace and grounded answer area remaining inside the modal’s scrollable content region. No modal-level horizontal overflow was visible in this check.

The Make Gmail Attachment Intelligence & Filing project opens correctly in the same details modal. Its platform label, title, at-a-glance facts, workflow image, and input prompt are readable in the live desktop check; the terminal preview exposes the expected `TEST AN INCOMING ATTACHMENT` prompt, input, and RUN control.

## Final release verification — 2026-08-22

The final `pnpm run check` completed successfully after the audit and certificate repair: TypeScript validation passed and the production build completed successfully. No further code changes were required after the live Make, Zapier, and n8n regression checks.
