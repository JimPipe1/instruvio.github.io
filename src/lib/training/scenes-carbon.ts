/* ============================================================================
 * SCENES — CUTTING CARBON IN CONSTRUCTION
 *
 * One entry per picture, drawn on the same 480 × 320 grid as the manual
 * handling set. Shared drawing tools come from illustration-kit.ts; the props
 * specific to this module (buildings, plant, skips, charts) are defined here.
 * ========================================================================== */

import { C, OCEAN, RUBY, EMERALD, INK, worker, backdrop, box, sheet, tick, cross, arrow, chip } from './illustration-kit.ts';

const GREY = C.silhouette;
const GREY_DARK = C.ground;
const WHITE = '#ffffff';

/* --- props ---------------------------------------------------------------- */

/** A simple building block with windows. */
const building = (x: number, y: number, w: number, h: number, fill = GREY, win = C.bg) => {
  const cols = Math.max(1, Math.floor(w / 26));
  const rows = Math.max(1, Math.floor(h / 30));
  const windows = Array.from({ length: cols * rows })
    .map((_, i) => {
      const cx = x + 10 + (i % cols) * 26;
      const cy = y + 14 + Math.floor(i / cols) * 30;
      return `<rect x="${cx}" y="${cy}" width="13" height="16" rx="2" fill="${win}"/>`;
    })
    .join('');
  return `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${fill}"/>${windows}</g>`;
};

/** Delivery lorry, facing right. */
const lorry = (x: number, y: number, s = 1, colour = OCEAN) => `
  <g transform="translate(${x} ${y}) scale(${s})">
    <rect x="0" y="-46" width="96" height="46" rx="4" fill="${C.box}"/>
    <rect x="96" y="-34" width="42" height="34" rx="5" fill="${colour}"/>
    <rect x="112" y="-28" width="20" height="14" rx="3" fill="${C.bg}"/>
    <circle cx="26" cy="6" r="11" fill="${INK}"/><circle cx="26" cy="6" r="4" fill="${C.bg}"/>
    <circle cx="112" cy="6" r="11" fill="${INK}"/><circle cx="112" cy="6" r="4" fill="${C.bg}"/>
  </g>`;

/** Waste skip with a label. */
const skip = (x: number, y: number, label: string, colour = OCEAN, w = 92) => `
  <g>
    <path d="M${x} ${y} l${w} 0 l${-10} 52 l${-(w - 20)} 0 z" fill="${colour}"/>
    <rect x="${x - 4}" y="${y - 8}" width="${w + 8}" height="10" rx="4" fill="${colour}" opacity="0.75"/>
    <text x="${x + w / 2}" y="${y + 34}" fill="${WHITE}" text-anchor="middle" font-family="var(--font-heading)" font-size="13" font-weight="700">${label}</text>
  </g>`;

/** Diesel generator. */
const genset = (x: number, y: number) => `
  <g>
    <rect x="${x}" y="${y}" width="104" height="54" rx="6" fill="${GREY_DARK}"/>
    <rect x="${x + 12}" y="${y + 12}" width="34" height="30" rx="3" fill="${C.bg}"/>
    <rect x="${x + 72}" y="${y - 30}" width="12" height="32" rx="4" fill="${GREY_DARK}"/>
    <path d="M${x + 78} ${y - 40} q-10 -12 2 -20 q10 -8 2 -18" fill="none" stroke="${INK}" stroke-opacity="0.35" stroke-width="5" stroke-linecap="round"/>
  </g>`;

/** Transmission pylon. */
const pylon = (x: number, y: number, h = 110) => `
  <g stroke="${OCEAN}" stroke-width="5" fill="none" stroke-linecap="round">
    <path d="M${x - 20} ${y} L${x - 6} ${y - h} M${x + 20} ${y} L${x + 6} ${y - h}"/>
    <path d="M${x - 15} ${y - h * 0.3} h30 M${x - 11} ${y - h * 0.6} h22"/>
    <path d="M${x - 30} ${y - h * 0.82} h60 M${x - 22} ${y - h} h44"/>
  </g>`;

