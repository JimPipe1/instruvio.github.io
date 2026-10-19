/* ============================================================================
 * ILLUSTRATION KIT
 *
 * The drawing tools the training illustrations are built from: the palette,
 * a posed worker, and the props and scenery used across scenes.
 *
 * Scene sets live beside this file (scenes-manual-handling.ts,
 * scenes-carbon.ts) and are rendered by
 * src/components/training/Illustration.astro.
 * ========================================================================== */

/* --- palette -------------------------------------------------------------
   Illustration colours are fixed rather than taken from the site tokens, so
   the hi-vis orange stays hi-vis whatever the site palette does. The badges
   and labels do use the site colours. */
export const C = {
  bg: '#e7e8ea',
  bgSoft: '#dfe1e4',
  silhouette: '#d5d7da',
  ground: '#cfd2d6',
  helmet: '#e8672b',
  helmetDark: '#cf5620',
  vest: '#f1712f',
  band: '#f5c84c',
  shirt: '#4a6b86',
  shirtDark: '#3d5a72',
  trouser: '#2f4457',
  trouserDark: '#25384a',
  boot: '#b9884e',
  bootDark: '#8c6437',
  skin: '#f0c69f',
  skinDark: '#dcae86',
  hair: '#3b2b20',
  box: '#b08355',
  boxTop: '#c39468',
  boxLine: '#8d6440',
  white: '#ffffff',
};

export const OCEAN = 'var(--ocean, #005bb3)';
export const RUBY = 'var(--ruby, #d8226c)';
export const EMERALD = 'var(--emerald, #029456)';
export const INK = 'var(--text, #0f1f33)';

/* --- building blocks ----------------------------------------------------- */

export type Pt = [number, number];

/** Rounded, tapered limb through a list of points. */
export const limb = (points: Pt[], colour: string, width: number) =>
  `<polyline points="${points.map((p) => p.join(',')).join(' ')}" fill="none" stroke="${colour}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"/>`;

/** A work boot, sitting on the ankle point and pointing `dir`. */
export const boot = (ankle: Pt, dir = 1, dark = false) => {
  const [x, y] = ankle;
  return `<path d="M${x - 7 * dir} ${y - 10} h${14 * dir} v${7} l${13 * dir} 3 a3 3 0 0 1 ${-1 * dir} 6 h${-26 * dir} a4 4 0 0 1 ${-4 * dir} -4 z" fill="${dark ? C.bootDark : C.boot}"/>`;
};

/** A hand. */
export const hand = (p: Pt, r = 7) => `<circle cx="${p[0]}" cy="${p[1]}" r="${r}" fill="${C.skin}"/>`;

/**
 * A worker in side view, built from a simple skeleton so every pose is drawn
 * the same way. Local box is 120 × 170 with the feet on the baseline.
 */
