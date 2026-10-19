/* ============================================================================
 * LIFE SCENES — PACSANA WALKTHROUGH
 *
 * The tall illustration beside each step: the person doing whatever the step
 * describes — sleeping, walking outside, getting up in the night, stumbling.
 *
 * Drawn on a 320 × 640 portrait grid so the panel can run the full height of
 * the module. Warm domestic palette; the site's accent colours are used only
 * for small highlights so the scenes sit beside the app screens without
 * competing with them.
 * ========================================================================== */

const OCEAN = 'var(--ocean, #005bb3)';
const EMERALD = 'var(--emerald, #029456)';
const TANGERINE = 'var(--tangerine, #f86a38)';
const RUBY = 'var(--ruby, #d8226c)';

const C = {
  sky: '#dfeaf2',
  skyNight: '#24384d',
  wall: '#eef2f6',
  wallNight: '#31465c',
  floor: '#dbe3ea',
  floorNight: '#27384a',
  skin: '#f0c69f',
  skinDark: '#dcae86',
  hair: '#b6c0c7',
  hairDark: '#8d979e',
  cardi: '#5d7f99',
  cardiDark: '#4a6b86',
  trouser: '#3c5266',
  shoe: '#8c6437',
  furniture: '#c7d3dc',
  furnitureDark: '#aebdc9',
  warm: '#f3c98b',
  leaf: '#7fb493',
  white: '#ffffff',
};

type Pt = [number, number];

const limb = (points: Pt[], colour: string, width: number) =>
  `<polyline points="${points.map((p) => p.join(',')).join(' ')}" fill="none" stroke="${colour}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"/>`;

/**
 * An older adult, drawn from a named pose in a 120 × 200 box with the feet on
 * the baseline. Soft shapes, grey hair, cardigan — the same person in every
 * scene so the walkthrough reads as one story.
 */
function figure(
  pose: {
    hip: Pt; knee: Pt; ankle: Pt; kneeB?: Pt; ankleB?: Pt;
    shoulder: Pt; elbow: Pt; wrist: Pt; elbowB?: Pt; wristB?: Pt;
    head: Pt; tilt?: number;
  },
  opts: { x?: number; y?: number; s?: number; flip?: boolean; cardi?: string; hair?: string } = {},
) {
  const { x = 0, y = 0, s = 1, flip = false, cardi = C.cardi, hair = C.hair } = opts;
  const { hip, knee, ankle, shoulder, elbow, wrist, head } = pose;
  const kneeB = pose.kneeB ?? [knee[0] - 9, knee[1] + 2];
  const ankleB = pose.ankleB ?? [ankle[0] - 13, ankle[1]];
  const elbowB = pose.elbowB ?? [elbow[0] - 7, elbow[1] + 2];
  const wristB = pose.wristB ?? [wrist[0] - 9, wrist[1] + 2];
  const tilt = pose.tilt ?? 0;

  const shoe = (p: Pt, dark = false) =>
    `<path d="M${p[0] - 8} ${p[1] - 8} h15 v6 l12 3 a3 3 0 0 1 -1 6 h-25 a4 4 0 0 1 -4 -4 z" fill="${dark ? '#6f4f2b' : C.shoe}"/>`;

  const body = `
    ${limb([hip, kneeB, ankleB], '#334659', 19)}
    ${shoe(ankleB, true)}
    ${limb([shoulder, elbowB, wristB], cardi === C.cardi ? C.cardiDark : cardi, 13)}
    <circle cx="${wristB[0]}" cy="${wristB[1]}" r="6" fill="${C.skinDark}"/>
    ${limb([hip, knee, ankle], C.trouser, 21)}
    ${shoe(ankle)}
    ${limb([hip, shoulder], cardi, 32)}
    <g transform="rotate(${tilt} ${head[0]} ${head[1]})">
      <circle cx="${head[0]}" cy="${head[1]}" r="16" fill="${C.skin}"/>
      <path d="M${head[0] + 14} ${head[1] - 2} l7 4 l-7 4 z" fill="${C.skinDark}"/>
      <path d="M${head[0] - 17} ${head[1] - 3} a17 17 0 0 1 30 -8 q-10 6 -26 12 z" fill="${hair}"/>
      <circle cx="${head[0] - 14}" cy="${head[1] - 6}" r="7" fill="${hair}"/>
      <circle cx="${head[0] + 7}" cy="${head[1] - 1}" r="2.2" fill="#2b3946"/>
    </g>
    ${limb([shoulder, elbow, wrist], cardi, 14)}
    <circle cx="${wrist[0]}" cy="${wrist[1]}" r="7" fill="${C.skin}"/>`;

  return `<g transform="translate(${x} ${y}) scale(${s})"><g transform="${flip ? 'translate(120 0) scale(-1 1)' : ''}">${body}</g></g>`;
}

