from pathlib import Path
import re

css = (Path(__file__).resolve().parents[1] / "src" / "styles.css").read_text(encoding="utf-8")
marker = re.compile(r"(?:wb2-bento|lightswind-bento)")

# Lightweight brace scanner sufficient for reporting selector preambles.
start = 0
while True:
    open_idx = css.find("{", start)
    if open_idx < 0:
        break
    close_idx = css.find("}", open_idx + 1)
    if close_idx < 0:
        break
    prelude_start = css.rfind("}", 0, open_idx) + 1
    prelude = css[prelude_start:open_idx].strip()
    if marker.search(prelude):
        selectors = [part.strip() for part in prelude.split(",")]
        bento = [part for part in selectors if marker.search(part)]
        other = [part for part in selectors if not marker.search(part)]
        print(f"{prelude_start + 1}: bento={len(bento)} other={len(other)}")
        print("  " + prelude.replace("\n", " ")[:260])
    start = close_idx + 1
