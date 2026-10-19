/* ============================================================================
 * APP SCREENS — PACSANA WALKTHROUGH
 *
 * Illustrative phone screens drawn on a 360 × 640 portrait grid. They are
 * mock-ups of the kind of screen the walkthrough describes, not renderings of
 * the real product, and every figure shown is made up for the demo.
 *
 * Chart marks follow the house rules: one data colour per screen, thin marks
 * with rounded ends, recessive grid lines, and a visible label beside every
 * value so nothing is carried by colour alone. Green and red appear only as
 * status, always with a word beside them.
 * ========================================================================== */

const OCEAN = 'var(--ocean, #005bb3)';
const OCEAN_SOFT = 'var(--ice, #b2dae4)';
const EMERALD = 'var(--emerald, #029456)';
const RUBY = 'var(--ruby, #d8226c)';
const TANGERINE = 'var(--tangerine, #f86a38)';
const INK = '#102a3a';
const MUTED = '#63798a';
const LINE = '#dce5ec';
const CARD = '#ffffff';
const APP_BG = '#f1f6fa';

/* --- phone chrome --------------------------------------------------------- */

const phone = (inner: string) => `
  <rect x="20" y="10" width="320" height="620" rx="44" fill="#1b2a35"/>
  <rect x="28" y="18" width="304" height="604" rx="38" fill="${APP_BG}"/>
  <rect x="140" y="26" width="80" height="16" rx="8" fill="#1b2a35"/>
  <g>${inner}</g>
  <rect x="146" y="600" width="68" height="5" rx="2.5" fill="${INK}" opacity="0.25"/>`;

/** App header with a title and optional subtitle. */
const header = (title: string, sub = '') => `
  <rect x="28" y="18" width="304" height="96" rx="38" fill="${OCEAN}"/>
  <rect x="28" y="86" width="304" height="28" fill="${OCEAN}"/>
  <text x="52" y="74" fill="#ffffff" font-family="var(--font-heading)" font-size="21" font-weight="700">${title}</text>
  ${sub ? `<text x="52" y="98" fill="#ffffff" fill-opacity="0.85" font-family="var(--font-heading)" font-size="13" font-weight="600">${sub}</text>` : ''}`;

/** White card. */
const card = (y: number, h: number, inner = '') => `
  <rect x="44" y="${y}" width="272" height="${h}" rx="16" fill="${CARD}" stroke="${LINE}" stroke-width="2"/>
  ${inner}`;

const label = (x: number, y: number, text: string, size = 13, colour = MUTED, weight = 600, anchor = 'start') =>
  `<text x="${x}" y="${y}" fill="${colour}" text-anchor="${anchor}" font-family="var(--font-heading)" font-size="${size}" font-weight="${weight}">${text}</text>`;

/** Big number with a caption — the hero-number form, no plot needed. */
const hero = (x: number, y: number, value: string, unit: string, caption: string) => `
  <text x="${x}" y="${y}" font-family="var(--font-heading)" font-weight="700">
    <tspan fill="${INK}" font-size="40">${value}</tspan><tspan fill="${MUTED}" font-size="15" font-weight="600" dx="8">${unit}</tspan>
  </text>
  ${label(x, y + 22, caption, 13, MUTED, 600)}`;

/** Row of thin vertical bars with a labelled baseline. Single series. */
const bars = (x: number, y: number, h: number, values: number[], labels: string[], colour = OCEAN) => {
  const gap = 10;
  const w = 16;
  const max = Math.max(...values, 1);
  const marks = values
    .map((v, i) => {
      const bh = Math.max(6, (v / max) * h);
      return `<rect x="${x + i * (w + gap)}" y="${y + h - bh}" width="${w}" height="${bh}" rx="4" fill="${colour}"/>`;
    })
    .join('');
  const ticks = labels
    .map((t, i) => label(x + i * (w + gap) + w / 2, y + h + 18, t, 11, MUTED, 600, 'middle'))
    .join('');
  return `<line x1="${x - 6}" y1="${y + h}" x2="${x + values.length * (w + gap)}" y2="${y + h}" stroke="${LINE}" stroke-width="2"/>${marks}${ticks}`;
};

