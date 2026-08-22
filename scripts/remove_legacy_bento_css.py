from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CSS_PATH = ROOT / "src" / "styles.css"
SMOOTH_PATH = ROOT / "src" / "components" / "SmoothLayer.tsx"

css = CSS_PATH.read_text(encoding="utf-8")


def remove_between(text: str, start: str, end: str, *, keep_end: bool = True) -> str:
    start_index = text.find(start)
    if start_index < 0:
        raise RuntimeError(f"start marker not found: {start[:80]!r}")
    end_index = text.find(end, start_index + len(start))
    if end_index < 0:
        raise RuntimeError(f"end marker not found: {end[:80]!r}")
    return text[:start_index] + (text[end_index:] if keep_end else text[end_index + len(end):])

# Remove the old What I Build card hover/layout stack. It is isolated between
# the legacy card comment and the next shared glass-chrome section.
css = remove_between(
    css,
    "/* What I Build: keep each card at its own intrinsic height",
    "/* ── Projects: three-panel dossier direction ───────────────────────────── */",
)

# Remove the dedicated Lightswind BentoGrid shell and card treatment.
css = remove_between(
    css,
    "/* Lightswind BentoGrid shell: layout only, so portfolio cards retain the charcoal system. */",
    "/* ============================================================\n   Lightswind SmoothCursor",
)

# Remove the final bento refinement and 3×3 cascade stack in one contiguous
# block immediately before the active CoolSlideGallery styles.
css = remove_between(
    css,
    ".wb2-bento-grid > .lightswind-bento-card:nth-child(n + 5) {",
    "/* What I build — seven-system CoolSlideGallery */",
)

CSS_PATH.write_text(css, encoding="utf-8")

smooth = SMOOTH_PATH.read_text(encoding="utf-8")
smooth_new = smooth.replace('      ".wb2-bento-card",\n', "")
if smooth_new == smooth:
    raise RuntimeError("SmoothLayer bento query marker not found")
SMOOTH_PATH.write_text(smooth_new, encoding="utf-8")

print("Removed isolated legacy bento CSS regions and the obsolete SmoothLayer query.")