/** Site cabin. */
const cabin = (x: number, y: number, w = 120) => `
  <g>
    <rect x="${x}" y="${y}" width="${w}" height="58" rx="4" fill="${WHITE}" stroke="${GREY_DARK}" stroke-width="3"/>
    <rect x="${x}" y="${y}" width="${w}" height="10" rx="3" fill="${OCEAN}"/>
    <rect x="${x + 14}" y="${y + 22}" width="26" height="22" rx="2" fill="${C.bg}"/>
    <rect x="${x + 52}" y="${y + 22}" width="26" height="22" rx="2" fill="${C.bg}"/>
    <rect x="${x + w - 34}" y="${y + 18}" width="22" height="40" rx="2" fill="${GREY}"/>
  </g>`;

/** Round meter dial. */
const meter = (x: number, y: number, r = 30, colour = EMERALD) => `
  <g>
    <circle cx="${x}" cy="${y}" r="${r}" fill="${WHITE}" stroke="${GREY_DARK}" stroke-width="4"/>
    <path d="M${x - r * 0.72} ${y + r * 0.2} a${r * 0.78} ${r * 0.78} 0 0 1 ${r * 1.44} 0" fill="none" stroke="${colour}" stroke-width="6" stroke-linecap="round"/>
    <line x1="${x}" y1="${y + r * 0.2}" x2="${x + r * 0.42}" y2="${y - r * 0.42}" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
  </g>`;

/** Tree. */
const tree = (x: number, y: number, s = 1) => `
  <g transform="translate(${x} ${y}) scale(${s})">
    <rect x="-5" y="-26" width="10" height="28" rx="3" fill="${C.boxLine}"/>
    <circle cx="0" cy="-46" r="26" fill="${EMERALD}"/>
    <circle cx="-18" cy="-32" r="16" fill="${EMERALD}" opacity="0.85"/>
    <circle cx="18" cy="-34" r="15" fill="${EMERALD}" opacity="0.85"/>
  </g>`;

/** Steel I-beam, seen end-on-ish. */
const beam = (x: number, y: number, w = 120) => `
  <g fill="${OCEAN}">
    <rect x="${x}" y="${y}" width="${w}" height="12" rx="2"/>
    <rect x="${x + w / 2 - 7}" y="${y + 12}" width="14" height="40"/>
    <rect x="${x}" y="${y + 52}" width="${w}" height="12" rx="2"/>
  </g>`;

/** Concrete mixer truck. */
const mixer = (x: number, y: number, s = 1) => `
  <g transform="translate(${x} ${y}) scale(${s})">
    <rect x="0" y="-30" width="40" height="30" rx="5" fill="${OCEAN}"/>
    <rect x="8" y="-24" width="18" height="12" rx="2" fill="${C.bg}"/>
    <g transform="rotate(-12 96 -34)">
      <ellipse cx="96" cy="-34" rx="46" ry="28" fill="${GREY_DARK}"/>
      <path d="M58 -34 q38 -22 76 0 q-38 22 -76 0" fill="none" stroke="${WHITE}" stroke-opacity="0.5" stroke-width="5"/>
    </g>
    <rect x="30" y="-8" width="122" height="10" rx="4" fill="${INK}" opacity="0.7"/>
    <circle cx="48" cy="6" r="11" fill="${INK}"/><circle cx="118" cy="6" r="11" fill="${INK}"/>
  </g>`;

/** Timber / CLT panel. */
const panel = (x: number, y: number, w = 110, h = 80) => `
  <g>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="${C.box}"/>
    <g stroke="${C.boxLine}" stroke-width="3" stroke-linecap="round" opacity="0.7">
      <path d="M${x + 8} ${y + 16} h${w - 16} M${x + 8} ${y + 34} h${w - 16} M${x + 8} ${y + 52} h${w - 16} M${x + 8} ${y + 68} h${w - 16}"/>
    </g>
  </g>`;