/** Progress ring with the value written inside it. */
const ring = (cx: number, cy: number, r: number, pct: number, value: string, caption: string, colour = OCEAN) => {
  const c = 2 * Math.PI * r;
  return `
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${LINE}" stroke-width="12"/>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${colour}" stroke-width="12" stroke-linecap="round"
      stroke-dasharray="${(c * pct).toFixed(1)} ${c.toFixed(1)}" transform="rotate(-90 ${cx} ${cy})"/>
    ${label(cx, cy + 4, value, 22, INK, 700, 'middle')}
    ${label(cx, cy + 24, caption, 11, MUTED, 600, 'middle')}`;
};

/** A horizontal progress bar with its own label and value. */
const meterRow = (x: number, y: number, w: number, pct: number, name: string, value: string, colour = OCEAN) => `
  ${label(x, y - 8, name, 13, INK, 600)}
  ${label(x + w, y - 8, value, 13, MUTED, 600, 'end')}
  <rect x="${x}" y="${y}" width="${w}" height="10" rx="5" fill="${LINE}"/>
  <rect x="${x}" y="${y}" width="${Math.max(10, w * pct)}" height="10" rx="5" fill="${colour}"/>`;

/** Status pill — colour plus a word, never colour alone. */
const status = (x: number, y: number, text: string, kind: 'good' | 'watch' | 'alert' = 'good') => {
  const colour = kind === 'good' ? EMERALD : kind === 'watch' ? TANGERINE : RUBY;
  const glyph = kind === 'good' ? 'M-4 0 l3 3 l6 -7' : kind === 'watch' ? 'M0 -5 v6 M0 4 v0.1' : 'M-4 -4 l8 8 M4 -4 l-8 8';
  return `
    <rect x="${x}" y="${y}" width="${Math.max(74, text.length * 8 + 34)}" height="26" rx="13" fill="${colour}"/>
    <g transform="translate(${x + 16} ${y + 13})" stroke="#ffffff" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="${glyph}"/></g>
    ${label(x + 28, y + 18, text, 12, '#ffffff', 700)}`;
};

/** A person chip, used for the family and caregiver screens. */
const person = (x: number, y: number, name: string, role: string, colour = OCEAN) => `
  <circle cx="${x + 20}" cy="${y + 20}" r="20" fill="${colour}" opacity="0.15"/>
  <circle cx="${x + 20}" cy="${y + 14}" r="7" fill="${colour}"/>
  <path d="M${x + 7} ${y + 33} a13 13 0 0 1 26 0 z" fill="${colour}"/>
  ${label(x + 52, y + 18, name, 14, INK, 700)}
  ${label(x + 52, y + 34, role, 12, MUTED, 600)}`;

/** A line of text inside a card, used for advice and notifications. */
const line = (x: number, y: number, w: number, opacity = 0.45) =>
  `<rect x="${x}" y="${y}" width="${w}" height="7" rx="3.5" fill="${MUTED}" opacity="${opacity}"/>`;

/** Simple sparkline for trends. One series, no legend needed. */
const spark = (x: number, y: number, w: number, h: number, points: number[], colour = OCEAN) => {
  const max = Math.max(...points), min = Math.min(...points);
  const span = max - min || 1;
  const d = points
    .map((p, i) => `${(x + (i / (points.length - 1)) * w).toFixed(1)},${(y + h - ((p - min) / span) * h).toFixed(1)}`)
    .join(' L');
  return `<path d="M${d}" fill="none" stroke="${colour}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`;
};

/* --- the screens ---------------------------------------------------------- */

