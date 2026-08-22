from PIL import Image, ImageDraw, ImageFont, ImageEnhance
from pathlib import Path

root = Path('/home/ubuntu/audit_project/gerome-umali-portfolio')
before = Image.open(root / '.comparison-before.webp').convert('RGB')
after = Image.open(root / '.comparison-after.webp').convert('RGB')

if before.size != after.size:
    after = after.resize(before.size)

font_path = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
small_path = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
font = ImageFont.truetype(font_path, 22)
small = ImageFont.truetype(small_path, 16)
label = ImageFont.truetype(font_path, 18)

W, H = before.size
gap = 24
header = 66
crop_y = 90
crop_box = (0, crop_y, W, min(H, 210))
b_crop = before.crop(crop_box).resize((W * 2, (crop_box[3] - crop_box[1]) * 2))
a_crop = after.crop(crop_box).resize((W * 2, (crop_box[3] - crop_box[1]) * 2))

canvas_w = W * 2 + gap
canvas_h = header + H + 48 + b_crop.height + 72
canvas = Image.new('RGB', (canvas_w, canvas_h), '#0b0c0e')
draw = ImageDraw.Draw(canvas)

def draw_panel(img, x, y, title, subtitle):
    canvas.paste(img, (x, y))
    draw.rectangle((x, y, x + img.width - 1, y + img.height - 1), outline='#45484c', width=1)
    draw.text((x + 14, y + 12), title, fill='#f0f2f3', font=font)
    draw.text((x + 14, y + 42), subtitle, fill='#a9b0b4', font=small)

draw.text((24, 19), 'Editorial graphite canvas — before / after', fill='#f0f2f3', font=font)
draw.text((24, 47), 'Same viewport and layout. The comparison isolates the page background treatment only.', fill='#9ba2a6', font=small)

draw_panel(before, 0, header, 'BEFORE', 'Full-page 44px technical grid · #202020 base')
draw_panel(after, W + gap, header, 'AFTER', 'Localized dot texture · #111214 graphite base')

crop_top = header + H + 48
draw.text((24, crop_top - 30), 'Hero background detail — enlarged 2×', fill='#c8ced1', font=label)
draw_panel(b_crop, 0, crop_top, 'BEFORE DETAIL', 'Grid continues through the entire page')
draw_panel(a_crop, W + gap, crop_top, 'AFTER DETAIL', 'Texture is localized and masked toward the edges')

footer_y = canvas_h - 48
draw.line((24, footer_y - 14, canvas_w - 24, footer_y - 14), fill='#292d31', width=1)
draw.text((24, footer_y), 'No background animation was added. Contact remains intentionally plain.', fill='#9ba2a6', font=small)

out = root / 'background-before-after-comparison.png'
canvas.save(out, optimize=True)
print(out)
