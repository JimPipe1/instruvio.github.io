import random, math, json, sys

W, H = 1200, 900
random.seed(int(sys.argv[1]) if len(sys.argv) > 1 else 7)
THEME = sys.argv[2] if len(sys.argv) > 2 else "pastel"   # "pastel" or "site"
# "text" keeps the left third quiet so a headline can sit over it
TEXTSAFE = len(sys.argv) > 3 and sys.argv[3] == "text"

if THEME == "site":
    # The site palette: ocean, ruby, tangerine, emerald, ice on a pale ocean tint.
    BG        = "#eef5fa"
    LINE      = "#005bb3"
    LINE_OPA  = (0.30, 0.55)
    HUB       = "#f86a38"   # tangerine
    HUB_TOP   = "#ff8a5f"
    HUB_SIDE  = "#d4501f"
    PASTELS = [
        ("#005bb3", "#2b7fd0", "#00417f"),   # ocean
        ("#d8226c", "#ea4a8b", "#a91751"),   # ruby
        ("#029456", "#28b374", "#01703f"),   # emerald
        ("#b2dae4", "#cde9f0", "#8bbecb"),   # ice
    ]
else:
    BG        = "#c3e3f4"   # soft blue paper
    LINE      = "#12303f"   # thin circuit line
    LINE_OPA  = (0.70, 0.95)
    HUB       = "#f5c451"   # amber hub
    HUB_TOP   = "#ffd978"
    HUB_SIDE  = "#e0a92f"
    PASTELS = [
        ("#f6b9cf", "#fbd5e3", "#e197b4"),   # ruby tint
        ("#fbc3a3", "#ffdac3", "#e3a582"),   # tangerine tint
        ("#a9dcc6", "#c8ecdb", "#88c2a9"),   # emerald tint
        ("#b6dcea", "#d3ecf5", "#93c2d4"),   # ice
        ("#c3cdf0", "#dde3fa", "#a3aedb"),   # ocean tint
    ]


out = []
def add(s): out.append(s)

add(f'<rect width="{W}" height="{H}" fill="{BG}"/>')
if TEXTSAFE:
    add(f"""<defs><linearGradient id="fade" x1="0" x2="1">
      <stop offset="0" stop-color="#000"/><stop offset="0.12" stop-color="#333"/>
      <stop offset="0.42" stop-color="#fff"/></linearGradient>
      <mask id="quiet"><rect width="{W}" height="{H}" fill="url(#fade)"/></mask></defs>""")
    add('<g mask="url(#quiet)">')

# --- circuit maze in the margins -------------------------------------------
CX, CY = (W * 0.64 if TEXTSAFE else W * 0.52), H * 0.5
QUIET = W * 0.42          # left band kept calm for the headline
CLEAR = 300          # keep the middle clear for the network
STEP = 26

def in_clear(x, y):
    return abs(x - CX) < CLEAR and abs(y - CY) < CLEAR * 0.86

def walk(x, y, steps):
    pts = [(x, y)]
    dirs = [(1,0),(-1,0),(0,1),(0,-1)]
    d = random.choice(dirs)
    for _ in range(steps):
        if random.random() < 0.62:                      # turn
            d = random.choice([(d[1], d[0]), (-d[1], -d[0])])
        n = random.randint(1, 5) * STEP
        nx, ny = x + d[0] * n, y + d[1] * n
        if not (10 < nx < W - 10 and 10 < ny < H - 10) or in_clear(nx, ny):
            d = random.choice(dirs); continue
        x, y = nx, ny
        pts.append((x, y))
    return pts

paths = []
seeds = []
for gy in range(0, H, 70):
    for gx in range(0, W, 70):
        seeds.append((gx + random.randint(0, 60), gy + random.randint(0, 60)))
if TEXTSAFE:                       # make up the density on the busy side
    for gy in range(0, H, 60):
        for gx in range(int(QUIET), W, 60):
            seeds.append((gx + random.randint(0, 50), gy + random.randint(0, 50)))
random.shuffle(seeds)
for x, y in seeds:
    if in_clear(x, y) or not (20 < x < W - 20 and 20 < y < H - 20):
        continue
    if TEXTSAFE and x < QUIET and random.random() < 0.72:
        continue
    p = walk(x, y, random.randint(5, 12))
    if len(p) > 2:
        paths.append(p)