export function person(
  pose: {
    hip: Pt;
    knee: Pt;
    ankle: Pt;
    kneeB?: Pt;
    ankleB?: Pt;
    shoulder: Pt;
    elbow: Pt;
    wrist: Pt;
    elbowB?: Pt;
    wristB?: Pt;
    head: Pt;
    /** degrees, positive tilts the head forward */
    tilt?: number;
    spine?: string;
  },
  opts: { x?: number; y?: number; s?: number; flip?: boolean } = {},
) {
  const { x = 0, y = 0, s = 1, flip = false } = opts;
  const { hip, knee, ankle, shoulder, elbow, wrist, head } = pose;
  const kneeB = pose.kneeB ?? [knee[0] - 8, knee[1] + 2];
  const ankleB = pose.ankleB ?? [ankle[0] - 12, ankle[1]];
  const elbowB = pose.elbowB ?? [elbow[0] - 6, elbow[1] + 2];
  const wristB = pose.wristB ?? [wrist[0] - 8, wrist[1] + 2];
  const tilt = pose.tilt ?? 0;

  /* Torso: a thick stroke from hip to shoulder, with two reflective bands
     drawn across it. */
  const dx = shoulder[0] - hip[0];
  const dy = shoulder[1] - hip[1];
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const bandAt = (t: number) => {
    const bx = hip[0] + dx * t;
    const by = hip[1] + dy * t;
    return `<line x1="${bx - nx * 15}" y1="${by - ny * 15}" x2="${bx + nx * 15}" y2="${by + ny * 15}" stroke="${C.band}" stroke-width="5" stroke-linecap="round"/>`;
  };

  const headGroup = `
    <g transform="rotate(${tilt} ${head[0]} ${head[1]})">
      <circle cx="${head[0]}" cy="${head[1]}" r="17" fill="${C.skin}"/>
      <path d="M${head[0] + 15} ${head[1] - 2} l7 4 l-7 4 z" fill="${C.skinDark}"/>
      <path d="M${head[0] - 17} ${head[1] - 2} a17 17 0 0 1 22 -15 l-4 8 a13 13 0 0 0 -13 9 z" fill="${C.hair}"/>
      <circle cx="${head[0] + 8}" cy="${head[1] - 2}" r="2.4" fill="${C.hair}"/>
      <path d="M${head[0] - 19} ${head[1] - 9} a20 20 0 0 1 38 0 z" fill="${C.helmet}"/>
      <path d="M${head[0] - 19} ${head[1] - 9} h45 a3.5 3.5 0 0 1 0 7 h-45 a3.5 3.5 0 0 1 0 -7 z" fill="${C.helmetDark}"/>
    </g>`;

  const body = `
    ${limb([hip, kneeB, ankleB], C.trouserDark, 21)}
    ${boot(ankleB, 1, true)}
    ${limb([shoulder, elbowB, wristB], C.shirtDark, 14)}
    ${hand(wristB, 6.5)}
    ${limb([hip, knee, ankle], C.trouser, 23)}
    ${boot(ankle, 1)}
    ${limb([hip, shoulder], C.vest, 34)}
    ${bandAt(0.34)}
    ${bandAt(0.62)}
    ${headGroup}
    ${limb([shoulder, elbow, wrist], C.shirt, 15)}
    ${hand(wrist)}`;

  const mirror = flip ? 'translate(120 0) scale(-1 1)' : '';
  return `<g transform="translate(${x} ${y}) scale(${s})"><g transform="${mirror}">${body}</g></g>`;
}

/* The poses. Coordinates are in the 120 × 170 local box. */
export const POSES: Record<string, Parameters<typeof person>[0]> = {
  stand: {
    hip: [52, 96],
    knee: [54, 128],
    ankle: [52, 158],
    shoulder: [52, 50],
    elbow: [58, 72],
    wrist: [60, 94],
    head: [56, 30],
  },
  /* Knees bent, back straight, hands on the load — the correct lift. */
  squat: {
    hip: [44, 100],
    knee: [76, 118],
    ankle: [58, 158],
    kneeB: [66, 124],
    ankleB: [40, 158],
    shoulder: [58, 58],
    elbow: [78, 78],
    wrist: [94, 100],
    elbowB: [74, 80],
    wristB: [90, 102],
    head: [66, 38],
    tilt: 6,
  },
  /* Legs straight, back rounded — the lift to avoid. */
  stoop: {
    hip: [44, 94],
    knee: [48, 126],
    ankle: [46, 158],
    kneeB: [40, 128],
    ankleB: [34, 158],
    shoulder: [78, 70],
    elbow: [88, 94],
    wrist: [92, 118],
    head: [92, 60],
    tilt: 16,
  },
  /* Load held against the body. */
  carry: {
    hip: [52, 96],
    knee: [54, 128],
    ankle: [52, 158],
    shoulder: [52, 50],
    elbow: [66, 70],
    wrist: [84, 84],
    head: [56, 30],
  },
  /* Leaning into a push. */
  push: {
    hip: [46, 98],
    knee: [64, 124],
    ankle: [78, 158],
    kneeB: [30, 128],
    ankleB: [14, 158],
    shoulder: [68, 62],
    elbow: [88, 70],
    wrist: [106, 78],
    elbowB: [86, 76],
    wristB: [104, 84],
    head: [78, 44],
    tilt: 8,
  },
  /* Load held out in front of the body — the example to avoid. */
  carryFar: {
    hip: [52, 96],
    knee: [54, 128],
    ankle: [52, 158],
    shoulder: [52, 50],
    elbow: [74, 62],
    wrist: [100, 74],
    elbowB: [70, 66],
    wristB: [96, 78],
    head: [56, 30],
  },
  /* Hand to the chin. */
  think: {
    hip: [52, 96],
    knee: [54, 128],
    ankle: [52, 158],
    shoulder: [52, 50],
    elbow: [68, 68],
    wrist: [66, 44],
    head: [56, 30],
  },
  /* Arms overhead. */
  stretch: {
    hip: [52, 96],
    knee: [54, 128],
    ankle: [52, 158],
    shoulder: [52, 50],
    elbow: [64, 28],
    wrist: [62, 6],
    elbowB: [40, 28],
    wristB: [42, 6],
    head: [56, 30],
  },
  /* Hand pressed to the lower back. */
  ache: {
    hip: [52, 96],
    knee: [54, 128],
    ankle: [52, 158],
    shoulder: [54, 50],
    elbow: [70, 74],
    wrist: [56, 92],
    head: [58, 30],
    tilt: -6,
  },
};