const POSES = {
  stand: {
    hip: [56, 112] as Pt, knee: [58, 150] as Pt, ankle: [56, 188] as Pt,
    shoulder: [56, 58] as Pt, elbow: [62, 86] as Pt, wrist: [64, 112] as Pt, head: [58, 34] as Pt,
  },
  /* Mid-stride, walking. */
  walk: {
    hip: [54, 112] as Pt, knee: [74, 146] as Pt, ankle: [82, 188] as Pt,
    kneeB: [38, 148] as Pt, ankleB: [28, 188] as Pt,
    shoulder: [56, 58] as Pt, elbow: [74, 82] as Pt, wrist: [86, 104] as Pt,
    elbowB: [40, 84] as Pt, wristB: [30, 106] as Pt, head: [60, 34] as Pt, tilt: 3,
  },
  /* Seated in a chair, facing right. */
  sit: {
    hip: [48, 132] as Pt, knee: [92, 134] as Pt, ankle: [94, 188] as Pt,
    kneeB: [88, 140] as Pt, ankleB: [86, 188] as Pt,
    shoulder: [46, 76] as Pt, elbow: [62, 104] as Pt, wrist: [82, 118] as Pt, head: [48, 52] as Pt,
  },
  /* Rising, one hand reaching for support. */
  rise: {
    hip: [52, 124] as Pt, knee: [80, 146] as Pt, ankle: [70, 188] as Pt,
    kneeB: [66, 150] as Pt, ankleB: [50, 188] as Pt,
    shoulder: [58, 70] as Pt, elbow: [80, 84] as Pt, wrist: [100, 78] as Pt, head: [62, 44] as Pt, tilt: 6,
  },
  /* Off balance — a stumble being caught, not a fall. */
  stumble: {
    hip: [50, 116] as Pt, knee: [82, 142] as Pt, ankle: [100, 182] as Pt,
    kneeB: [34, 150] as Pt, ankleB: [18, 186] as Pt,
    shoulder: [62, 62] as Pt, elbow: [88, 58] as Pt, wrist: [110, 48] as Pt,
    elbowB: [44, 74] as Pt, wristB: [26, 66] as Pt, head: [68, 38] as Pt, tilt: 14,
  },
  /* Standing, one arm raised in greeting. */
  wave: {
    hip: [56, 112] as Pt, knee: [58, 150] as Pt, ankle: [56, 188] as Pt,
    shoulder: [56, 58] as Pt, elbow: [76, 44] as Pt, wrist: [82, 20] as Pt, head: [58, 34] as Pt,
  },
};

const fig = (pose: keyof typeof POSES, opts: Parameters<typeof figure>[1] = {}) => figure(POSES[pose], opts);

