/* ============================================================================
 * SCENES — RAINSAFE TANK INSTALLATION
 *
 * One entry per picture, drawn on the same 480 × 320 grid as the other
 * training sets. Shared drawing tools come from illustration-kit.ts; the props
 * specific to this module (chambers, stone, geotextile, trenches, plant) are
 * defined here.
 *
 * These are the fallback drawings. Each slide in rainsafe-installation.ts also
 * names a photo in public/media/rainsafe/, which is used instead when present.
 * ========================================================================== */

import {
  C,
  OCEAN,
  RUBY,
  EMERALD,
  INK,
  worker,
  tick,
  cross,
  arrow,
  chip,
} from './illustration-kit.ts';

const GREY = C.silhouette;
const GREY_DARK = C.ground;
const WHITE = C.white;
const STONE = '#c2c6cb';
const STONE_DARK = '#a9aeb5';

/* --- ground and excavation ------------------------------------------------ */

/** Plain pale panel behind every cross-section. */
const panel = () => `<rect width="480" height="320" fill="${C.bg}"/>`;

/** Undisturbed ground either side of an excavation, in section. */
const ground = (x: number, w: number, y = 150, h = 150) => `
  <g>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${GREY_DARK}"/>
    <g stroke="${GREY}" stroke-width="2" opacity="0.7">
      ${Array.from({ length: Math.ceil(w / 18) })
        .map((_, i) => `<path d="M${x + i * 18} ${y + h} l14 -14"/>`)
        .join('')}
    </g>
  </g>`;

/** An open excavation: ground left and right, formation across the bottom. */
const excavation = (top = 150, base = 266, left = 54, right = 426) => `
  ${ground(0, left, top, 320 - top)}
  ${ground(right, 480 - right, top, 320 - top)}
  <rect x="${left}" y="${base}" width="${right - left}" height="${320 - base}" fill="${GREY_DARK}"/>
  <line x1="${left}" y1="${top}" x2="${left}" y2="${base}" stroke="${GREY}" stroke-width="3"/>
  <line x1="${right}" y1="${top}" x2="${right}" y2="${base}" stroke="${GREY}" stroke-width="3"/>`;

/** A band of angular stone. The seed keeps the speckle stable between builds. */
const stoneFill = (x: number, y: number, w: number, h: number, seed = 1) => {
  let n = seed * 9301;
  const rnd = () => ((n = (n * 9301 + 49297) % 233280) / 233280);
  const chips = Array.from({ length: Math.round((w * h) / 420) })
    .map(() => {
      const cx = x + rnd() * w;
      const cy = y + rnd() * h;
      const r = 3 + rnd() * 4;
      const rot = Math.round(rnd() * 90);
      return `<rect x="${cx.toFixed(1)}" y="${cy.toFixed(1)}" width="${(r * 1.6).toFixed(1)}" height="${r.toFixed(
        1,
      )}" rx="1" fill="${STONE_DARK}" transform="rotate(${rot} ${cx.toFixed(1)} ${cy.toFixed(1)})" opacity="0.8"/>`;
    })
    .join('');
  return `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${STONE}"/>${chips}</g>`;
};

/** A geotextile or liner sheet, drawn as a line across the picture. */
const textile = (d: string, colour = OCEAN, dash = false) =>
  `<path d="${d}" fill="none" stroke="${colour}" stroke-width="4" stroke-linecap="round"${
    dash ? ' stroke-dasharray="10 7"' : ''
  }/>`;

/* --- chambers ------------------------------------------------------------- */

/** One chamber in section: an arch with corrugated legs. */
const chamber = (x: number, y: number, w = 56, h = 44, fill = GREY) => `
  <g>
    <path d="M${x} ${y} v${-(h - 14)} q0 -14 ${w / 2} -14 q${w / 2} 0 ${w / 2} 14 v${h - 14} z" fill="${fill}"/>
    <path d="M${x} ${y} v${-(h - 14)} q0 -14 ${w / 2} -14 q${w / 2} 0 ${w / 2} 14 v${h - 14}" fill="none" stroke="${GREY_DARK}" stroke-width="2"/>
  </g>`;

/** A run of chambers in section, side by side with stone columns between. */
const chamberRow = (x: number, y: number, count: number, gap = 26, fill = GREY) =>
  Array.from({ length: count })
    .map((_, i) => chamber(x + i * (56 + gap), y, 56, 44, fill))
    .join('');

/** A chamber in elevation: the corrugated arch seen from the side. */
const chamberSide = (x: number, y: number, w = 108, h = 52, fill = GREY) => {
  const ribs = Array.from({ length: Math.floor(w / 18) })
    .map((_, i) => `<path d="M${x + 10 + i * 18} ${y} v${-h + 8}" stroke="${GREY_DARK}" stroke-width="2" opacity="0.8"/>`)
    .join('');
  return `
  <g>
    <path d="M${x} ${y} v${-(h - 16)} q0 -16 ${w / 2} -16 q${w / 2} 0 ${w / 2} 16 v${h - 16} z" fill="${fill}"/>
    ${ribs}
  </g>`;
};