/** Clipboard with ticked lines. */
const clipboard = (x: number, y: number, lines = 4) => {
  const rows = Array.from({ length: lines })
    .map(
      (_, i) => `
      <path d="M${x + 22} ${y + 48 + i * 26} l6 7 l12 -14" fill="none" stroke="${EMERALD}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="${x + 52}" y1="${y + 50 + i * 26}" x2="${x + 116}" y2="${y + 50 + i * 26}" stroke="${GREY_DARK}" stroke-width="6" stroke-linecap="round"/>`,
    )
    .join('');
  return `
    <rect x="${x}" y="${y}" width="${140}" height="${48 + lines * 26}" rx="8" fill="${WHITE}" stroke="${GREY_DARK}" stroke-width="3"/>
    <rect x="${x + 44}" y="${y - 10}" width="52" height="20" rx="6" fill="${GREY_DARK}"/>
    <rect x="${x + 22}" y="${y + 18}" width="80" height="8" rx="4" fill="${OCEAN}"/>
    ${rows}`;
};

/** A labelled horizontal bar, used for the lifecycle and hierarchy scenes. */
const bar = (x: number, y: number, w: number, label: string, colour: string, textColour = WHITE) => `
  <g>
    <rect x="${x}" y="${y}" width="${w}" height="44" rx="8" fill="${colour}"/>
    <text x="${x + 16}" y="${y + 29}" fill="${textColour}" font-family="var(--font-heading)" font-size="17" font-weight="700">${label}</text>
  </g>`;

/** A big number with a caption under it. */
const stat = (x: number, y: number, value: string, caption: string, colour = OCEAN) => `
  <g>
    <text x="${x}" y="${y}" fill="${colour}" text-anchor="middle" font-family="var(--font-heading)" font-size="46" font-weight="700">${value}</text>
    <text x="${x}" y="${y + 24}" fill="${INK}" text-anchor="middle" font-family="var(--font-heading)" font-size="13" font-weight="600">${caption}</text>
  </g>`;

/* --- the scenes ----------------------------------------------------------- */