export const SCREENS: Record<string, string> = {
  home: phone(`
    ${header('Good morning, Peg', 'Tuesday · everything looks normal')}
    ${card(132, 132, `
      ${ring(112, 198, 42, 0.68, '68%', 'of goal')}
      ${label(186, 176, 'Today so far', 13, MUTED, 600)}
      ${label(186, 200, '4,120 steps', 18, INK, 700)}
      ${status(186, 212, 'On track', 'good')}
    `)}
    ${card(280, 96, `
      ${label(64, 312, 'Last night', 13, MUTED, 600)}
      ${label(64, 338, '7h 10m asleep', 18, INK, 700)}
      ${status(64, 350, 'Slept well', 'good')}
    `)}
    ${card(392, 96, `
      ${label(64, 424, 'Out of the house', 13, MUTED, 600)}
      ${label(64, 450, '1 trip · 35 min', 18, INK, 700)}
    `)}
    ${card(504, 84, `
      ${label(64, 534, 'Movement sensor', 13, MUTED, 600)}
      ${label(64, 558, 'Connected · battery 82%', 14, INK, 700)}
    `)}`),

  connected: phone(`
    ${header('Your circle', 'Who can see how you are doing')}
    ${card(132, 210, `
      ${person(64, 148, 'Peg', 'Wearing the sensor')}
      <line x1="64" y1="206" x2="296" y2="206" stroke="${LINE}" stroke-width="2"/>
      ${person(64, 214, 'Mary', 'Daughter · full access', EMERALD)}
      <line x1="64" y1="272" x2="296" y2="272" stroke="${LINE}" stroke-width="2"/>
      ${person(64, 280, 'Tom', 'Care worker · alerts only', TANGERINE)}
    `)}
    ${card(362, 96, `
      ${label(64, 394, 'Peg decides who sees what', 13, MUTED, 600)}
      ${label(64, 418, 'Sharing can be changed', 15, INK, 700)}
      ${label(64, 438, 'or switched off anytime', 15, INK, 700)}
    `)}
    ${card(478, 110, `
      ${label(64, 508, 'Invite someone', 13, MUTED, 600)}
      <rect x="64" y="522" width="232" height="44" rx="12" fill="${OCEAN}"/>
      ${label(180, 550, 'Send an invitation', 14, '#ffffff', 700, 'middle')}
    `)}`),

  'day-night': phone(`
    ${header('Day and night', 'Rest, then movement')}
    ${card(132, 186, `
      ${label(64, 160, 'Sleep this week', 14, INK, 700)}
      ${bars(74, 178, 92, [7.2, 6.8, 7.4, 5.9, 7.1, 7.6, 7.0], ['M', 'T', 'W', 'T', 'F', 'S', 'S'])}
      ${label(64, 300, 'Average 7h 0m', 12, MUTED, 600)}
    `)}
    ${card(336, 186, `
      ${label(64, 364, 'Daytime movement', 14, INK, 700)}
      ${bars(74, 382, 92, [3.1, 4.2, 3.8, 2.4, 4.6, 5.1, 4.0], ['M', 'T', 'W', 'T', 'F', 'S', 'S'])}
      ${label(64, 504, 'Active hours per day', 12, MUTED, 600)}
    `)}
    ${status(64, 540, 'Steady pattern', 'good')}`),

  sleep: phone(`
    ${header('Sleep', 'Last night in detail')}
    ${card(132, 150, `
      ${hero(64, 186, '7h 10m', 'asleep', 'In bed 22:40 · up 06:35')}
      ${meterRow(64, 244, 232, 0.86, 'Settled', '86% of the night')}
    `)}
    ${card(298, 170, `
      ${label(64, 328, 'Restless periods', 14, INK, 700)}
      ${bars(74, 346, 76, [1, 0, 2, 1, 0, 1, 3], ['M', 'T', 'W', 'T', 'F', 'S', 'S'])}
      ${label(64, 452, 'Three last night — worth watching', 12, MUTED, 600)}
    `)}
    ${card(490, 96, `
      ${label(64, 514, 'Compared with usual', 13, MUTED, 600)}
      ${label(64, 538, 'Slightly more restless', 15, INK, 700)}
      ${status(64, 550, 'Watch', 'watch')}
    `)}`),

  skin: phone(`
    ${header('Skin health', 'Time spent in one position')}
    ${card(132, 178, `
      ${ring(112, 214, 44, 0.24, '24%', 'seated')}
      ${label(186, 186, 'Longest spell', 13, MUTED, 600)}
      ${label(186, 210, '1h 50m', 20, INK, 700)}
      ${label(186, 234, 'in the armchair', 13, MUTED, 600)}
      ${status(186, 248, 'Reposition', 'watch')}
    `)}
    ${card(326, 160, `
      ${label(64, 354, 'Position changes today', 14, INK, 700)}
      ${bars(74, 372, 70, [4, 6, 3, 5, 7, 4, 6], ['8', '10', '12', '14', '16', '18', '20'])}
      ${label(64, 472, 'By hour of the day', 12, MUTED, 600)}
    `)}
    ${card(504, 84, `
      ${label(64, 534, 'Pressure risk', 13, MUTED, 600)}
      ${label(64, 558, 'Low, with prompts', 16, INK, 700)}
    `)}`),

  bathroom: phone(`
    ${header('Night-time', 'Trips to the bathroom')}
    ${card(132, 150, `
      ${hero(64, 190, '2', 'trips', 'Between 22:40 and 06:35')}
      ${label(64, 228, '01:15 and 04:40', 14, INK, 700)}
    `)}
    ${card(298, 176, `
      ${label(64, 328, 'Trips per night', 14, INK, 700)}
      ${bars(74, 346, 80, [1, 2, 1, 3, 2, 2, 2], ['M', 'T', 'W', 'T', 'F', 'S', 'S'])}
      ${label(64, 458, 'Average 1.9 — steady', 12, MUTED, 600)}
    `)}
    ${card(496, 90, `
      ${label(64, 524, 'Why it matters', 13, MUTED, 600)}
      ${label(64, 550, 'A change can be an early sign', 14, INK, 700)}
    `)}`),

  outdoors: phone(`
    ${header('Getting outside', 'Trips beyond the front door')}
    ${card(132, 196, `
      <rect x="60" y="148" width="240" height="120" rx="12" fill="${OCEAN_SOFT}" opacity="0.5"/>
      <path d="M78 250 q52 -46 96 -20 q44 26 106 -40" fill="none" stroke="${OCEAN}" stroke-width="4" stroke-linecap="round" stroke-dasharray="1 10"/>
      <circle cx="78" cy="250" r="7" fill="${OCEAN}"/><circle cx="280" cy="190" r="7" fill="${EMERALD}"/>
      ${label(64, 296, 'Walk to the shop and back · 35 min', 12, MUTED, 600)}
    `)}
    ${card(346, 150, `
      ${meterRow(64, 392, 232, 0.72, 'Outdoor time this week', '3h 10m')}
      ${meterRow(64, 448, 232, 0.4, 'Trips out', '4 of 7 days')}
    `)}
    ${status(64, 520, 'More than last week', 'good')}`),

  social: phone(`
    ${header('Company', 'Time with other people')}
    ${card(132, 172, `
      ${hero(64, 190, '9h', 'this week', 'Visitors and time out')}
      ${spark(70, 232, 220, 36, [4, 6, 5, 7, 6, 8, 9])}
      ${label(64, 288, 'Trending up over seven weeks', 12, MUTED, 600)}
    `)}
    ${card(322, 176, `
      ${person(64, 344, 'Mary', 'Visited Tuesday · 2h', EMERALD)}
      <line x1="64" y1="402" x2="296" y2="402" stroke="${LINE}" stroke-width="2"/>
      ${person(64, 410, 'Day centre', 'Thursday · 3h', OCEAN)}
    `)}
    ${card(518, 72, `
      ${label(64, 546, 'Quiet weekends — worth a call', 13, INK, 700)}
    `)}`),

  advice: phone(`
    ${header('Suggestions', 'Small things that might help')}
    ${card(132, 128, `
      <circle cx="76" cy="164" r="14" fill="${EMERALD}" opacity="0.18"/>
      <path d="M70 164 l5 5 l9 -11" fill="none" stroke="${EMERALD}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      ${label(100, 162, 'Try a short walk after lunch', 13, INK, 700)}
      ${line(100, 176, 180)}
      ${line(100, 192, 140)}
      ${label(100, 226, 'Why: your quietest hours', 11, MUTED, 600)}
    `)}
    ${card(278, 128, `
      <circle cx="76" cy="310" r="14" fill="${OCEAN}" opacity="0.18"/>
      <path d="M76 302 v10 M76 318 v0.1" stroke="${OCEAN}" stroke-width="3" stroke-linecap="round"/>
      ${label(100, 308, 'Stand up every hour or so', 13, INK, 700)}
      ${line(100, 322, 170)}
      ${line(100, 338, 120)}
      ${label(100, 372, 'Why: long spells in the armchair', 11, MUTED, 600)}
    `)}
    ${card(424, 128, `
      <circle cx="76" cy="456" r="14" fill="${TANGERINE}" opacity="0.2"/>
      <path d="M76 448 v10 M76 464 v0.1" stroke="${TANGERINE}" stroke-width="3" stroke-linecap="round"/>
      ${label(100, 454, 'Ask about the evening routine', 13, INK, 700)}
      ${line(100, 468, 160)}
      ${line(100, 484, 150)}
      ${label(100, 518, 'Why: restless nights this week', 11, MUTED, 600)}
    `)}`),

  reports: phone(`
    ${header('Reports', 'Inside, outside and the WHO goal')}
    ${card(132, 170, `
      ${label(64, 160, 'Activity by location', 14, INK, 700)}
      ${meterRow(64, 190, 232, 0.62, 'Inside the home', '62%')}
      ${meterRow(64, 246, 232, 0.38, 'Outside the home', '38%')}
    `)}
    ${card(320, 190, `
      ${label(64, 348, 'WHO weekly target', 14, INK, 700)}
      ${ring(112, 424, 42, 0.78, '117', 'of 150 min')}
      ${label(186, 404, 'Moderate activity', 13, MUTED, 600)}
      ${label(186, 428, '78% of the goal', 16, INK, 700)}
      ${status(186, 442, 'Close', 'watch')}
    `)}
    ${card(530, 60, `
      ${label(64, 556, 'Share this report with the GP', 13, INK, 700)}
    `)}`),

  mobility: phone(`
    ${header('Mobility', 'Movement, pace and fall risk')}
    ${card(132, 120, `
      ${hero(64, 186, '4,120', 'steps', 'Daily average this week')}
      ${spark(70, 206, 220, 28, [3.2, 3.8, 3.5, 4.1, 3.9, 4.4, 4.2])}
    `)}
    ${card(268, 120, `
      ${hero(64, 322, '0.9', 'm/s', 'Typical walking pace')}
      ${status(220, 300, 'Normal', 'good')}
      ${label(64, 366, 'A slowing pace is an early warning', 11, MUTED, 600)}
    `)}
    ${card(404, 150, `
      ${label(64, 434, 'Fall risk', 14, INK, 700)}
      ${meterRow(64, 462, 232, 0.28, 'Current estimate', 'Low')}
      ${label(64, 510, 'From pace, steadiness and night activity', 11, MUTED, 600)}
    `)}`),

  'always-on': phone(`
    ${header('Always watching', 'Analysis runs day and night')}
    ${card(132, 156, `
      ${label(64, 160, 'Last 24 hours', 14, INK, 700)}
      <rect x="64" y="176" width="232" height="18" rx="9" fill="${LINE}"/>
      <rect x="64" y="176" width="86" height="18" rx="9" fill="${OCEAN}" opacity="0.55"/>
      <rect x="152" y="176" width="52" height="18" rx="9" fill="${OCEAN}"/>
      <rect x="206" y="176" width="90" height="18" rx="9" fill="${OCEAN}" opacity="0.35"/>
      ${label(64, 212, 'Asleep', 11, MUTED, 600)}
      ${label(178, 212, 'Active', 11, MUTED, 600, 'middle')}
      ${label(296, 212, 'Resting', 11, MUTED, 600, 'end')}
      ${label(64, 254, 'No gaps in cover, no cameras', 13, INK, 700)}
    `)}
    ${card(304, 130, `
      ${label(64, 334, 'What the pattern shows', 14, INK, 700)}
      ${line(64, 352, 210)}
      ${line(64, 372, 180)}
      ${line(64, 392, 200)}
      ${label(64, 420, 'Compared against Peg’s own normal', 11, MUTED, 600)}
    `)}
    ${card(456, 130, `
      ${person(64, 476, 'Mary', 'Sees the same picture', EMERALD)}
      ${label(64, 550, 'Updated continuously', 12, MUTED, 600)}
    `)}`),

  alerts: phone(`
    ${header('Alerts', 'Told as it happens')}
    <g>
      <rect x="44" y="132" width="272" height="86" rx="16" fill="${CARD}" stroke="${RUBY}" stroke-width="3"/>
      <circle cx="78" cy="162" r="14" fill="${RUBY}"/>
      <path d="M78 154 v10 M78 170 v0.1" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
      ${label(102, 160, 'No movement since 09:10', 14, INK, 700)}
      ${label(102, 180, 'Usually active by 08:00', 12, MUTED, 600)}
      ${label(102, 202, 'Tap to call Peg', 12, RUBY, 700)}
    </g>
    ${card(236, 78, `
      <circle cx="78" cy="268" r="14" fill="${TANGERINE}"/>
      <path d="M78 260 v10 M78 276 v0.1" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
      ${label(102, 266, 'Left the house at 21:40', 14, INK, 700)}
      ${label(102, 286, 'Later than usual', 12, MUTED, 600)}
    `)}
    ${card(330, 78, `
      <circle cx="78" cy="362" r="14" fill="${EMERALD}"/>
      <path d="M72 362 l5 5 l9 -11" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      ${label(102, 360, 'Back home at 22:15', 14, INK, 700)}
      ${label(102, 380, 'Settled for the night', 12, MUTED, 600)}
    `)}
    ${card(424, 150, `
      ${label(64, 454, 'Who gets told, and when', 14, INK, 700)}
      ${meterRow(64, 482, 232, 1, 'Mary — all alerts', 'On')}
      ${meterRow(64, 530, 232, 0.5, 'Tom — urgent only', 'On')}
    `)}`),

  reassurance: phone(`
    ${header('Peace of mind', 'For Peg, and for everyone else')}
    ${card(132, 200, `
      ${ring(180, 232, 58, 1, 'All well', 'today', EMERALD)}
      ${label(180, 312, 'Nothing needs your attention', 13, MUTED, 600, 'middle')}
    `)}
    ${card(352, 120, `
      ${person(64, 376, 'Mary', 'Checked in at 08:05', EMERALD)}
      ${label(64, 442, 'No news really is good news', 12, MUTED, 600)}
    `)}
    ${card(488, 100, `
      ${label(180, 522, 'Eyes and ears', 18, INK, 700, 'middle')}
      ${label(180, 548, 'when you cannot be there', 14, MUTED, 600, 'middle')}
    `)}`),
};