for p in paths:
    d = "M" + " L".join(f"{x},{y}" for x, y in p)
    add(f'<path d="{d}" fill="none" stroke="{LINE}" stroke-width="{random.choice([1.4,1.6,1.8]):.1f}" stroke-opacity="{random.uniform(*LINE_OPA):.2f}"/>')

# a few closed rectangles for rhythm
for _ in range(26):
    x = random.randrange(20, W - 140, STEP)
    y = random.randrange(20, H - 140, STEP)
    w = random.randint(2, 6) * STEP
    h = random.randint(2, 5) * STEP
    if in_clear(x, y) or in_clear(x + w, y + h) or in_clear(x, y+h) or in_clear(x+w, y):
        continue
    if TEXTSAFE and x < QUIET:
        continue
    add(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="none" stroke="{LINE}" stroke-width="1.6" stroke-opacity="{(LINE_OPA[0]+LINE_OPA[1])/2:.2f}"/>')

if TEXTSAFE:
    add('</g>')

# --- spokes and nodes -------------------------------------------------------
nodes = []
N = 11
for i in range(N):
    for _try in range(30):
        a = (i / N) * math.tau + random.uniform(-0.09, 0.09)
        r = random.uniform(215, 330)
        x = CX + math.cos(a) * r * 1.22
        y = CY + math.sin(a) * r * 0.92
        if not (70 < x < W - 70 and 70 < y < H - 70):
            continue
        if TEXTSAFE and x < QUIET + 40:
            continue
        if all((x-nx)**2 + (y-ny)**2 > 120**2 for nx, ny, _ in nodes):
            nodes.append((x, y, random.uniform(0.85, 1.25))); break

for x, y, _ in nodes:
    add(f'<line x1="{CX:.1f}" y1="{CY:.1f}" x2="{x:.1f}" y2="{y:.1f}" stroke="{LINE}" stroke-width="2" stroke-opacity="{min(0.95, LINE_OPA[1]+0.25):.2f}"/>')

def cube(x, y, s, face, top, side, rot=0):
    d = s * 0.26
    return f'''<g transform="translate({x:.1f} {y:.1f}) rotate({rot})">
      <ellipse cx="{s*0.1}" cy="{s*0.62}" rx="{s*0.78}" ry="{s*0.2}" fill="#0b2a3a" opacity="0.12"/>
      <path d="M{-s/2} {-s/2} l{d} {-d} h{s} l{-d} {d} z" fill="{top}"/>
      <path d="M{s/2} {-s/2} l{d} {-d} v{s} l{-d} {d} z" fill="{side}"/>
      <rect x="{-s/2}" y="{-s/2}" width="{s}" height="{s}" rx="{s*0.06}" fill="{face}"/>
    </g>'''

# scattered cubes in the maze area
taken = [(x, y) for x, y, _ in nodes] + [(CX, CY)]
scatter = []
for _ in range(16):
    for _try in range(60):
        x = random.uniform(60, W - 60); y = random.uniform(60, H - 60)
        if in_clear(x, y) or (TEXTSAFE and x < QUIET + 30):
            continue
        if all((x-sx)**2 + (y-sy)**2 > 135**2 for sx, sy in scatter + taken):
            scatter.append((x, y)); break
def pick():
    """Weighted so the palest colour stays a minor accent."""
    if THEME == "site":
        weights = [3, 3, 3, 1, 3][: len(PASTELS)]
        return random.choices(PASTELS, weights=weights)[0]
    return random.choice(PASTELS)

for x, y in scatter:
    f, t, s = pick()
    add(cube(x, y, random.uniform(30, 44), f, t, s, random.uniform(-4, 4)))

# cubes on the network nodes
for x, y, sc in nodes:
    f, t, s = pick()
    add(cube(x, y, 46 * sc, f, t, s, random.uniform(-3, 3)))

# hub: a 2 x 2 block of amber cubes
hs = 46
gap = hs * 0.58
for dx, dy in [(-gap, -gap), (gap, -gap), (-gap, gap), (gap, gap)]:
    add(cube(CX + dx, CY + dy, hs, HUB, HUB_TOP, HUB_SIDE))

svg = f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">{"".join(out)}</svg>'
name = ("hero-site" if THEME == "site" else "hero") + ("-text" if TEXTSAFE else "") + ".svg"
open(name, "w").write(svg)
print("svg bytes", len(svg), "| nodes", len(nodes), "| scatter", len(scatter), "| paths", len(paths))