/** End cap: a flat closure on the end of a row. */
const endCap = (x: number, y: number, h = 52, fill = GREY_DARK) =>
  `<path d="M${x} ${y} v${-(h - 16)} q0 -16 14 -16 h6 v${h} z" fill="${fill}"/>`;

/** Corrugated pipe, lying horizontally. */
const pipe = (x: number, y: number, w = 70, h = 18, colour = OCEAN) => {
  const ribs = Array.from({ length: Math.floor(w / 10) })
    .map((_, i) => `<path d="M${x + 5 + i * 10} ${y} v${h}" stroke="${WHITE}" stroke-width="2" opacity="0.5"/>`)
    .join('');
  return `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="${colour}"/>${ribs}</g>`;
};

/* --- plant and site ------------------------------------------------------- */

/** A pallet stack of chambers. */
const palletStack = (x: number, y: number, levels = 4, w = 86, lean = 0) => {
  const rows = Array.from({ length: levels })
    .map(
      (_, i) =>
        `<rect x="${x}" y="${y - 20 - i * 22}" width="${w}" height="18" rx="4" fill="${
          i % 2 ? GREY : C.bgSoft
        }" stroke="${GREY_DARK}" stroke-width="1.5"/>`,
    )
    .join('');
  return `
  <g transform="rotate(${lean} ${x + w / 2} ${y})">
    <rect x="${x - 4}" y="${y - 12}" width="${w + 8}" height="12" rx="2" fill="${C.box}"/>
    ${rows}
    <path d="M${x + w / 2} ${y - 20 - levels * 22 + 10} v${levels * 22 - 4}" stroke="${RUBY}" stroke-width="3" opacity="0.9"/>
  </g>`;
};

/** Flatbed delivery lorry, facing right. */
const lorry = (x: number, y: number, s = 1) => `
  <g transform="translate(${x} ${y}) scale(${s})">
    <rect x="0" y="-16" width="150" height="16" rx="3" fill="${GREY_DARK}"/>
    <rect x="150" y="-52" width="46" height="52" rx="6" fill="${OCEAN}"/>
    <rect x="160" y="-44" width="26" height="18" rx="3" fill="${C.bg}"/>
    <circle cx="36" cy="8" r="12" fill="${INK}"/><circle cx="36" cy="8" r="4" fill="${C.bg}"/>
    <circle cx="168" cy="8" r="12" fill="${INK}"/><circle cx="168" cy="8" r="4" fill="${C.bg}"/>
  </g>`;

/** Telehandler with extended forks, facing left. */
const telehandler = (x: number, y: number, s = 1, forkLen = 78) => `
  <g transform="translate(${x} ${y}) scale(${s})">
    <rect x="0" y="-46" width="104" height="34" rx="6" fill="${C.helmet}"/>
    <rect x="62" y="-74" width="40" height="30" rx="5" fill="${GREY_DARK}"/>
    <path d="M60 -56 l-${forkLen + 10} -24" stroke="${C.helmetDark}" stroke-width="12" stroke-linecap="round"/>
    <path d="M${-forkLen + 42} -82 h-26 v22" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="22" cy="-6" r="14" fill="${INK}"/><circle cx="22" cy="-6" r="5" fill="${C.bg}"/>
    <circle cx="86" cy="-6" r="14" fill="${INK}"/><circle cx="86" cy="-6" r="5" fill="${C.bg}"/>
  </g>`;

/** Tracked excavator, arm reaching right. */
const excavator = (x: number, y: number, s = 1) => `
  <g transform="translate(${x} ${y}) scale(${s})">
    <rect x="0" y="-18" width="104" height="18" rx="9" fill="${INK}"/>
    <rect x="12" y="-56" width="74" height="38" rx="6" fill="${C.helmet}"/>
    <rect x="54" y="-50" width="28" height="20" rx="3" fill="${C.bg}"/>
    <path d="M86 -48 l54 -22 l26 36" fill="none" stroke="${C.helmetDark}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M166 -34 l10 18 l-22 8 z" fill="${GREY_DARK}"/>
  </g>`;

/** Warning triangle. */
const warning = (x: number, y: number, s = 1) => `
  <g transform="translate(${x} ${y}) scale(${s})">
    <path d="M0 -30 l30 52 h-60 z" fill="${RUBY}"/>
    <path d="M0 -12 v22" stroke="${WHITE}" stroke-width="6" stroke-linecap="round"/>
    <circle cx="0" cy="16" r="3.4" fill="${WHITE}"/>
  </g>`;

