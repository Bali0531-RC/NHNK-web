#!/usr/bin/env python3
"""Open Graph image for the site, built from real screenshots.

The previous og.png was an AI render of a campus with glowing circuitry, which
looks nothing like the app. This uses actual screens and the app's own colours.

    python3 tool/gen_og_image.py
"""

import pathlib

from PIL import Image, ImageDraw, ImageFilter, ImageFont

W, H = 1200, 630
BG = (14, 14, 16)
TEXT = (240, 240, 242)
MUTED = (150, 152, 156)
ACCENT = (140, 180, 188)

SANS = "/usr/share/fonts/noto/NotoSans-{}.ttf"
sans = lambda w, s: ImageFont.truetype(SANS.format(w), s)

ROOT = pathlib.Path(__file__).resolve().parent.parent
SHOTS = pathlib.Path.home() / "Documents" / "nhnk-play-assets"
OUT = ROOT / "public" / "og.png"

# Captured from the web demo at phone size, so there is no debug ribbon. This also
# cuts the demo mode banner, which would read as a disclaimer on a preview card.
CROP_TOP = 62
SHOT_H = 500

img = Image.new("RGBA", (W, H), BG + (255,))
glow = Image.new("RGBA", img.size, (0, 0, 0, 0))
ImageDraw.Draw(glow).ellipse([620, 120, 1320, 820], fill=(30, 62, 68, 120))
img.alpha_composite(glow.filter(ImageFilter.GaussianBlur(150)))

d = ImageDraw.Draw(img)

d.text((72, 118), "NHNK", font=sans("Black", 92), fill=TEXT)
d.text((76, 232), "Nem hivatalos Neptun kliens", font=sans("Bold", 34), fill=ACCENT)
d.text((76, 292), "Órarend, jegyek, üzenetek és befizetések\negy helyen, Androidon.",
       font=sans("Regular", 25), fill=MUTED, spacing=12)

d.line([(78, 400), (150, 400)], fill=(70, 74, 78), width=2)

for i, line in enumerate(["Nyílt forráskódú", "Reklám és követés nélkül", "Ingyenes"]):
    d.text((78, 432 + i * 36), line, font=sans("Regular", 23), fill=MUTED)

shots = [("og-shots/timetable.png", 690), ("og-shots/messages.png", 940)]
for name, x in shots:
    path = SHOTS / name
    if not path.exists():
        continue
    s = Image.open(path).convert("RGB")
    s = s.crop((0, CROP_TOP, s.width, s.height))
    w = int(s.width * SHOT_H / s.height)
    s = s.resize((w, SHOT_H), Image.LANCZOS)

    rounded = Image.new("L", (w, SHOT_H), 0)
    ImageDraw.Draw(rounded).rounded_rectangle([0, 0, w, SHOT_H], radius=18, fill=255)

    d.rounded_rectangle([x - 2, 63, x + w + 2, 65 + SHOT_H + 2], radius=20, fill=(46, 48, 52))
    img.paste(s, (x, 65), rounded)

img.convert("RGB").save(OUT, quality=95)
print("wrote", OUT)