export const worker = (pose: string, opts: { x?: number; y?: number; s?: number; flip?: boolean } = {}) =>
  person(POSES[pose] ?? POSES.stand, opts);

/* --- scenery ------------------------------------------------------------- */

/** Faint tower crane, used in the background. */
export const crane = (x: number, y: number, s = 1, flip = false) => `
  <g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})" fill="none" stroke="${C.silhouette}" stroke-width="5" stroke-linecap="round">
    <path d="M0 0 v120"/>
    <path d="M-10 120 h20"/>
    <path d="M-46 8 h96"/>
    <path d="M0 -14 l16 22 M0 -14 l-16 22"/>
    <path d="M28 8 v22"/>
    <g stroke-width="3">
      <path d="M-46 8 l16 -12 M-14 8 l14 -12 M14 8 l-14 -12 M34 8 l-18 -12"/>
      <path d="M0 20 h0"/>
    </g>
    <rect x="20" y="30" width="18" height="12" rx="2" fill="${C.silhouette}" stroke="none"/>
  </g>`;

/** Soft grey backdrop: skyline, cranes and a ground band. */
export const backdrop = (kind: 'site' | 'plain' = 'site') => {
  const skyline =
    kind === 'site'
      ? `
    <g fill="${C.silhouette}">
      <rect x="18" y="150" width="70" height="112" rx="3"/>
      <rect x="96" y="118" width="54" height="144" rx="3"/>
      <rect x="300" y="132" width="76" height="130" rx="3"/>
      <rect x="386" y="164" width="76" height="98" rx="3"/>
      <g fill="${C.bgSoft}">
        <rect x="110" y="134" width="12" height="14"/><rect x="128" y="134" width="12" height="14"/>
        <rect x="110" y="160" width="12" height="14"/><rect x="128" y="160" width="12" height="14"/>
        <rect x="316" y="150" width="14" height="16"/><rect x="344" y="150" width="14" height="16"/>
        <rect x="316" y="180" width="14" height="16"/><rect x="344" y="180" width="14" height="16"/>
        <rect x="402" y="182" width="14" height="16"/><rect x="430" y="182" width="14" height="16"/>
      </g>
    </g>
    ${crane(70, 40, 0.85)}
    ${crane(392, 54, 0.7, true)}`
      : '';

  return `
    <rect width="480" height="320" rx="0" fill="${C.bg}"/>
    ${skyline}
    <rect x="0" y="262" width="480" height="58" fill="${C.ground}"/>
    <ellipse cx="240" cy="266" rx="220" ry="10" fill="${C.bgSoft}" opacity="0.7"/>`;
};