/** Horizontal dimension line with a label above it. */
const dimH = (x1: number, x2: number, y: number, label: string, colour = OCEAN) => `
  <g>
    <path d="M${x1} ${y - 8} v16 M${x2} ${y - 8} v16" stroke="${colour}" stroke-width="3"/>
    <path d="M${x1} ${y} H${x2}" stroke="${colour}" stroke-width="3"/>
    <rect x="${(x1 + x2) / 2 - Math.max(30, label.length * 5 + 10)}" y="${y - 32}" width="${Math.max(
      60,
      label.length * 10 + 20,
    )}" height="24" rx="12" fill="${colour}"/>
    <text x="${(x1 + x2) / 2}" y="${y - 15}" fill="${WHITE}" text-anchor="middle" font-family="var(--font-heading)" font-size="13" font-weight="700">${label}</text>
  </g>`;

/** Vertical dimension line with a label beside it, flipped when it would
 *  otherwise run off the right-hand edge of the 480-wide frame. */
const dimV = (y1: number, y2: number, x: number, label: string, colour = OCEAN) => {
  const w = Math.max(54, label.length * 10.5 + 26);
  const lx = x + 14 + w > 476 ? x - 14 - w : x + 14;
  return `
  <g>
    <path d="M${x - 8} ${y1} h16 M${x - 8} ${y2} h16" stroke="${colour}" stroke-width="3"/>
    <path d="M${x} ${y1} V${y2}" stroke="${colour}" stroke-width="3"/>
    ${chip(lx, (y1 + y2) / 2 - 14, label, colour)}
  </g>`;
};

/* --- the scenes ----------------------------------------------------------- */

