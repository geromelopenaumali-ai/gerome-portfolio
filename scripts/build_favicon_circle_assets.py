from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter

root = Path(__file__).resolve().parents[1]
source_path = root / "public" / "favicon-g-mark.png"
active_path = root / "public" / "favicon-mark.png"

source = Image.open(source_path).convert("RGB")
source = source.resize((1024, 1024), Image.Resampling.LANCZOS)

# Separate the light G signal from the generated dark square background.
# The source mark is substantially brighter than its charcoal background.
gray = source.convert("L")
alpha = gray.point(lambda value: max(0, min(255, int((value - 28) * 255 / 92))))
alpha = alpha.filter(ImageFilter.GaussianBlur(0.35))

signal = source.convert("RGBA")
signal.putalpha(alpha)
box = alpha.getbbox()
if box is None:
    raise RuntimeError("The G mark could not be separated from its source background")
signal = signal.crop(box)

canvas_size = 1024
canvas = Image.new("RGBA", (canvas_size, canvas_size), (0, 0, 0, 0))
draw = ImageDraw.Draw(canvas)

# Circular terminal surface with a quiet sage-gray rim.
outer = 76
inner = outer + 3
draw.ellipse((outer, outer, canvas_size - outer, canvas_size - outer), fill=(34, 38, 40, 255))
draw.ellipse((inner, inner, canvas_size - inner, canvas_size - inner), outline=(120, 152, 141, 105), width=3)

# Scale the signal to sit comfortably inside the circle at small sizes.
max_signal = int(canvas_size * 0.68)
scale = min(max_signal / signal.width, max_signal / signal.height)
signal = signal.resize((max(1, round(signal.width * scale)), max(1, round(signal.height * scale))), Image.Resampling.LANCZOS)
position = ((canvas_size - signal.width) // 2, (canvas_size - signal.height) // 2)
canvas.alpha_composite(signal, position)

canvas.save(active_path, optimize=True)

for size, filename in [
    (16, "favicon-16.png"),
    (32, "favicon-32.png"),
    (180, "apple-touch-icon.png"),
    (192, "icon-192.png"),
    (512, "icon-512.png"),
]:
    canvas.resize((size, size), Image.Resampling.LANCZOS).save(root / "public" / filename, optimize=True)

canvas.save(root / "public" / "favicon.ico", format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