export const SCENES: Record<string, string> = {
  'welcome-carbon': `
    ${backdrop('plain')}
    ${building(40, 120, 96, 142, GREY)}
    ${building(150, 84, 78, 178, GREY_DARK)}
    <g transform="translate(330 150)">
      <circle cx="0" cy="0" r="10" fill="${OCEAN}"/>
      <rect x="-5" y="0" width="10" height="112" rx="4" fill="${OCEAN}"/>
      <path d="M0 -8 l10 -78 l14 14 z M8 4 l74 30 l-6 18 z M-8 4 l-74 30 l6 18 z" fill="${OCEAN}" opacity="0.85"/>
    </g>
    ${chip(150, 38, 'CUTTING CARBON')}`,

  'two-carbons': `
    ${backdrop('plain')}
    <g>
      <rect x="24" y="86" width="196" height="176" rx="12" fill="${WHITE}" stroke="${GREY_DARK}" stroke-width="3"/>
      <rect x="260" y="86" width="196" height="176" rx="12" fill="${WHITE}" stroke="${GREY_DARK}" stroke-width="3"/>
    </g>
    ${chip(24, 52, 'EMBODIED', OCEAN)}
    ${chip(260, 52, 'OPERATIONAL', RUBY)}
    <g transform="translate(48 120)">
      <rect x="0" y="40" width="120" height="70" rx="4" fill="${GREY}"/>
      <path d="M0 40 l30 -26 v26 l30 -26 v26 l30 -26 v26" fill="${GREY_DARK}"/>
      <rect x="96" y="-2" width="16" height="44" rx="4" fill="${GREY_DARK}"/>
      <path d="M104 -12 q-10 -12 2 -22" fill="none" stroke="${INK}" stroke-opacity="0.3" stroke-width="5" stroke-linecap="round"/>
    </g>
    ${lorry(46, 250, 0.62)}
    ${building(290, 118, 136, 128, GREY)}
    <g stroke="${RUBY}" stroke-width="5" stroke-linecap="round" fill="none" opacity="0.8">
      <path d="M318 112 q8 -14 0 -28 M358 112 q8 -14 0 -28 M398 112 q8 -14 0 -28"/>
    </g>`,

  'scale-stats': `
    ${backdrop('plain')}
    ${stat(94, 158, '34%', 'global CO2')}
    ${stat(240, 158, '37%', 'Irish emissions', EMERALD)}
    ${stat(386, 158, '14%', 'embodied', RUBY)}
    <line x1="50" y1="214" x2="430" y2="214" stroke="${GREY_DARK}" stroke-width="3"/>
    <text x="240" y="248" fill="${INK}" text-anchor="middle" font-family="var(--font-heading)" font-size="15" font-weight="600">Buildings and construction</text>`,

  lifecycle: `
    ${backdrop('plain')}
    ${bar(40, 54, 400, 'A1–A3  Making the materials', OCEAN)}
    ${bar(40, 110, 264, 'A4–A5  Delivery and build', C.vest, INK)}
    ${bar(40, 166, 210, 'B  Use and upkeep', EMERALD)}
    ${bar(40, 222, 150, 'C  End of life', RUBY)}`,

  'where-carbon': `
    ${backdrop('plain')}
    <g>
      <rect x="150" y="60" width="180" height="150" rx="4" fill="${GREY}"/>
      <rect x="150" y="210" width="180" height="26" rx="3" fill="${OCEAN}"/>
      <rect x="132" y="236" width="216" height="26" rx="3" fill="${OCEAN}" opacity="0.8"/>
      <g fill="${OCEAN}" opacity="0.55">
        <rect x="160" y="70" width="14" height="130"/><rect x="232" y="70" width="14" height="130"/>
        <rect x="306" y="70" width="14" height="130"/>
        <rect x="150" y="104" width="180" height="10"/><rect x="150" y="150" width="180" height="10"/>
      </g>
    </g>
    ${chip(24, 96, 'FRAME', OCEAN)}
    ${chip(16, 232, 'SUBSTRUCTURE', OCEAN)}
    ${chip(344, 96, 'MOST OF IT', RUBY)}`,

  policy: `
    ${backdrop('plain')}
    ${sheet(86, 58, 130, 184, 6)}
    ${sheet(250, 58, 130, 184, 6)}
    ${tick(216, 224, 20)}
    ${chip(86, 262, 'ACTION PLAN')}
    ${chip(266, 262, 'PROCUREMENT', EMERALD)}`,

  epd: `
    ${backdrop('plain')}
    ${sheet(120, 50, 150, 200, 6)}
    <g transform="translate(232 214)"><circle cx="0" cy="0" r="26" fill="${EMERALD}"/>
      <path d="M-10 2 l7 8 l14 -16" fill="none" stroke="${WHITE}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></g>
    <g transform="translate(316 156)">
      <circle cx="0" cy="0" r="40" fill="none" stroke="${OCEAN}" stroke-width="9"/>
      <line x1="28" y1="28" x2="58" y2="58" stroke="${OCEAN}" stroke-width="11" stroke-linecap="round"/>
    </g>
    ${chip(96, 262, 'EPD — EN 15804')}`,

  hierarchy: `
    ${backdrop('plain')}
    ${bar(30, 46, 200, '1  Build nothing', EMERALD)}
    ${bar(66, 102, 210, '2  Build less', OCEAN)}
    ${bar(102, 158, 230, '3  Build clever', C.vest, INK)}
    ${bar(138, 214, 250, '4  Build efficiently', RUBY)}
    ${arrow(404, 150, 0, INK)}
    <path d="M420 60 L420 250" stroke="${INK}" stroke-width="4" stroke-linecap="round" opacity="0.45"/>
    <path d="M412 238 l8 14 l8 -14" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" opacity="0.45"/>`,

  refurb: `
    ${backdrop('plain')}
    ${building(60, 92, 130, 170, GREY_DARK)}
    <g stroke="${EMERALD}" stroke-width="6" fill="none">
      <rect x="52" y="84" width="146" height="186" rx="8" stroke-dasharray="14 10"/>
    </g>
    ${tick(196, 92, 22)}
    ${building(300, 122, 120, 140, GREY)}
    ${cross(410, 118, 22)}
    ${chip(50, 44, 'KEEP AND ADAPT', EMERALD)}
    ${chip(300, 44, 'DEMOLISH', RUBY)}`,

  'right-size': `
    ${backdrop('plain')}
    <g fill="${GREY_DARK}">
      <rect x="40" y="110" width="26" height="150" rx="4"/><rect x="150" y="110" width="26" height="150" rx="4"/>
      <rect x="30" y="92" width="156" height="20" rx="4"/>
      <rect x="95" y="112" width="18" height="148" rx="4"/>
    </g>
    ${tick(196, 96, 20)}
    <g fill="${GREY}">
      <rect x="270" y="110" width="34" height="150" rx="4"/><rect x="410" y="110" width="34" height="150" rx="4"/>
      <rect x="258" y="80" width="198" height="32" rx="4"/>
    </g>
    ${cross(440, 66, 20)}
    ${chip(30, 44, 'RATIONAL GRID', EMERALD)}
    ${chip(262, 44, 'OVER-SPECIFIED', RUBY)}`,

  concrete: `
    ${backdrop()}
    ${mixer(40, 240, 0.95)}
    <g transform="translate(300 96)">
      <rect x="0" y="0" width="140" height="120" rx="10" fill="${WHITE}" stroke="${GREY_DARK}" stroke-width="3"/>
      <rect x="14" y="20" width="112" height="34" rx="5" fill="${GREY_DARK}"/>
      <rect x="14" y="20" width="${112 * 0.3}" height="34" rx="5" fill="${EMERALD}"/>
      <text x="14" y="82" fill="${INK}" font-family="var(--font-heading)" font-size="15" font-weight="700">30%+ replaced</text>
      <text x="14" y="104" fill="${INK}" font-family="var(--font-heading)" font-size="13" font-weight="600" opacity="0.7">GGBS / fly ash</text>
    </g>`,

  steel: `
    ${backdrop('plain')}
    ${beam(70, 132, 170)}
    <g transform="translate(340 160)" fill="none" stroke="${EMERALD}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round">
      <path d="M-44 14 a52 52 0 0 1 30 -62"/><path d="M28 -34 a52 52 0 0 1 16 66"/><path d="M14 44 a52 52 0 0 1 -66 -18"/>
    </g>
    <g fill="${EMERALD}">
      <path d="M296 104 l18 8 l-16 12 z"/><path d="M382 138 l4 20 l-20 -6 z"/><path d="M296 214 l-2 -20 l20 8 z"/>
    </g>
    ${chip(64, 220, 'EAF + RECYCLED CONTENT', EMERALD)}`,

  timber: `
    ${backdrop('plain')}
    ${panel(70, 110, 150, 110)}
    ${tree(330, 250, 1.15)}
    ${arrow(240, 166, 52, EMERALD)}
    ${chip(60, 244, 'STORES CARBON IN USE', EMERALD)}`,

  specify: `
    ${backdrop('plain')}
    ${sheet(70, 56, 150, 200, 7)}
    ${sheet(268, 86, 130, 150, 5)}
    ${arrow(230, 160, 30)}
    ${tick(384, 224, 20)}
    ${chip(60, 264, 'SPEC')}
    ${chip(262, 264, 'PRODUCT DATA', EMERALD)}`,

  dfma: `
    ${backdrop()}
    ${panel(60, 120, 120, 90)}
    ${panel(200, 120, 120, 90)}
    <g fill="${OCEAN}">
      <circle cx="186" cy="140" r="7"/><circle cx="186" cy="170" r="7"/><circle cx="186" cy="200" r="7"/>
    </g>
    ${worker('stand', { x: 330, y: 104, s: 0.9 })}
    ${chip(56, 62, 'BOLTED, NOT GLUED', EMERALD)}`,

  'site-overview': `
    ${backdrop()}
    ${cabin(28, 176, 110)}
    ${genset(166, 196)}
    ${lorry(300, 262, 0.8)}
    ${worker('stand', { x: 236, y: 118, s: 0.8 })}
    ${chip(28, 50, 'PLANT · CABINS · TRANSPORT · WASTE')}`,

  'grid-vs-genset': `
    ${backdrop('plain')}
    ${pylon(110, 250, 130)}
    ${tick(180, 96, 20)}
    ${genset(300, 190)}
    ${cross(430, 150, 20)}
    ${chip(40, 44, 'GRID CONNECTION', EMERALD)}
    ${chip(286, 44, 'DIESEL GENERATOR', RUBY)}`,

  plant: `
    ${backdrop()}
    <g transform="translate(60 150)">
      <rect x="0" y="40" width="120" height="16" rx="8" fill="${INK}"/>
      <rect x="18" y="0" width="70" height="42" rx="8" fill="${EMERALD}"/>
      <path d="M88 10 l54 -34 l16 10 l-44 44 z" fill="${EMERALD}"/>
      <circle cx="26" cy="48" r="9" fill="${C.bg}"/><circle cx="96" cy="48" r="9" fill="${C.bg}"/>
    </g>
    <g transform="translate(300 176)">
      <rect x="0" y="0" width="36" height="58" rx="6" fill="${OCEAN}"/>
      <path d="M18 14 l-8 16 h10 l-6 16" fill="none" stroke="${WHITE}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M36 30 h40" stroke="${OCEAN}" stroke-width="6" stroke-linecap="round"/>
    </g>
    ${chip(44, 60, 'ELECTRIC AND RIGHT-SIZED', EMERALD)}`,

  idling: `
    ${backdrop('plain')}
    <g transform="translate(140 170)">
      <rect x="-70" y="-40" width="140" height="80" rx="12" fill="${GREY_DARK}"/>
      <rect x="-40" y="-64" width="30" height="28" rx="6" fill="${GREY_DARK}"/>
      <path d="M-30 -74 q-8 -10 2 -18" fill="none" stroke="${RUBY}" stroke-width="5" stroke-linecap="round"/>
    </g>
    <g transform="translate(340 168)">
      <circle cx="0" cy="0" r="52" fill="${WHITE}" stroke="${GREY_DARK}" stroke-width="5"/>
      <path d="M0 -34 V0 l24 16" fill="none" stroke="${RUBY}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    ${chip(120, 254, 'SWITCH IT OFF', RUBY)}`,

  fuel: `
    ${backdrop()}
    <g transform="translate(70 160)">
      <rect x="0" y="0" width="150" height="86" rx="10" fill="${GREY_DARK}"/>
      <rect x="18" y="16" width="40" height="30" rx="4" fill="${C.bg}"/>
      <circle cx="38" cy="96" r="12" fill="${INK}"/><circle cx="118" cy="96" r="12" fill="${INK}"/>
      <path d="M150 30 h30 v46" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
    </g>
    ${sheet(280, 96, 130, 140, 4)}
    ${tick(398, 220, 18)}
    ${chip(274, 58, 'CERTIFIED FEEDSTOCK', EMERALD)}`,

  transport: `
    ${backdrop()}
    ${lorry(40, 236, 0.9)}
    ${lorry(250, 262, 0.62, EMERALD)}
    ${arrow(190, 130, 90, OCEAN)}
    ${chip(40, 58, 'FULL LOADS, FEWER TRIPS', EMERALD)}`,

  cabins: `
    ${backdrop()}
    ${cabin(50, 168, 150)}
    ${cabin(60, 226, 150)}
    ${meter(330, 176)}
    <g transform="translate(330 232)">
      <rect x="-30" y="-10" width="60" height="20" rx="10" fill="${EMERALD}"/>
      <text x="0" y="5" fill="${WHITE}" text-anchor="middle" font-family="var(--font-heading)" font-size="12" font-weight="700">LED</text>
    </g>
    ${chip(40, 56, 'METER THE COMPOUND')}`,

  'materials-site': `
    ${backdrop()}
    ${box(60, 168, 76, 60)}
    ${box(150, 168, 76, 60)}
    ${box(104, 106, 76, 60)}
    <path d="M44 100 l100 -34 l100 34" fill="none" stroke="${OCEAN}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    ${skip(300, 196, 'WASTE', RUBY, 80)}
    ${chip(40, 46, 'STORE IT, DO NOT WASTE IT', EMERALD)}`,

  'waste-stats': `
    ${backdrop('plain')}
    ${stat(140, 150, '7.85m', 'tonnes C&D waste, 2024')}
    ${stat(350, 150, '81%', 'recycled (excl. soil)', EMERALD)}
    ${skip(90, 200, 'TIMBER', OCEAN, 90)}
    ${skip(300, 200, 'METAL', EMERALD, 90)}`,

  'waste-hierarchy': `
    ${backdrop('plain')}
    ${bar(40, 48, 380, 'Prevent', EMERALD)}
    ${bar(70, 100, 320, 'Reuse', OCEAN)}
    ${bar(100, 152, 260, 'Recycle', C.vest, INK)}
    ${bar(130, 204, 200, 'Recover', RUBY)}
    ${bar(160, 256, 140, 'Dispose', GREY_DARK, INK)}`,

  segregate: `
    ${backdrop()}
    ${skip(30, 178, 'TIMBER', C.box, 96)}
    ${skip(146, 178, 'METAL', OCEAN, 96)}
    ${skip(262, 178, 'BOARD', EMERALD, 96)}
    ${skip(378, 178, 'GENERAL', GREY_DARK, 78)}
    ${chip(30, 52, 'SEPARATE STREAMS RECOVER MORE', EMERALD)}`,

  reuse: `
    ${backdrop()}
    ${beam(50, 150, 150)}
    <g fill="${C.box}">
      <rect x="250" y="164" width="52" height="24" rx="3"/><rect x="308" y="164" width="52" height="24" rx="3"/>
      <rect x="278" y="194" width="52" height="24" rx="3"/><rect x="336" y="194" width="52" height="24" rx="3"/>
    </g>
    ${tick(230, 100, 20)}
    ${chip(40, 240, 'SURVEY FOR REUSE FIRST', EMERALD)}`,

  measure: `
    ${backdrop('plain')}
    <rect x="44" y="60" width="392" height="200" rx="14" fill="${WHITE}" stroke="${GREY_DARK}" stroke-width="3"/>
    ${meter(122, 140, 40, EMERALD)}
    ${meter(240, 140, 40, OCEAN)}
    ${meter(358, 140, 40, RUBY)}
    <g fill="${INK}" font-family="var(--font-heading)" font-size="14" font-weight="600" text-anchor="middle">
      <text x="122" y="208">Fuel</text><text x="240" y="208">Energy</text><text x="358" y="208">Waste</text>
    </g>
    ${chip(150, 226, 'AGAINST A TARGET')}`,

  'report-carbon': `
    ${backdrop('plain')}
    ${sheet(90, 48, 160, 210, 7)}
    ${sheet(270, 92, 120, 140, 5)}
    ${sheet(300, 128, 120, 140, 5)}
    ${tick(238, 232, 20)}
    ${chip(262, 46, 'EVIDENCE ATTACHED', EMERALD)}`,

  handover: `
    ${backdrop('plain')}
    ${building(90, 96, 150, 166, GREY_DARK, C.bg)}
    ${meter(300, 128, 32, EMERALD)}
    ${clipboard(292, 176, 2)}
    ${arrow(250, 140, 40, OCEAN)}
    ${chip(80, 48, 'COMMISSION AND PROVE IT', EMERALD)}`,

  actions: `
    ${backdrop('plain')}
    ${clipboard(170, 56, 4)}
    ${chip(30, 84, 'ASK FOR EPDs')}
    ${chip(30, 140, 'CHECK THE GRID', EMERALD)}
    ${chip(30, 196, 'INDUCT ON IDLING', C.vest)}`,
};