/** The same person lying asleep, seen from the side. */
const sleeping = (x: number, y: number, s = 1) => `
  <g transform="translate(${x} ${y}) scale(${s})">
    <rect x="-10" y="26" width="240" height="16" rx="8" fill="${C.furnitureDark}"/>
    <rect x="0" y="-6" width="60" height="34" rx="10" fill="${C.white}"/>
    <circle cx="66" cy="8" r="17" fill="${C.skin}"/>
    <path d="M52 2 a17 17 0 0 1 28 -6 q-12 6 -26 12 z" fill="${C.hair}"/>
    <path d="M86 26 h120 a14 14 0 0 1 14 14 v2 H86 z" fill="${C.cardi}"/>
    <path d="M86 26 q40 -14 84 -4 q26 6 36 4" fill="none" stroke="${C.cardiDark}" stroke-width="4" stroke-linecap="round"/>
    <path d="M96 -2 q10 -10 4 -18 M116 -6 q10 -10 4 -18" fill="none" stroke="${C.white}" stroke-opacity="0.6" stroke-width="4" stroke-linecap="round"/>
  </g>`;

/* --- rooms and outdoor settings ------------------------------------------- */

const room = (night = false) => `
  <rect width="320" height="640" fill="${night ? C.wallNight : C.wall}"/>
  <rect y="470" width="320" height="170" fill="${night ? C.floorNight : C.floor}"/>
  <rect x="30" y="80" width="120" height="150" rx="8" fill="${night ? '#22364a' : '#e3eaf1'}" stroke="${night ? '#1a2b3c' : '#d3dde6'}" stroke-width="4"/>
  <line x1="90" y1="80" x2="90" y2="230" stroke="${night ? '#1a2b3c' : '#d3dde6'}" stroke-width="4"/>
  ${night ? '<circle cx="118" cy="122" r="16" fill="#f6efd2" opacity="0.9"/>' : '<circle cx="118" cy="122" r="18" fill="#fbe9b8"/>'}`;

const outdoors = () => `
  <rect width="320" height="640" fill="${C.sky}"/>
  <circle cx="240" cy="90" r="34" fill="#f8d98b"/>
  <g fill="#cfe0ea">
    <rect x="0" y="300" width="90" height="180" rx="6"/>
    <rect x="240" y="330" width="80" height="150" rx="6"/>
  </g>
  <rect y="470" width="320" height="170" fill="#cfe3d2"/>
  <path d="M-10 560 q160 -60 340 0 v90 H-10 z" fill="#c2d9c7"/>
  <g transform="translate(58 470)">
    <rect x="-6" y="-46" width="12" height="46" rx="4" fill="#8d7053"/>
    <circle cx="0" cy="-62" r="30" fill="${C.leaf}"/>
    <circle cx="-20" cy="-46" r="18" fill="${C.leaf}" opacity="0.9"/>
    <circle cx="20" cy="-48" r="17" fill="${C.leaf}" opacity="0.9"/>
  </g>`;

/* --- props ---------------------------------------------------------------- */

const armchair = (x: number, y: number, s = 1) => `
  <g transform="translate(${x} ${y}) scale(${s})">
    <rect x="0" y="0" width="34" height="96" rx="14" fill="${C.furnitureDark}"/>
    <rect x="26" y="34" width="110" height="62" rx="12" fill="${C.furniture}"/>
    <rect x="120" y="20" width="26" height="76" rx="12" fill="${C.furnitureDark}"/>
    <rect x="34" y="96" width="14" height="18" rx="5" fill="#9aa9b5"/>
    <rect x="116" y="96" width="14" height="18" rx="5" fill="#9aa9b5"/>
  </g>`;

const table = (x: number, y: number, s = 1) => `
  <g transform="translate(${x} ${y}) scale(${s})">
    <rect x="0" y="0" width="150" height="12" rx="6" fill="${C.furniture}"/>
    <rect x="12" y="12" width="10" height="64" rx="4" fill="${C.furnitureDark}"/>
    <rect x="128" y="12" width="10" height="64" rx="4" fill="${C.furnitureDark}"/>
    <g transform="translate(52 -22)">
      <rect x="0" y="0" width="22" height="20" rx="4" fill="${C.white}"/>
      <path d="M22 5 h8 a6 6 0 0 1 0 12 h-8" fill="none" stroke="${C.white}" stroke-width="4"/>
      <path d="M6 -8 q6 -8 0 -14 M14 -8 q6 -8 0 -14" fill="none" stroke="${C.furnitureDark}" stroke-width="3" stroke-linecap="round"/>
    </g>
  </g>`;

