from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CSS = ROOT / "src" / "styles.css"
SOURCE_FILES = [p for p in (ROOT / "src").rglob("*") if p.suffix in {".tsx", ".ts", ".jsx", ".js", ".html"}]

css_text = CSS.read_text(encoding="utf-8")
source_text = "\n".join(p.read_text(encoding="utf-8", errors="ignore") for p in SOURCE_FILES)

# Report only simple class selectors. Compound selectors are still conservative:
# a selector is considered used when every class token appears in source text.
selectors = sorted(set(re.findall(r"(?<![\\w-])\.([A-Za-z_][\w-]*)", css_text)))
rows = []
for name in selectors:
    occurrences = len(re.findall(rf"[\"'` ]{re.escape(name)}(?:[\"'` ]|$)", source_text))
    css_occurrences = len(re.findall(rf"\.{re.escape(name)}(?=[^\w-])", css_text))
    if occurrences == 0:
        rows.append((css_occurrences, name))

print(f"CSS bytes: {len(css_text.encode('utf-8'))}")
print(f"CSS lines: {css_text.count(chr(10)) + 1}")
print(f"Simple class selectors: {len(selectors)}")
print(f"Selectors with no literal source-token match: {len(rows)}")
print("css_occurrences\tselector")
for count, name in sorted(rows, reverse=True):
    print(f"{count}\t.{name}")
