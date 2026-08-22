# Spacious Hero Verification

Date: 2026-08-19

## Implementation

- Expanded the desktop hero into a wider two-column composition.
- Added larger desktop animation-stage width and height without changing the diagram's internal proportions.
- Increased the gap between the left copy and right automation graphic.
- Added additional vertical space to the hero section and animation stage.
- Preserved stacked behavior for smaller screens with increased row spacing and a taller mobile stage.
- Slowed SVG signal particles from approximately 2.8–3.7 seconds to approximately 5.4–7.0 seconds.
- Slowed the core breathing cycle to 9.6 seconds, the core ring cycle to 24 seconds, and status pulse to 4.8 seconds.
- Mirrored the final geometry in the SSR critical style block so the spacious composition is available on first paint.

## Live desktop check

At a 1280×1100 viewport:

- Hero: 1137×850.
- Left copy: x=45, width=380, height=458.
- Automation figure: x=540, width=680, height=814.
- Internal stage: width=612, height=666.
- Column gap: 115.2px.
- Computed motion durations: core breathe 9.6s, core ring 24s, status pulse 4.8s.
- Copy and animation bounds do not overlap.

## Build

`pnpm run build` passed successfully after the layout, critical SSR CSS, and motion timing changes.

## Notes

The red placeholder area was not added to the site; its intended space was converted into real hero breathing room. The diagram itself is enlarged through its container and stage, not distorted through non-uniform scaling.