/** A walking stick, held in the near hand. */
const stick = (x: number, y: number, h = 90) => `
  <path d="M${x} ${y} v${h}" stroke="#8d7053" stroke-width="7" stroke-linecap="round"/>
  <path d="M${x} ${y} q-14 -4 -12 -16" fill="none" stroke="#8d7053" stroke-width="7" stroke-linecap="round"/>`;

/** Bedside lamp glow, for the night scenes. */
const lamp = (x: number, y: number) => `
  <rect x="${x - 4}" y="${y}" width="8" height="34" rx="3" fill="${C.furnitureDark}"/>
  <path d="M${x - 20} ${y} l8 -22 h24 l8 22 z" fill="${C.warm}"/>
  <circle cx="${x}" cy="${y + 8}" r="54" fill="${C.warm}" opacity="0.18"/>`;

/** A phone held up, used for the family and alert scenes. */
const phoneInHand = (x: number, y: number, s = 1, tint = OCEAN) => `
  <g transform="translate(${x} ${y}) scale(${s})">
    <rect x="0" y="0" width="34" height="58" rx="7" fill="#1b2a35"/>
    <rect x="3" y="4" width="28" height="50" rx="5" fill="${tint}"/>
    <rect x="8" y="12" width="18" height="4" rx="2" fill="${C.white}" opacity="0.85"/>
    <rect x="8" y="22" width="14" height="4" rx="2" fill="${C.white}" opacity="0.6"/>
  </g>`;

const clockFace = (x: number, y: number, r = 26, hands = 'M0 -14 V0 l10 8') => `
  <circle cx="${x}" cy="${y}" r="${r}" fill="${C.white}" stroke="${C.furnitureDark}" stroke-width="4"/>
  <g transform="translate(${x} ${y})" stroke="#44586b" stroke-width="4" stroke-linecap="round" fill="none"><path d="${hands}"/></g>`;

const moon = (x: number, y: number) => `
  <path d="M${x} ${y - 22} a22 22 0 1 0 18 34 a17 17 0 0 1 -18 -34 z" fill="#f4eccd"/>`;

/* --- the scenes ----------------------------------------------------------- */