export const SCENES: Record<string, string> = {
  /* ---------------------------------------------- 1. before you start */
  welcome: `
    ${panel()}
    <rect x="0" y="150" width="480" height="40" fill="${GREY}"/>
    <rect x="0" y="186" width="480" height="12" fill="${GREY_DARK}"/>
    ${excavation(198, 282, 30, 450)}
    ${stoneFill(30, 198, 420, 84, 3)}
    ${chamberRow(56, 268, 4, 36)}
    ${textile('M30 198 H450', OCEAN)}
    ${textile('M30 282 H450', OCEAN)}
    ${worker('stand', { x: 96, y: 150, s: 0.5 })}
    ${worker('think', { x: 352, y: 150, s: 0.5 })}
    ${chip(176, 24, 'RainSafe tank', OCEAN)}`,

  'why-guidelines': `
    ${panel()}
    ${stoneFill(20, 150, 200, 130, 5)}
    ${stoneFill(260, 150, 200, 130, 9)}
    <g opacity="0.95">${chamber(66, 250, 108, 72, GREY)}</g>
    <g opacity="0.95">${chamber(306, 250, 108, 72, GREY)}</g>
    <path d="M120 186 l-14 30 l20 6 l-16 28" fill="none" stroke="${RUBY}" stroke-width="5" stroke-linecap="round"/>
    ${cross(196, 170)}
    ${tick(436, 170)}
    ${chip(40, 40, 'Damaged', RUBY)}
    ${chip(298, 40, 'Correct', EMERALD)}`,

  'crew-briefing': `
    ${panel()}
    <rect x="0" y="252" width="480" height="68" fill="${GREY_DARK}"/>
    <g>
      <rect x="172" y="96" width="140" height="96" rx="6" fill="${WHITE}" stroke="${GREY_DARK}" stroke-width="2"/>
      <g stroke="${GREY}" stroke-width="4" stroke-linecap="round">
        <path d="M188 120 h108 M188 138 h108 M188 156 h72"/>
      </g>
      <rect x="188" y="168" width="48" height="12" rx="6" fill="${OCEAN}"/>
    </g>
    ${worker('stand', { x: 92, y: 252, s: 0.62 })}
    ${worker('think', { x: 148, y: 252, s: 0.62 })}
    ${worker('stand', { x: 342, y: 252, s: 0.62, flip: true })}
    ${worker('stand', { x: 398, y: 252, s: 0.62, flip: true })}
    ${chip(176, 40, 'Record signed', EMERALD)}`,

  'minimum-requirements': `
    ${panel()}
    <rect x="78" y="56" width="324" height="208" rx="8" fill="${WHITE}" stroke="${GREY_DARK}" stroke-width="2"/>
    ${chamberRow(110, 206, 3, 34)}
    ${dimH(166, 200, 232, 'min')}
    ${dimH(256, 290, 232, 'min')}
    ${textile('M104 214 H376', OCEAN, true)}
    <g stroke="${GREY}" stroke-width="4" stroke-linecap="round">
      <path d="M104 84 h120 M104 102 h86"/>
    </g>
    ${chip(262, 74, 'Minimum', OCEAN)}`,

  'pre-briefing': `
    ${panel()}
    <rect x="0" y="252" width="480" height="68" fill="${GREY_DARK}"/>
    ${worker('think', { x: 140, y: 252, s: 0.82 })}
    ${worker('stand', { x: 300, y: 252, s: 0.72, flip: true })}
    ${worker('stand', { x: 364, y: 252, s: 0.72, flip: true })}
    <g>
      <rect x="196" y="92" width="92" height="64" rx="5" fill="${WHITE}" stroke="${GREY_DARK}" stroke-width="2"/>
      <g stroke="${OCEAN}" stroke-width="3"><path d="M210 110 h64 M210 126 h64 M210 142 h40"/></g>
    </g>
    ${chip(176, 36, 'Pre-installation briefing', OCEAN)}`,

  /* ------------------------------------------------- 2. unloading */
  delivery: `
    ${panel()}
    <rect x="0" y="262" width="480" height="58" fill="${GREY_DARK}"/>
    ${lorry(36, 262, 1.1)}
    ${palletStack(72, 246, 4, 72)}
    ${palletStack(160, 246, 4, 72)}
    ${chip(300, 40, 'On pallets', OCEAN)}`,

  'fork-extenders': `
    ${panel()}
    <rect x="0" y="262" width="480" height="58" fill="${GREY_DARK}"/>
    ${telehandler(240, 262, 1, 86)}
    ${palletStack(104, 206, 4, 78)}
    ${dimH(104, 182, 240, 'forks reach through')}
    ${chip(28, 36, 'Fork extenders', OCEAN)}`,

  'level-ground': `
    ${panel()}
    <rect x="0" y="262" width="480" height="58" fill="${GREY_DARK}"/>
    <rect x="18" y="258" width="200" height="8" rx="4" fill="${GREY}"/>
    ${palletStack(58, 258, 5, 80)}
    ${tick(196, 96)}
    <path d="M262 266 q58 -16 196 -4" fill="none" stroke="${GREY}" stroke-width="8" stroke-linecap="round"/>
    ${palletStack(296, 258, 5, 80, -11)}
    ${cross(436, 96)}
    ${chip(28, 36, 'Flat and level', EMERALD)}`,

  'never-push': `
    ${panel()}
    <rect x="0" y="262" width="480" height="58" fill="${GREY_DARK}"/>
    ${palletStack(176, 262, 5, 92)}
    ${arrow(96, 150, 70, RUBY)}
    <g transform="translate(300 150)">
      <rect x="0" y="-12" width="86" height="18" rx="4" fill="${GREY}" transform="rotate(26)"/>
    </g>
    ${cross(240, 56, 26)}
    ${chip(150, 288, 'Never push', RUBY)}`,

  /* ------------------------------------------------ 3. excavation */
  excavate: `
    ${panel()}
    ${excavation(150, 266, 54, 426)}
    ${excavator(306, 150, 0.8)}
    <g stroke="${OCEAN}" stroke-width="3">
      <path d="M78 150 v-42 M402 150 v-42"/>
      <path d="M78 118 H402" stroke-dasharray="9 7"/>
    </g>
    ${chip(188, 72, 'To the drawings', OCEAN)}
    ${dimV(150, 266, 462, 'depth')}`,

  subgrade: `
    ${panel()}
    ${excavation(150, 250, 54, 426)}
    <rect x="54" y="250" width="372" height="26" fill="${GREY}"/>
    ${worker('squat', { x: 180, y: 250, s: 0.6 })}
    ${arrow(286, 214, 56, OCEAN)}
    ${chip(272, 170, 'Bearing capacity', OCEAN)}
    ${tick(400, 206)}`,

  'ground-improvement': `
    ${panel()}
    ${excavation(150, 262, 54, 426)}
    ${stoneFill(168, 214, 150, 48, 4)}
    <path d="M168 214 h150 v48 h-150 z" fill="none" stroke="${EMERALD}" stroke-width="3"/>
    ${excavator(60, 150, 0.7)}
    ${chip(176, 174, 'Improved ground', EMERALD)}`,

  'sharp-objects': `
    ${panel()}
    ${excavation(150, 262, 54, 426)}
    <g fill="${GREY}">
      <path d="M122 262 l18 -26 l16 26 z"/>
      <path d="M300 262 l14 -20 l14 20 z"/>
    </g>
    <path d="M196 230 l34 -34" stroke="${RUBY}" stroke-width="6" stroke-linecap="round"/>
    ${cross(140, 196)}
    ${stoneFill(240, 240, 180, 22, 7)}
    ${chip(246, 198, 'Fine bedding', OCEAN)}`,

  /* ----------------------------------------------------- 4. liner */
  'liner-spreader': `
    ${panel()}
    ${excavation(150, 266, 40, 440)}
    <g>
      <path d="M150 86 H330" stroke="${GREY_DARK}" stroke-width="7" stroke-linecap="round"/>
      <path d="M160 86 v30 M320 86 v30" stroke="${GREY_DARK}" stroke-width="4"/>
      <circle cx="240" cy="70" r="9" fill="${GREY_DARK}"/>
    </g>
    <rect x="212" y="116" width="56" height="30" rx="8" fill="${OCEAN}"/>
    ${textile('M60 254 H210 q30 -40 60 -40 H420', OCEAN)}
    ${chip(28, 36, 'Spreader beam', OCEAN)}`,

  wrinkles: `
    ${panel()}
    <rect x="24" y="78" width="200" height="164" rx="8" fill="${C.bgSoft}"/>
    <rect x="256" y="78" width="200" height="164" rx="8" fill="${C.bgSoft}"/>
    ${textile('M44 170 H204', OCEAN)}
    ${textile('M44 194 H204', OCEAN)}
    ${dimH(100, 150, 212, 'overlap')}
    ${tick(124, 110)}
    ${textile('M276 174 q16 -22 32 0 q16 22 32 0 q16 -22 32 0 q16 22 32 0', RUBY)}
    ${cross(356, 110)}`,

  underdrain: `
    ${panel()}
    ${excavation(170, 262, 40, 440)}
    ${textile('M40 262 H440', OCEAN)}
    ${pipe(150, 236, 180, 20, OCEAN)}
    <g fill="${WHITE}" opacity="0.8">
      ${Array.from({ length: 8 })
        .map((_, i) => `<circle cx="${166 + i * 22}" cy="${252}" r="2.6"/>`)
        .join('')}
    </g>
    ${chip(182, 196, 'Under-drain', OCEAN)}`,

  /* ---------------------------------------------- 5. bedding stone */
  'stone-spec': `
    ${panel()}
    <rect x="24" y="86" width="132" height="148" rx="8" fill="${C.bgSoft}"/>
    ${stoneFill(36, 110, 108, 100, 2)}
    ${tick(90, 258, 18)}
    <rect x="174" y="86" width="132" height="148" rx="8" fill="${C.bgSoft}"/>
    <g fill="${STONE_DARK}">
      ${Array.from({ length: 22 })
        .map((_, i) => `<circle cx="${192 + (i % 5) * 24}" cy="${124 + Math.floor(i / 5) * 22}" r="9"/>`)
        .join('')}
    </g>
    ${cross(240, 258, 18)}
    <rect x="324" y="86" width="132" height="148" rx="8" fill="${C.bgSoft}"/>
    <rect x="336" y="110" width="108" height="100" fill="${C.box}" opacity="0.45"/>
    ${cross(390, 258, 18)}
    ${chip(16, 36, 'Clean, crushed, angular only', OCEAN)}`,

  'bedding-place': `
    ${panel()}
    ${excavation(170, 282, 40, 440)}
    ${textile('M40 282 H440', OCEAN)}
    ${stoneFill(40, 240, 400, 42, 6)}
    ${excavator(300, 170, 0.72)}
    ${chip(56, 196, 'Place and compact', OCEAN)}`,

  'bedding-depth': `
    ${panel()}
    ${excavation(150, 282, 40, 440)}
    ${textile('M40 282 H440', OCEAN)}
    ${stoneFill(40, 232, 400, 50, 8)}
    ${dimV(232, 282, 300, 'design depth')}
    <path d="M110 150 v132" stroke="${INK}" stroke-width="5"/>
    <g fill="${INK}">
      ${Array.from({ length: 5 })
        .map((_, i) => `<rect x="104" y="${166 + i * 24}" width="12" height="4"/>`)
        .join('')}
    </g>`,

  'bedding-plant': `
    ${panel()}
    ${excavation(160, 282, 40, 440)}
    ${stoneFill(40, 238, 400, 44, 11)}
    ${pipe(120, 262, 150, 16, OCEAN)}
    ${excavator(290, 160, 0.72)}
    ${chip(50, 196, 'Mind the under-drain', RUBY)}`,

  /* --------------------------------------------- 6. separator row */
  'mark-out': `
    ${panel()}
    ${stoneFill(0, 150, 480, 170, 12)}
    <g stroke="${RUBY}" stroke-width="4" stroke-dasharray="14 10">
      <path d="M40 196 H440 M40 236 H440 M40 276 H440"/>
    </g>
    ${worker('squat', { x: 110, y: 300, s: 0.62 })}
    ${chip(16, 40, 'Mark every row first', RUBY)}`,

  'separator-start': `
    ${panel()}
    <rect x="40" y="86" width="400" height="200" rx="8" fill="${C.bgSoft}"/>
    <g>
      ${Array.from({ length: 5 })
        .map(
          (_, i) =>
            `<rect x="86" y="${108 + i * 34}" width="300" height="20" rx="10" fill="${i === 0 ? OCEAN : GREY}"/>`,
        )
        .join('')}
    </g>
    <circle cx="62" cy="118" r="16" fill="${GREY_DARK}"/>
    ${arrow(62, 118, 20, OCEAN)}
    ${chip(236, 250, 'Separator Row first', OCEAN)}`,

  'woven-bed': `
    ${panel()}
    ${stoneFill(0, 170, 480, 150, 13)}
    <rect x="48" y="206" width="384" height="52" rx="4" fill="${OCEAN}" opacity="0.9"/>
    <g stroke="${WHITE}" stroke-width="1.6" opacity="0.6">
      ${Array.from({ length: 16 })
        .map((_, i) => `<path d="M${60 + i * 24} 206 v52"/>`)
        .join('')}
      ${Array.from({ length: 3 })
        .map((_, i) => `<path d="M48 ${218 + i * 14} h384"/>`)
        .join('')}
    </g>
    ${chip(16, 40, 'Woven geotextile', OCEAN)}`,

  'continuous-strip': `
    ${panel()}
    ${stoneFill(0, 180, 480, 140, 14)}
    <rect x="30" y="94" width="420" height="34" rx="4" fill="${OCEAN}"/>
    ${tick(240, 72, 16)}
    <g>
      <rect x="30" y="196" width="120" height="34" rx="4" fill="${RUBY}" opacity="0.85"/>
      <rect x="166" y="196" width="120" height="34" rx="4" fill="${RUBY}" opacity="0.85"/>
      <rect x="302" y="196" width="120" height="34" rx="4" fill="${RUBY}" opacity="0.85"/>
    </g>
    ${cross(240, 268, 16)}
    ${chip(16, 36, 'One continuous strip', EMERALD)}`,

  'margin-300': `
    ${panel()}
    ${stoneFill(0, 170, 480, 150, 15)}
    <rect x="34" y="188" width="412" height="92" rx="4" fill="${OCEAN}" opacity="0.9"/>
    ${chamberSide(118, 268, 244, 70, GREY)}
    ${dimH(34, 118, 300, '300 mm min')}
    ${dimH(362, 446, 300, '300 mm min')}
    ${chip(16, 40, 'Geotextile margin', OCEAN)}`,

  'first-chamber': `
    ${panel()}
    ${stoneFill(0, 200, 480, 120, 16)}
    <rect x="40" y="236" width="400" height="26" rx="4" fill="${OCEAN}" opacity="0.85"/>
    ${endCap(96, 236, 62)}
    ${chamberSide(116, 236, 150, 62)}
    ${worker('carry', { x: 330, y: 262, s: 0.6 })}
    ${chip(16, 40, 'First chamber and end cap', OCEAN)}`,

  'inlet-cut': `
    ${panel()}
    <rect x="96" y="80" width="200" height="196" rx="10" fill="${GREY}"/>
    <path d="M96 170 q100 -70 200 0" fill="none" stroke="${GREY_DARK}" stroke-width="3"/>
    <circle cx="196" cy="236" r="30" fill="none" stroke="${RUBY}" stroke-width="4" stroke-dasharray="9 7"/>
    ${pipe(300, 226, 130, 22, OCEAN)}
    ${arrow(246, 237, 48, OCEAN)}
    ${chip(236, 174, 'Invert at the bottom', RUBY)}
    ${chip(20, 40, 'Cut on the guides', OCEAN)}`,

  'connect-chambers': `
    ${panel()}
    ${stoneFill(0, 252, 480, 68, 17)}
    ${chamberSide(40, 252, 190, 86)}
    ${chamberSide(214, 252, 190, 86, C.bgSoft)}
    <path d="M214 180 v72" stroke="${RUBY}" stroke-width="4"/>
    <circle cx="228" cy="214" r="9" fill="${OCEAN}"/>
    <circle cx="202" cy="214" r="13" fill="none" stroke="${OCEAN}" stroke-width="4"/>
    ${chip(16, 40, 'Large over small', OCEAN)}
    ${chip(236, 40, 'Buttons into sockets', EMERALD)}`,

  'bypass-cut': `
    ${panel()}
    ${stoneFill(0, 254, 480, 66, 18)}
    ${chamberSide(60, 254, 230, 92)}
    ${endCap(290, 254, 92)}
    <circle cx="300" cy="186" r="22" fill="none" stroke="${RUBY}" stroke-width="4" stroke-dasharray="9 7"/>
    ${pipe(322, 176, 120, 20, OCEAN)}
    ${chip(236, 108, 'Bypass at the top', RUBY)}`,

  'cover-separator': `
    ${panel()}
    ${stoneFill(0, 256, 480, 64, 19)}
    ${chamberSide(60, 256, 340, 86)}
    ${textile('M34 166 H446', OCEAN)}
    <g stroke="${OCEAN}" stroke-width="2" opacity="0.5">
      ${Array.from({ length: 18 })
        .map((_, i) => `<path d="M${40 + i * 24} 162 v8"/>`)
        .join('')}
    </g>
    ${chip(132, 60, 'Non-woven over the row', OCEAN)}`,

  /* ------------------------------------------------- 7. build out */
  'remaining-rows': `
    ${panel()}
    ${stoneFill(0, 150, 480, 170, 20)}
    ${Array.from({ length: 4 })
      .map((_, i) => `<rect x="70" y="${170 + i * 38}" width="340" height="24" rx="12" fill="${GREY}"/>`)
      .join('')}
    ${Array.from({ length: 4 })
      .map(
        (_, i) =>
          `<rect x="52" y="${170 + i * 38}" width="16" height="24" rx="6" fill="${GREY_DARK}"/>
           <rect x="412" y="${170 + i * 38}" width="16" height="24" rx="6" fill="${GREY_DARK}"/>`,
      )
      .join('')}
    ${chip(16, 40, 'Cap off every row', OCEAN)}`,

  'bypass-assembly': `
    ${panel()}
    ${stoneFill(0, 160, 480, 160, 21)}
    ${Array.from({ length: 3 })
      .map((_, i) => `<rect x="60" y="${188 + i * 44}" width="300" height="26" rx="13" fill="${GREY}"/>`)
      .join('')}
    <path d="M372 201 v88" stroke="${OCEAN}" stroke-width="18" stroke-linecap="round"/>
    ${pipe(356, 192, 34, 18, OCEAN)}
    ${pipe(356, 236, 34, 18, OCEAN)}
    ${pipe(356, 280, 34, 18, OCEAN)}
    ${chip(16, 40, 'Overflow bypasses', OCEAN)}`,

  'row-spacing': `
    ${panel()}
    ${excavation(140, 282, 30, 450)}
    ${stoneFill(30, 196, 420, 86, 22)}
    ${chamberRow(56, 268, 4, 40)}
    ${dimH(112, 152, 180, 'min')}
    ${dimH(208, 248, 180, 'min')}
    ${dimH(304, 344, 180, 'min')}
    <g stroke="${EMERALD}" stroke-width="3">
      <path d="M132 268 v-50 M228 268 v-50 M324 268 v-50"/>
    </g>
    ${chip(16, 40, 'Stone columns carry the tank', EMERALD)}`,

  /* ------------------------------------------------ 8. stone fill */
  'fill-why': `
    ${panel()}
    ${excavation(140, 282, 30, 450)}
    ${stoneFill(30, 170, 420, 112, 23)}
    ${chamberRow(56, 268, 4, 40)}
    ${arrow(100, 120, 40, OCEAN)}
    ${arrow(220, 120, 40, OCEAN)}
    ${arrow(340, 120, 40, OCEAN)}
    <path d="M30 150 H450" stroke="${GREY_DARK}" stroke-width="4"/>
    ${chip(136, 44, 'Structure and storage', OCEAN)}`,

  'fill-spine': `
    ${panel()}
    ${excavation(140, 282, 30, 450)}
    ${stoneFill(30, 252, 420, 30, 24)}
    ${chamberRow(56, 268, 4, 40)}
    <g fill="${STONE_DARK}">
      ${Array.from({ length: 4 })
        .map((_, i) => `<rect x="${72 + i * 96}" y="196" width="24" height="12" rx="3"/>`)
        .join('')}
    </g>
    <g stroke="${OCEAN}" stroke-width="4" stroke-linecap="round">
      ${Array.from({ length: 4 })
        .map((_, i) => `<path d="M${84 + i * 96} 212 v20"/>`)
        .join('')}
    </g>
    ${chip(132, 44, 'Along the spine', OCEAN)}`,

  'fill-ends': `
    ${panel()}
    ${stoneFill(0, 150, 480, 170, 25)}
    ${Array.from({ length: 4 })
      .map((_, i) => `<rect x="110" y="${176 + i * 38}" width="300" height="24" rx="12" fill="${GREY}"/>`)
      .join('')}
    ${arrow(36, 220, 66, OCEAN)}
    ${excavator(20, 150, 0.6)}
    ${chip(222, 40, 'Parallel to the rows', OCEAN)}
    ${chip(222, 282, 'Placed, never dumped', RUBY)}`,

  'warning-plant': `
    ${panel()}
    ${excavation(150, 282, 30, 450)}
    ${stoneFill(30, 240, 420, 42, 26)}
    ${chamberRow(56, 268, 4, 40)}
    ${excavator(150, 150, 0.8)}
    ${warning(400, 92, 1.1)}
    ${chip(40, 50, 'Only as the guidelines allow', RUBY)}`,

  'fill-balanced': `
    ${panel()}
    <rect x="18" y="96" width="206" height="196" rx="8" fill="${C.bgSoft}"/>
    ${stoneFill(30, 212, 182, 68, 27)}
    ${chamber(96, 280, 56, 50)}
    ${tick(120, 130, 17)}
    <rect x="256" y="96" width="206" height="196" rx="8" fill="${C.bgSoft}"/>
    ${stoneFill(268, 180, 78, 100, 28)}
    ${stoneFill(394, 250, 56, 30, 29)}
    <g transform="rotate(12 376 280)">${chamber(348, 280, 56, 50)}</g>
    ${arrow(348, 216, 34, RUBY)}
    ${cross(358, 130, 17)}`,

  'level-300': `
    ${panel()}
    ${excavation(130, 282, 30, 450)}
    ${stoneFill(30, 214, 200, 68, 30)}
    ${stoneFill(230, 240, 220, 42, 31)}
    ${chamberRow(56, 268, 4, 40)}
    ${dimV(214, 240, 246, 'max 300 mm')}
    ${chip(26, 50, 'Bring it up together', OCEAN)}`,

  'no-compaction': `
    ${panel()}
    ${excavation(150, 282, 30, 450)}
    ${chamberRow(56, 268, 4, 44)}
    ${stoneFill(112, 216, 44, 52, 32)}
    ${stoneFill(212, 216, 44, 52, 33)}
    ${stoneFill(312, 216, 44, 52, 34)}
    ${tick(400, 182, 18)}
    ${chip(26, 50, 'Locks as it is placed', EMERALD)}`,

  'cover-150': `
    ${panel()}
    ${excavation(120, 282, 30, 450)}
    ${stoneFill(30, 196, 420, 86, 35)}
    ${chamberRow(56, 268, 4, 40)}
    <path d="M30 224 H450" stroke="${EMERALD}" stroke-width="3" stroke-dasharray="10 7"/>
    ${dimV(196, 224, 240, '150 mm min')}
    ${excavator(180, 120, 0.62)}
    ${warning(416, 74, 0.8)}`,

  'top-water-level': `
    ${panel()}
    ${excavation(120, 282, 30, 450)}
    ${stoneFill(30, 178, 420, 104, 36)}
    ${chamberRow(56, 268, 4, 40)}
    ${textile('M30 178 H450', OCEAN)}
    ${textile('M250 178 H450', OCEAN)}
    ${dimH(250, 320, 158, 'overlap')}
    ${chip(26, 56, 'Top Water Level', OCEAN)}`,

  /* ------------------------------------------------- 9. finishing */
  'closing-performance': `
    ${panel()}
    <rect x="0" y="120" width="480" height="34" fill="${GREY}"/>
    <rect x="0" y="150" width="480" height="10" fill="${GREY_DARK}"/>
    ${excavation(160, 282, 30, 450)}
    ${stoneFill(30, 160, 420, 122, 37)}
    ${chamberRow(56, 268, 4, 40)}
    ${textile('M30 160 H450', OCEAN)}
    ${textile('M30 282 H450', OCEAN)}
    ${tick(420, 70, 20)}
    ${chip(26, 56, 'Performance and integrity', EMERALD)}`,

  records: `
    ${panel()}
    <rect x="128" y="72" width="224" height="176" rx="8" fill="${WHITE}" stroke="${GREY_DARK}" stroke-width="2"/>
    <g stroke="${GREY}" stroke-width="5" stroke-linecap="round">
      <path d="M152 108 h176 M152 132 h176 M152 156 h120"/>
    </g>
    <path d="M160 206 q24 -22 44 0 q18 16 44 -10" fill="none" stroke="${OCEAN}" stroke-width="4" stroke-linecap="round"/>
    ${tick(336, 232, 18)}
    ${chip(116, 272, 'Keep with the records', OCEAN)}`,

  closing: `
    ${panel()}
    <rect x="0" y="252" width="480" height="68" fill="${GREY_DARK}"/>
    ${worker('stand', { x: 120, y: 252, s: 0.78 })}
    ${worker('stretch', { x: 206, y: 252, s: 0.78 })}
    ${worker('stand', { x: 292, y: 252, s: 0.78, flip: true })}
    ${worker('carry', { x: 376, y: 252, s: 0.78, flip: true })}
    ${chip(132, 56, 'Everyone’s responsibility', EMERALD)}`,
};
