from pathlib import Path
import re
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
route = (ROOT / 'src/routes/index.tsx').read_text()
showcase = (ROOT / 'src/components/ProjectShowcase.tsx').read_text()
styles = (ROOT / 'src/styles.css').read_text()

print('PROJECT STRUCTURE')
project_blocks = re.findall(r'\{\s*index:\s*"(\d+)"[\s\S]*?(?=\n\s*\},\n\s*\{\s*index:|\n\s*\],\n\s*\},)', route)
print('project blocks detected:', len(project_blocks))
print('preview configs (ragPreview + n8nPreview):', len(re.findall(r'\b(?:ragPreview|n8nPreview):\s*\{', route)))
print('platform blocks:', re.findall(r'key:\s*"([^"]+)"', route))
print('view project details labels:', route.count('View Project Details') + showcase.count('View Project Details'))
print('legacy case-study labels:', route.count('Open Case Study') + showcase.count('Open Case Study'))
print('legacy n8n gate:', 'block.key === "n8n" && Boolean(preview)' in showcase)

print('\nSOURCE RISK SIGNALS')
important_count = styles.count('!important')
print('!important count:', important_count)
print('stylesheet lines:', len(styles.splitlines()))
print('horizontal overflow declarations:', len(re.findall(r'overflow-x\s*:', styles)))
print('prefers-reduced-motion blocks:', len(re.findall(r'prefers-reduced-motion', styles)))
print('fixed viewport heights:', len(re.findall(r'height\s*:\s*100vh', styles)))
print('clip declarations:', len(re.findall(r'overflow\s*:\s*clip', styles)))

print('\nLOCAL ASSET REFERENCES')
missing = []
for source in [ROOT / 'src/routes/index.tsx', ROOT / 'src/components/ProjectShowcase.tsx', ROOT / 'src/routes/__root.tsx']:
    text = source.read_text()
    for ref in re.findall(r"['\"](/[^'\"]+\.(?:png|jpg|jpeg|webp|avif|svg|ico|pdf))", text):
        if not (ROOT / 'public' / ref.lstrip('/')).exists():
            missing.append((str(source.relative_to(ROOT)), ref))
print('missing local refs:', missing if missing else 'none')

print('\nIMAGE DIMENSION OUTLIERS')
for path in sorted((ROOT / 'public').rglob('*')):
    if path.suffix.lower() not in {'.png', '.jpg', '.jpeg', '.webp', '.avif'}:
        continue
    try:
        with Image.open(path) as im:
            w, h = im.size
        if h > w * 3 or w > h * 5:
            print(path.relative_to(ROOT), w, h)
    except Exception:
        pass

print('\nACCESSIBILITY SOURCE SIGNALS')
print('buttons with aria-label:', len(re.findall(r'<button[^>]*aria-label=', route + showcase)))
print('images with alt:', len(re.findall(r'<img[^>]*\balt=', route + showcase)))
print('images without obvious alt:', len(re.findall(r'<img(?![^>]*\balt=)[^>]*>', route + showcase)))
print('dialogs:', len(re.findall(r'role=["\']dialog["\']', route + showcase)))
