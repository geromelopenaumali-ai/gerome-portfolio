# Hero diagram centering audit

The current hero automation SVG uses a 1000 × 500 viewBox and renders at approximately 629 × 315 CSS pixels in the live desktop preview. The visual wrapper is 629 × 500 CSS pixels, so the SVG is vertically centered within a taller visual area.

Measured stage-title centers in viewBox coordinates:

| Stage | Center X |
|---|---:|
| INPUT | 149 |
| AI LAYER | 418 |
| WORKFLOW | 660 |
| OUTPUT | 873 |

The main card content spans approximately x=24 to x=958, with a midpoint of x=491. The overall viewBox midpoint is x=500. The AI core center is x=418, so the central decision core sits left of the full composition midpoint. The large 250-unit input cards also create more visual mass on the left than the narrower workflow/output cards.

The centering adjustment should therefore be targeted: visually recenter the stage rhythm and AI core relative to the whole composition without changing connector endpoints independently or shrinking the diagram. Avoid center-aligning all card copy, since the current left-aligned card text is appropriate for scanning and terminal-style node labels.

Source: live preview measurement on Aug 20, 2026.

## Post-change verification

The refreshed preview reports stage centers of INPUT 149, AI LAYER 450, WORKFLOW 680, and OUTPUT 893. The main content midpoint is approximately 501. Workflow spans x=600–760 and output spans x=808–978. All 13 connector base paths are present, so the recentering did not remove the connector layer or leave missing geometry.
