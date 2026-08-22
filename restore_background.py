from pathlib import Path

path = Path('/home/ubuntu/audit_project/gerome-umali-portfolio/src/styles.css')
text = path.read_text()
marker = '/* ============================================================\n   Signal Map canvas — authored technical traces'
start = text.find(marker)
if start == -1:
    raise SystemExit('Signal Map marker not found')

restored = '''/* ============================================================
   Editorial graphite canvas — localized technical texture
   Static, masked, and limited to the hero and Projects zones.
   ============================================================ */
:root:not(.light) .v-app {
  background: #111214;
}

:root:not(.light) .v-hero::before {
  content: "";
  position: absolute;
  z-index: -1;
  inset: -1.25rem 0;
  pointer-events: none;
  background-image: radial-gradient(rgba(178, 200, 205, .046) 1px, transparent 1px);
  background-position: center top;
  background-size: 28px 28px;
  -webkit-mask-image: radial-gradient(ellipse 70% 88% at 70% 50%, #000 0%, rgba(0, 0, 0, .78) 42%, transparent 100%);
  mask-image: radial-gradient(ellipse 70% 88% at 70% 50%, #000 0%, rgba(0, 0, 0, .78) 42%, transparent 100%);
}

:root:not(.light) .v-automation-reference-figure {
  position: relative;
  isolation: isolate;
  overflow: clip;
}

:root:not(.light) .v-automation-reference-figure::before {
  content: "";
  position: absolute;
  z-index: -1;
  inset: -20%;
  pointer-events: none;
  background: radial-gradient(ellipse 60% 60% at 50% 50%, rgba(120, 152, 141, .06), transparent 70%);
}

:root:not(.light) .ab-atlas-section {
  position: relative;
  isolation: isolate;
}

:root:not(.light) .ab-atlas-section::before {
  content: "";
  position: absolute;
  z-index: -1;
  inset: 0;
  pointer-events: none;
  background-image: radial-gradient(rgba(178, 200, 205, .034) 1px, transparent 1px);
  background-position: center top;
  background-size: 32px 32px;
  -webkit-mask-image: linear-gradient(to bottom, transparent 0%, #000 15%, #000 85%, transparent 100%);
  mask-image: linear-gradient(to bottom, transparent 0%, #000 15%, #000 85%, transparent 100%);
}
'''
path.write_text(text[:start].rstrip() + '\n\n' + restored)
print('Restored previous calibrated graphite background block.')
