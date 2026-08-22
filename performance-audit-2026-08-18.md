# Performance and cursor audit — 2026-08-18

The production build completed successfully after the cursor optimization.

Live page checks on the Vite preview:

- Enhanced cursor initialized: `document.documentElement.dataset.cursorEnhanced === "true"`.
- Custom terminal cursor prompt exists and responds to a dispatched pointer move with `data-visible="true"`.
- Native cursor is hidden only after enhanced cursor initialization, preventing a blank cursor if initialization fails.
- Lenis root class is present.
- Rapid synthetic wheel burst moved the page from `scrollY=0` to `scrollY=6652`.
- Document height remained `7752px` during the audit.
- Cumulative layout shift score was `0.0000` with `0` layout-shift entries.
- Two long-task entries were observed during the audit; no runtime error output was present.
- Scroll-to-top regression passed: `scrollY=6652` returned to `scrollY=0` after clicking the Back to Top button through Lenis.
- Three BorderBeam elements and four workflow enlarge controls were present.

Implementation changes:

- SmoothCursor now schedules animation frames only while the pointer is moving or returning off-page instead of running an unconditional RAF loop.
- Cursor initialization sets `data-cursor-enhanced` on the document root; cleanup removes it.
- Native `cursor: none` is gated on that root data attribute.
- Pointer cancellation and window blur reset pressed state, with complete event cleanup.
- Cursor transform CSS no longer transitions the transform property, avoiding compounded lag on top of the RAF interpolation.
