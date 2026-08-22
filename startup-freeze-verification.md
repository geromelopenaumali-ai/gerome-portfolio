# Hero Startup-Freeze Verification

## Fix

Removed obsolete portrait preload, hero sweep RAF state, and portrait-only startup/parallax work. Ambient control-room loops now begin from visibly active mid-cycle phases instead of starting at their visually static zero-motion frames.

The SSR critical CSS and external stylesheet both carry synchronized phase offsets:

- Core breathing: `animation-delay: -2.8s`
- Core ring rotation: `animation-delay: -6.5s`
- Status pulse: `animation-delay: -1.3s`

The external rules use `!important` to prevent later animation shorthand declarations from resetting the offsets. Reduced-motion overrides reset the delays and disable nonessential motion.

## Verification

- Production build: passed with `pnpm run build`.
- Fresh preview load: core orbit, core ring, and status pulse reported `animationPlayState: running` with the negative phase offsets applied.
- Hard refresh: same active phase offsets remained applied immediately after reload.
- Static rendering: connector layer remained visible with opacity `1`; no rendering gate was added.
- Fresh DOM timing: `DOMContentLoaded` remained approximately 271 ms in the live check.

## Preview

https://4183-in6c5oavpe8uz6rudhxc5-436cab69.us4.manus.computer/

## Scope

No diagram geometry, card positions, colors, typography, or connection structure were changed.

