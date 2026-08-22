from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
src = root / "public" / "favicon-mark.png"
img = Image.open(src).convert("RGBA")

# Keep a generous square margin so the signal glyph remains legible at tab-icon sizes.
for size, filename in [(16, "favicon-16.png"), (32, "favicon-32.png"), (180, "apple-touch-icon.png"), (192, "icon-192.png"), (512, "icon-512.png")]:
    img.resize((size, size), Image.Resampling.LANCZOS).save(root / "public" / filename, optimize=True)

# ICO contains both common browser sizes.
img.save(root / "public" / "favicon.ico", format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
