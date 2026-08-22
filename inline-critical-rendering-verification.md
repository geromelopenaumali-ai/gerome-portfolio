# Inline Critical Rendering Verification

Date: 2026-08-20

## Implementation

A compact critical CSS block for the hero automation diagram was added to `src/routes/__root.tsx` inside the SSR document shell, before the normal stylesheet links. It covers the diagram shell, deterministic stage geometry, cards, AI core, connector layer, responsive desktop/mobile flow selection, and reduced-motion rules.

The automation SVG was not moved into `<head>`, because SVG placed in the document head is not a reliable render surface. The SVG is already emitted as inline SVG markup in the server-rendered `<body>`, which is the correct zero-request path for the graphic itself.

## Verification

- `pnpm run build` passed successfully.
- Raw SSR response contained one inline `<style>` block with the control-room critical selectors.
- Raw SSR response contained both desktop and mobile inline SVG flow layers.
- Live document after load: critical style present in `<head>` with approximately 5.9 KB of CSS.
- Live document: 13 desktop connector paths and 13 mobile connector paths present.
- Connector flow computed opacity: `1`.
- Connector flow computed transition: `none`.
- AI core breathing animation remained active after load.
- No layout/effects/loading gate attributes were present on the control-room root.
- Hard refresh preserved the same inline head style, SVG markup, visible connectors, and animation behavior.

## Trade-off

Inlining the critical block removes stylesheet-request dependence for the first hero paint, but duplicates a small amount of hero CSS in the HTML. The full stylesheet remains responsible for the rest of the site and final cascade. Moving SVG into the head would not improve rendering and would be invalid as a dependable document-head strategy, so the SVG remains inline in the body where it can paint immediately.

## Preview

https://4183-in6c5oavpe8uz6rudhxc5-436cab69.us4.manus.computer/