export const LIFE_SCENES: Record<string, string> = {
  morning: `
    ${room()}
    <rect x="186" y="360" width="120" height="110" rx="8" fill="${C.furniture}"/>
    <rect x="212" y="330" width="26" height="34" rx="6" fill="${C.furnitureDark}"/>
    ${clockFace(258, 132, 24, 'M0 -13 V0 l9 6')}
    ${fig('stand', { x: 66, y: 268, s: 1.1 })}
    <text x="160" y="600" fill="#7d8d9b" text-anchor="middle" font-family="var(--font-heading)" font-size="16" font-weight="600">Morning, as usual</text>`,

  circle: `
    ${room()}
    ${fig('stand', { x: 96, y: 270, s: 1.05 })}
    ${fig('stand', { x: 6, y: 330, s: 0.72, cardi: EMERALD, hair: '#6b4f3a' })}
    ${phoneInHand(64, 402, 0.78, EMERALD)}
    ${fig('stand', { x: 192, y: 330, s: 0.72, flip: true, cardi: TANGERINE, hair: '#3f3a36' })}
    ${phoneInHand(216, 402, 0.78, TANGERINE)}
    <path d="M96 392 q64 -34 128 0" fill="none" stroke="${OCEAN}" stroke-width="4" stroke-dasharray="6 10" stroke-linecap="round"/>
    <text x="160" y="600" fill="#7d8d9b" text-anchor="middle" font-family="var(--font-heading)" font-size="16" font-weight="600">Family and carers, in the picture</text>`,

  'day-night': `
    <rect width="320" height="640" fill="${C.wallNight}"/>
    <rect width="320" height="320" fill="${C.wall}"/>
    ${moon(250, 430)}
    <circle cx="70" cy="90" r="30" fill="#f8d98b"/>
    ${fig('walk', { x: 96, y: 118, s: 0.95 })}
    <rect y="300" width="320" height="20" fill="${C.floor}"/>
    ${sleeping(44, 470, 0.86)}
    <text x="160" y="604" fill="#b9c8d6" text-anchor="middle" font-family="var(--font-heading)" font-size="16" font-weight="600">Active by day, settled by night</text>`,

  sleeping: `
    ${room(true)}
    ${moon(250, 120)}
    ${lamp(64, 396)}
    ${sleeping(44, 430, 1)}
    <text x="160" y="600" fill="#b9c8d6" text-anchor="middle" font-family="var(--font-heading)" font-size="16" font-weight="600">Seven hours, barely stirring</text>`,

  armchair: `
    ${room()}
    ${armchair(70, 358, 1.05)}
    ${fig('sit', { x: 96, y: 268, s: 1 })}
    ${clockFace(258, 250, 26, 'M0 -15 V0 l13 3')}
    <path d="M258 300 q0 22 -14 34" fill="none" stroke="${TANGERINE}" stroke-width="4" stroke-linecap="round" stroke-dasharray="5 9"/>
    <text x="160" y="600" fill="#7d8d9b" text-anchor="middle" font-family="var(--font-heading)" font-size="16" font-weight="600">Nearly two hours in the chair</text>`,

  night: `
    ${room(true)}
    ${lamp(58, 356)}
    <rect x="212" y="250" width="86" height="220" rx="6" fill="#1e3044"/>
    <rect x="222" y="262" width="66" height="198" rx="4" fill="#2b4256"/>
    <circle cx="232" cy="366" r="5" fill="${C.warm}"/>
    ${fig('walk', { x: 78, y: 270, s: 1.05 })}
    <path d="M150 470 q40 -6 66 -4" fill="none" stroke="${C.warm}" stroke-width="4" stroke-dasharray="4 10" stroke-linecap="round"/>
    <text x="160" y="604" fill="#b9c8d6" text-anchor="middle" font-family="var(--font-heading)" font-size="16" font-weight="600">Twice in the night</text>`,

  outdoor: `
    ${outdoors()}
    ${fig('walk', { x: 82, y: 282, s: 1.15 })}
    ${stick(206, 400, 96)}
    <path d="M40 596 q120 -30 250 -16" fill="none" stroke="#b3cbb9" stroke-width="10" stroke-linecap="round"/>
    <text x="160" y="620" fill="#6f8478" text-anchor="middle" font-family="var(--font-heading)" font-size="16" font-weight="600">Out to the shop and back</text>`,

  visitor: `
    ${room()}
    ${table(86, 396, 1)}
    ${fig('sit', { x: 10, y: 282, s: 0.95 })}
    ${fig('sit', { x: 196, y: 282, s: 0.95, flip: true, cardi: EMERALD, hair: '#6b4f3a' })}
    <path d="M132 350 q28 -16 56 0" fill="none" stroke="${EMERALD}" stroke-width="4" stroke-dasharray="6 9" stroke-linecap="round"/>
    <text x="160" y="600" fill="#7d8d9b" text-anchor="middle" font-family="var(--font-heading)" font-size="16" font-weight="600">Tea with Mary on Tuesday</text>`,

  stroll: `
    ${outdoors()}
    ${fig('walk', { x: 44, y: 292, s: 1.05 })}
    ${fig('walk', { x: 150, y: 300, s: 0.98, cardi: EMERALD, hair: '#6b4f3a' })}
    <path d="M30 600 q140 -26 270 -12" fill="none" stroke="#b3cbb9" stroke-width="10" stroke-linecap="round"/>
    <text x="160" y="622" fill="#6f8478" text-anchor="middle" font-family="var(--font-heading)" font-size="16" font-weight="600">A short walk after lunch</text>`,

  exercise: `
    ${room()}
    ${armchair(10, 368, 0.9)}
    ${fig('rise', { x: 34, y: 280, s: 0.95 })}
    ${fig('walk', { x: 176, y: 286, s: 0.98 })}
    <path d="M150 300 q24 -18 46 -4" fill="none" stroke="${EMERALD}" stroke-width="4" stroke-dasharray="6 9" stroke-linecap="round"/>
    <text x="160" y="600" fill="#7d8d9b" text-anchor="middle" font-family="var(--font-heading)" font-size="16" font-weight="600">Inside and outside the home</text>`,

  stumble: `
    ${room()}
    <rect x="196" y="376" width="116" height="16" rx="8" fill="${C.furnitureDark}"/>
    <rect x="286" y="392" width="12" height="78" rx="5" fill="${C.furniture}"/>
    ${fig('stumble', { x: 84, y: 274, s: 1.08 })}
    <g stroke="${TANGERINE}" stroke-width="5" stroke-linecap="round" fill="none" opacity="0.85">
      <path d="M78 300 q-14 -10 -10 -26 M62 336 q-18 -4 -22 -20"/>
    </g>
    <text x="160" y="600" fill="#7d8d9b" text-anchor="middle" font-family="var(--font-heading)" font-size="16" font-weight="600">A stumble, caught in time</text>`,

  'round-clock': `
    <rect width="320" height="640" fill="${C.wall}"/>
    <rect y="320" width="320" height="320" fill="${C.wallNight}"/>
    <circle cx="240" cy="96" r="28" fill="#f8d98b"/>
    ${moon(74, 440)}
    <rect y="300" width="320" height="18" fill="${C.floor}"/>
    ${fig('walk', { x: 60, y: 110, s: 0.9 })}
    ${sleeping(50, 486, 0.8)}
    <g transform="translate(160 316)">
      <circle cx="0" cy="0" r="30" fill="${OCEAN}"/>
      <path d="M0 -16 V0 l12 9" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="0" cy="0" r="40" fill="none" stroke="${OCEAN}" stroke-width="3" stroke-dasharray="4 8" opacity="0.6"/>
    </g>
    <text x="160" y="608" fill="#b9c8d6" text-anchor="middle" font-family="var(--font-heading)" font-size="16" font-weight="600">Watching, all day and all night</text>`,

  alert: `
    ${room()}
    ${armchair(142, 372, 0.85)}
    ${fig('sit', { x: 162, y: 292, s: 0.85 })}
    ${fig('stand', { x: -4, y: 296, s: 0.95, cardi: EMERALD, hair: '#6b4f3a' })}
    ${phoneInHand(62, 372, 1.05, RUBY)}
    <g transform="translate(96 336)">
      <circle cx="0" cy="0" r="17" fill="${RUBY}"/>
      <path d="M0 -8 v9 M0 6 v0.1" stroke="#ffffff" stroke-width="3.4" stroke-linecap="round"/>
    </g>
    <text x="160" y="600" fill="#7d8d9b" text-anchor="middle" font-family="var(--font-heading)" font-size="16" font-weight="600">Mary hears about it straight away</text>`,

  together: `
    ${room()}
    ${fig('wave', { x: 34, y: 276, s: 1.05 })}
    ${fig('stand', { x: 156, y: 280, s: 1.02, flip: true, cardi: EMERALD, hair: '#6b4f3a' })}
    <g transform="translate(160 214)">
      <path d="M0 16 c-14 -18 -34 -6 -22 10 c6 8 16 14 22 18 c6 -4 16 -10 22 -18 c12 -16 -8 -28 -22 -10 z" fill="${EMERALD}" opacity="0.8"/>
    </g>
    <text x="160" y="600" fill="#7d8d9b" text-anchor="middle" font-family="var(--font-heading)" font-size="16" font-weight="600">Independent, and not alone</text>`,
};
