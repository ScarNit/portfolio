import sys
from PIL import Image, ImageDraw, ImageFont

root = sys.argv[1]
W, H = 1200, 630
INK, PANEL, LINE, BONE, DIM, TORCH = "#0e0c0a", "#171410", "#2c261d", "#efe8da", "#a89d86", "#ffb224"
F = "/System/Library/Fonts/Supplemental/"
bold = lambda s: ImageFont.truetype(F + "Arial Bold.ttf", s)
reg = lambda s: ImageFont.truetype(F + "Arial.ttf", s)

img = Image.new("RGB", (W, H), INK)
d = ImageDraw.Draw(img)
for x in range(0, W, 40):
    d.line([(x, 0), (x, H)], fill="#14110e")
for y in range(0, H, 40):
    d.line([(0, y), (W, y)], fill="#14110e")

# left: text
x0 = 64
d.rectangle([x0, 96, x0 + 12, 108], fill=TORCH)
d.text((x0 + 24, 91), "GAME DEVELOPER  ·  UNITY + C#", font=bold(20), fill=TORCH)
d.text((x0 - 4, 132), "Tin Škarpa", font=bold(92), fill=BONE)
d.text((x0, 262), "I design, build and ship", font=bold(38), fill=BONE)
d.text((x0, 310), "games in Unity and C#.", font=bold(38), fill=BONE)
d.text((x0, 384), "Four games released as ScarNit.", font=reg(26), fill=DIM)
d.text((x0, 420), "CS student at FER Zagreb.", font=reg(26), fill=DIM)
# button-like URL chip with hard shadow
label = "scarnit.github.io/portfolio"
tw = d.textlength(label, font=bold(24))
bx, by = x0, 500
d.rectangle([bx + 6, by + 6, bx + tw + 46, by + 62], fill="#7a5200")
d.rectangle([bx, by, bx + tw + 40, by + 56], fill=TORCH)
d.text((bx + 20, by + 14), label, font=bold(24), fill=INK)

# right: 2x2 screenshots
shots = ["try.png", "lucky-seven.png", "last-stand.jpg", "attack-on-samurai.jpg"]
cw, ch, gap = 250, 150, 18
gx, gy = W - 64 - (cw * 2 + gap), (H - (ch * 2 + gap)) // 2
accents = ["#ffb224", "#3fcf8e", "#9db552", "#f0524f"]
for i, name in enumerate(shots):
    s = Image.open(f"{root}/public/media/{name}").convert("RGB")
    # centre-crop to the tile's aspect ratio
    target = cw / ch
    w, h = s.size
    if w / h > target:
        nw = int(h * target); s = s.crop(((w - nw) // 2, 0, (w - nw) // 2 + nw, h))
    else:
        nh = int(w / target); s = s.crop((0, (h - nh) // 2, w, (h - nh) // 2 + nh))
    s = s.resize((cw, ch), Image.LANCZOS)
    px, py = gx + (i % 2) * (cw + gap), gy + (i // 2) * (ch + gap)
    d.rectangle([px + 6, py + 6, px + cw + 9, py + ch + 9], fill=LINE)
    img.paste(s, (px, py))
    d.rectangle([px - 3, py - 3, px + cw + 2, py + ch + 2], outline=accents[i], width=3)

img.save(f"{root}/public/og.png", optimize=True)
print("ok")