/* --- props --------------------------------------------------------------- */

/** Cardboard box, drawn with a lid so it reads three-dimensional. */
export const box = (x: number, y: number, w = 70, h = 56) => `
  <g>
    <path d="M${x} ${y + 12} l${w * 0.22} -12 h${w} l${-w * 0.22} 12 z" fill="${C.boxTop}"/>
    <rect x="${x}" y="${y + 12}" width="${w}" height="${h}" rx="2" fill="${C.box}"/>
    <path d="M${x + w} ${y + 12} l${w * 0.22} -12 v${h} l${-w * 0.22} 12 z" fill="${C.boxLine}"/>
    <line x1="${x + w / 2}" y1="${y + 12}" x2="${x + w / 2}" y2="${y + h + 12}" stroke="${C.boxLine}" stroke-width="2.5" opacity="0.7"/>
  </g>`;

/** Sack truck. */
export const trolley = (x: number, y: number) => `
  <g stroke="${C.trouser}" stroke-width="7" stroke-linecap="round" fill="none">
    <path d="M${x} ${y} l0 78"/>
    <path d="M${x} ${y + 78} l42 0"/>
  </g>
  <circle cx="${x + 8}" cy="${y + 90}" r="13" fill="${C.trouserDark}"/>
  <circle cx="${x + 8}" cy="${y + 90}" r="5" fill="${C.bgSoft}"/>`;

/** Document or form. */
export const sheet = (x: number, y: number, w = 100, h = 126, lines = 5) => `
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${C.white}" stroke="${C.ground}" stroke-width="2"/>
  <rect x="${x + 14}" y="${y + 14}" width="${w * 0.46}" height="8" rx="4" fill="${OCEAN}"/>
  ${Array.from({ length: lines })
    .map(
      (_, i) =>
        `<line x1="${x + 14}" y1="${y + 36 + i * 16}" x2="${x + w - 14}" y2="${y + 36 + i * 16}" stroke="${C.ground}" stroke-width="5" stroke-linecap="round"/>`,
    )
    .join('')}`;

export const tick = (x: number, y: number, r = 21) => `
  <circle cx="${x}" cy="${y}" r="${r}" fill="${EMERALD}"/>
  <path d="M${x - r * 0.45} ${y} l${r * 0.35} ${r * 0.38} l${r * 0.6} -${r * 0.72}" fill="none" stroke="${C.white}" stroke-width="${r * 0.22}" stroke-linecap="round" stroke-linejoin="round"/>`;

export const cross = (x: number, y: number, r = 21) => `
  <circle cx="${x}" cy="${y}" r="${r}" fill="${RUBY}"/>
  <path d="M${x - r * 0.4} ${y - r * 0.4} l${r * 0.8} ${r * 0.8} M${x + r * 0.4} ${y - r * 0.4} l-${r * 0.8} ${r * 0.8}" fill="none" stroke="${C.white}" stroke-width="${r * 0.22}" stroke-linecap="round"/>`;

export const arrow = (x: number, y: number, len = 60, colour = OCEAN) => `
  <line x1="${x}" y1="${y}" x2="${x + len}" y2="${y}" stroke="${colour}" stroke-width="5" stroke-linecap="round"/>
  <path d="M${x + len - 12} ${y - 9} l12 9 l-12 9" fill="none" stroke="${colour}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`;

/** Label chip. */
export const chip = (x: number, y: number, text: string, colour = OCEAN) => `
  <g>
    <rect x="${x}" y="${y}" width="${Math.max(54, text.length * 10.5 + 26)}" height="28" rx="14" fill="${colour}"/>
    <text x="${x + 13}" y="${y + 19}" fill="${C.white}" font-family="var(--font-heading)" font-size="13" font-weight="700" letter-spacing="0.04em">${text}</text>
  </g>`;

/* --- the scenes ---------------------------------------------------------- */
