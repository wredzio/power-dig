import base64, io, json, re, sys
import pymupdf as fitz
from PIL import Image

PDF = "/Users/wojciech/Documents/project2026/power-dig/assets/brand/logo-source.pdf"
OUT = "."
doc = fitz.open(PDF); page = doc[0]
ext = page.get_drawings(extended=True)

def fmt(v): return ("%.2f" % v).rstrip("0").rstrip(".")
def pt(p): return f"{fmt(p.x)} {fmt(p.y)}"

def items_to_path(items, close=True):
    d = []; cur = None; start = None
    for it in items:
        kind = it[0]
        if kind == "l":
            p1, p2 = it[1], it[2]
            if cur is None or abs(cur.x - p1.x) > 0.01 or abs(cur.y - p1.y) > 0.01:
                if close and start is not None: d.append("Z")
                d.append(f"M{pt(p1)}"); start = p1
            d.append(f"L{pt(p2)}"); cur = p2
        elif kind == "c":
            p1, p2, p3, p4 = it[1], it[2], it[3], it[4]
            if cur is None or abs(cur.x - p1.x) > 0.01 or abs(cur.y - p1.y) > 0.01:
                if close and start is not None: d.append("Z")
                d.append(f"M{pt(p1)}"); start = p1
            d.append(f"C{pt(p2)} {pt(p3)} {pt(p4)}"); cur = p4
        elif kind == "re":
            r = it[1]
            if close and start is not None: d.append("Z")
            d.append(f"M{fmt(r.x0)} {fmt(r.y0)}H{fmt(r.x1)}V{fmt(r.y1)}H{fmt(r.x0)}Z"); cur = None; start = None
        elif kind == "qu":
            q = it[1]
            if close and start is not None: d.append("Z")
            d.append(f"M{pt(q.ul)}L{pt(q.ur)}L{pt(q.lr)}L{pt(q.ll)}Z"); cur = None; start = None
    if close and start is not None: d.append("Z")
    return "".join(d)

def hexcol(c): return "#%02x%02x%02x" % tuple(round(v * 255) for v in c)

house = ext[1]; idot = ext[5]
clips = [d for d in ext if d["type"] == "clip"]
wordmark = [c for c in clips if c["scissor"].width > 600][0]       # "PowerDig" letters
bolt = [c for c in clips if c["scissor"].height > 400][0]          # lightning bolt
pbowl = [c for c in clips if c not in (wordmark, bolt)][0]         # bowl of the P

# Sample gradient colours from MuPDF's rasterised shading (raw svg image for the wordmark)
raw = page.get_svg_image(text_as_path=True); open("full-raw.svg", "w").write(raw)
imgs = re.findall(r'<image x="([\d.]+)" y="([\d.]+)" width="([\d.]+)" height="([\d.]+)" xlink:href="data:image/png;base64,([^"]+)"', raw)
def sample(b64):
    im = Image.open(io.BytesIO(base64.b64decode(b64))).convert("RGBA")
    px = im.load(); w, h = im.size
    cols = {}
    for x in range(w):
        col = [px[x, y] for y in range(h) if px[x, y][3] > 200]
        if col: cols[x] = tuple(sum(c[i] for c in col) // len(col) for i in range(3))
    xs = sorted(cols); return cols[xs[0]], cols[xs[-1]], (im.size)
samples = {int(float(x)): sample(b) for x, y, w, h, b in imgs}
wm_left, wm_right, wm_size = samples[602]
bolt_left, bolt_right, _ = samples[440] if 440 in samples else samples[441]
print("wordmark gradient:", "#%02x%02x%02x" % wm_left, "->", "#%02x%02x%02x" % wm_right, "raster", wm_size)
print("bolt gradient:", "#%02x%02x%02x" % bolt_left, "->", "#%02x%02x%02x" % bolt_right)
g_from = "#%02x%02x%02x" % wm_left; g_to = "#%02x%02x%02x" % wm_right

# Geometry
house_d = items_to_path(house["items"], close=False)
house_stroke = hexcol(house["color"]); house_w = house["width"]
join = {0: "miter", 1: "round", 2: "bevel"}.get(house.get("lineJoin", 0), "miter")
cap = {0: "butt", 1: "round", 2: "square"}.get(house.get("lineCap", (0,))[0] if isinstance(house.get("lineCap"), tuple) else house.get("lineCap", 0), "butt")
wm_d = items_to_path(wordmark["items"]); bolt_d = items_to_path(bolt["items"]); pb_d = items_to_path(pbowl["items"])
idot_d = items_to_path(idot["items"]); idot_fill = hexcol(idot["fill"])

# Text glyphs from MuPDF svg (defs + uses), background/images/clips removed
defs = re.search(r"<defs>(.*?)</defs>", raw, re.S).group(1)
defs = re.sub(r"<clipPath.*?</clipPath>", "", defs, flags=re.S)
body = raw[raw.index("</defs>") + 7 : raw.rindex("</svg>")]
body = re.sub(r"<image[^>]*/>", "", body)
body = re.sub(r'\s(inkscape|sodipodi):[a-zA-Z-]+="[^"]*"', "", body)
defs = re.sub(r'\s(inkscape|sodipodi):[a-zA-Z-]+="[^"]*"', "", defs)
body = re.sub(r"<clipPath.*?</clipPath>", "", body, flags=re.S)
body = re.sub(r'<path[^>]*fill="#ffffff"[^>]*/>', "", body)                 # white background
body = re.sub(r'<g clip-path="[^"]*">\s*</g>', "", body)
body = re.sub(r'<g[^>]*>\s*</g>', "", body)
# the house is already a vector path in body (stroke), keep it; drop nothing else
text_uses = re.findall(r"<use [^>]*/>", body)
print("glyph uses:", len(text_uses), "| body has house path:", 'stroke="%s"' % house_stroke in body or house_stroke in body)

# Crop box: everything that is drawn
rects = [house["rect"], idot["rect"], wordmark["scissor"], bolt["scissor"], pbowl["scissor"]]
for b in page.get_text("dict")["blocks"]:
    for l in b.get("lines", []):
        for s in l["spans"]:
            if s["text"].strip(): rects.append(fitz.Rect(s["bbox"]))
bb = rects[0]
for r in rects[1:]: bb |= r
pad = house_w / 2 + 12
vb = (bb.x0 - pad, bb.y0 - pad, bb.width + 2 * pad, bb.height + 2 * pad)
print("viewBox:", [round(v) for v in vb])

grad = f'<linearGradient id="pdg" gradientUnits="userSpaceOnUse" x1="{fmt(wordmark["scissor"].x0)}" y1="0" x2="{fmt(wordmark["scissor"].x1)}" y2="0"><stop offset="0" stop-color="{g_from}"/><stop offset="1" stop-color="{g_to}"/></linearGradient>'
bolt_grad = f'<linearGradient id="pdb" gradientUnits="userSpaceOnUse" x1="{fmt(bolt["scissor"].x0)}" y1="0" x2="{fmt(pbowl["scissor"].x1)}" y2="0"><stop offset="0" stop-color="#%02x%02x%02x"/><stop offset="1" stop-color="#%02x%02x%02x"/></linearGradient>' % (bolt_left + bolt_right)
vector = (f'<path d="{house_d}" fill="none" stroke="{house_stroke}" stroke-width="{fmt(house_w)}" stroke-linejoin="{join}" stroke-linecap="{cap}"/>'
          f'<path d="{bolt_d}" fill="url(#pdb)"/><path d="{pb_d}" fill="url(#pdb)"/>'
          f'<path d="{wm_d}" fill="url(#pdg)"/><path d="{idot_d}" fill="{idot_fill}"/>')
# remove MuPDF's own house path from body (we re-emit it with explicit joins) – it is the only stroked path there
stroked = re.findall(r'<path[^>]*stroke="[^"]*"[^>]*/>', body)
print("stroked paths removed from body:", len(stroked), [re.search(r'stroke="([^"]*)"', x).group(1) for x in stroked])
body_text = re.sub(r'<path[^>]*stroke="[^"]*"[^>]*/>', "", body)
print("remaining tags in body:", sorted(set(re.findall(r"<(\w+)", body_text))))

body_text = re.sub(r"<path[^>]*/>", "", body_text)  # only glyph <use> elements stay; vector parts are re-emitted above
name_uses = re.findall(r'<use [^>]*fill="#d68136"[^>]*/>', body_text)
print("owner-name glyphs:", len(name_uses))
rects_compact = [r for r in rects if not (r.y0 > 400 and r.y1 < 480)]  # drop the DANIEL GŁOGOWSKI line
bbc = rects_compact[0]
for r in rects_compact[1:]: bbc |= r
vb_compact = (bbc.x0 - pad, bbc.y0 - pad, bbc.width + 2 * pad, bbc.height + 2 * pad)
print("compact viewBox:", [round(v) for v in vb_compact])
def full_svg(serwis_color, include_name=True, box=None):
    box = box or vb
    b = re.sub(r'fill="#0d0b0d"', f'fill="{serwis_color}"', body_text)
    if not include_name:
        b = re.sub(r'<use [^>]*fill="#d68136"[^>]*/>', "", b)
    b = re.sub(r">\s+<", "><", b).strip()
    label = "PowerDig Serwis Daniel Głogowski" if include_name else "PowerDig Serwis"
    return (f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="{" ".join(fmt(v) for v in box)}" role="img" aria-label="{label}">'
            f'<defs>{grad}{bolt_grad}{defs}</defs>{vector}{b}</svg>')
open(f"{OUT}/logo-light.svg", "w").write(full_svg("#111111"))
open(f"{OUT}/logo-dark.svg", "w").write(full_svg("#F5F0E8"))

# Mark: bolt + P bowl only
mb = bolt["scissor"] | pbowl["scissor"]; mpad = 6
mvb = (mb.x0 - mpad, mb.y0 - mpad, mb.width + 2 * mpad, mb.height + 2 * mpad)
mark = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{" ".join(fmt(v) for v in mvb)}"><defs>{bolt_grad}</defs><path d="{bolt_d}" fill="url(#pdb)"/><path d="{pb_d}" fill="url(#pdb)"/></svg>'
open(f"{OUT}/mark.svg", "w").write(mark)
json.dump({"viewBox": " ".join(fmt(v) for v in mvb), "bolt": bolt_d, "bowl": pb_d, "gradient": {"from": "#%02x%02x%02x" % bolt_left, "to": "#%02x%02x%02x" % bolt_right, "x1": fmt(bolt["scissor"].x0), "x2": fmt(pbowl["scissor"].x1)}, "fullAspect": vb[2] / vb[3]}, open(f"{OUT}/mark.json", "w"))
print("sizes: light", len(full_svg("#111")), "dark", len(full_svg("#fff")), "mark", len(mark), "| mark viewBox", [round(v) for v in mvb], "| full aspect %.3f" % (vb[2] / vb[3]))

PD = "/Users/wojciech/Documents/project2026/power-dig"
import os
os.makedirs(f"{PD}/public/brand", exist_ok=True)
open(f"{PD}/public/brand/logo-light.svg", "w").write(full_svg("#111111"))
open(f"{PD}/public/brand/logo-dark.svg", "w").write(full_svg("#F5F0E8"))
open(f"{PD}/public/brand/logo-compact-light.svg", "w").write(full_svg("#111111", include_name=False, box=vb_compact))
open(f"{PD}/public/brand/logo-compact-dark.svg", "w").write(full_svg("#F5F0E8", include_name=False, box=vb_compact))
print("compact aspect %.3f" % (vb_compact[2] / vb_compact[3]))
bx, by, bw, bh = mvb
S = 600; scale = (S * 0.8) / bh; tx = (S - bw * scale) / 2 - bx * scale; ty = (S - bh * scale) / 2 - by * scale
def square(bg):
    rect = f'<rect width="{S}" height="{S}" rx="{S//6}" fill="{bg}"/>' if bg else ""
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {S} {S}">{rect}<defs>{bolt_grad}</defs><g transform="translate({fmt(tx)} {fmt(ty)}) scale({fmt(scale)})"><path d="{bolt_d}" fill="url(#pdb)"/><path d="{pb_d}" fill="url(#pdb)"/></g></svg>'
open("mark-square.svg", "w").write(square(None)); open("mark-square-dark.svg", "w").write(square("#0A0A0A"))
ts = f"""/**
 * Generated from assets/brand/logo-source.pdf by assets/brand/build-logo.py.
 * The lightning-bolt "P" of the PowerDig wordmark, used for the favicon,
 * app icons, hero mark and Open Graph card.
 */
export const LOGO_MARK = {{
  viewBox: "{" ".join(fmt(v) for v in mvb)}",
  bolt: "{bolt_d}",
  bowl: "{pb_d}",
  gradient: {{ from: "#%02x%02x%02x", to: "#%02x%02x%02x", x1: {fmt(bolt["scissor"].x0)}, x2: {fmt(pbowl["scissor"].x1)} }},
}} as const;
""" % (bolt_left + bolt_right)
open(f"{PD}/components/ui/logo/logo-mark-paths.ts", "w").write(ts)
print("project files written; light svg bytes:", os.path.getsize(f"{PD}/public/brand/logo-light.svg"))
