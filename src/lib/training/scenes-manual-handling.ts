/* ============================================================================
 * SCENES — SAFE MANUAL HANDLING
 *
 * One entry per picture. A slide names one of these keys in its `graphic`
 * field. Drawing tools come from illustration-kit.ts.
 * ========================================================================== */

import { C, OCEAN, RUBY, EMERALD, INK, boot, hand, worker, backdrop, box, trolley, sheet, tick, cross, arrow, chip } from './illustration-kit.ts';

export const SCENES: Record<string, string> = {
  welcome: `
    ${backdrop()}
    ${worker('stand', { x: 96, y: 104, s: 1 })}
    ${worker('carry', { x: 236, y: 104, s: 1 })}
    ${box(320, 174, 58, 46)}
    ${chip(158, 44, 'SAFE MANUAL HANDLING')}`,

  definition: `
    ${backdrop()}
    ${worker('carry', { x: 34, y: 104 })}
    ${box(118, 174, 54, 44)}
    ${worker('push', { x: 232, y: 104 })}
    ${trolley(362, 166)}
    ${box(372, 150, 60, 48)}`,

  injury: `
    ${backdrop()}
    ${worker('ache', { x: 150, y: 100, s: 1.05 })}
    <g transform="translate(276 176)">
      <path d="M0 0 l18 -8 l-7 18 l20 -5" fill="none" stroke="${RUBY}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    ${chip(318, 140, 'PAIN', RUBY)}`,

  spine: `
    ${backdrop('plain')}
    <rect x="150" y="26" width="180" height="268" rx="18" fill="${C.bgSoft}"/>
    <g transform="translate(240 58)">
      ${Array.from({ length: 8 })
        .map(
          (_, i) =>
            `<rect x="-24" y="${i * 27}" width="48" height="17" rx="7" fill="${C.shirt}"/>
             <rect x="-18" y="${i * 27 + 17}" width="36" height="8" rx="4" fill="${C.band}"/>`,
        )
        .join('')}
      <circle cx="-44" cy="118" r="7" fill="${RUBY}"/>
    </g>
    ${chip(46, 148, 'DISC', RUBY)}
    ${chip(330, 74, 'VERTEBRA')}`,

  law: `
    ${backdrop('plain')}
    ${sheet(88, 66, 124, 180, 6)}
    ${sheet(258, 90, 116, 156, 5)}
    ${tick(206, 224, 22)}
    ${chip(88, 258, 'ACT 2005')}
    ${chip(258, 258, 'REGS 2007')}`,

  regs: `
    ${backdrop('plain')}
    ${sheet(116, 48, 152, 210, 7)}
    <g transform="translate(288 178)">
      <circle cx="0" cy="0" r="42" fill="none" stroke="${OCEAN}" stroke-width="9"/>
      <line x1="30" y1="30" x2="60" y2="60" stroke="${OCEAN}" stroke-width="11" stroke-linecap="round"/>
    </g>`,

  avoid: `
    ${backdrop()}
    ${worker('stoop', { x: 16, y: 104, s: 0.92 })}
    ${box(110, 212, 44, 34)}
    ${cross(60, 62, 20)}
    ${worker('push', { x: 218, y: 104, s: 0.92 })}
    ${trolley(344, 172)}
    ${box(352, 158, 56, 44)}
    ${tick(330, 62, 20)}`,

  assess: `
    ${backdrop()}
    ${worker('think', { x: 36, y: 104 })}
    ${sheet(238, 78, 124, 164, 5)}
    ${tick(350, 226, 18)}
    ${arrow(172, 150, 44)}`,

  training: `
    ${backdrop()}
    ${worker('stand', { x: 10, y: 104, s: 0.95 })}
    ${worker('stand', { x: 160, y: 112, s: 0.85, flip: true })}
    ${worker('stand', { x: 268, y: 112, s: 0.85, flip: true })}
    <rect x="130" y="34" width="228" height="52" rx="10" fill="${OCEAN}"/>
    <text x="158" y="68" fill="#ffffff" font-family="var(--font-heading)" font-size="22" font-weight="700">TRAINING</text>`,

  employee: `
    ${backdrop()}
    ${worker('carry', { x: 128, y: 100, s: 1.05 })}
    ${box(222, 178, 56, 44)}
    ${tick(330, 80, 22)}
    ${chip(24, 76, 'FOLLOW THE SYSTEM')}`,

  report: `
    ${backdrop()}
    ${worker('stand', { x: 30, y: 108, s: 0.95 })}
    ${sheet(246, 66, 128, 168, 5)}
    ${arrow(176, 150, 46)}
    ${chip(246, 246, 'REPORT IT', RUBY)}`,

  backcare: `
    ${backdrop()}
    ${worker('stretch', { x: 78, y: 104 })}
    ${worker('stand', { x: 246, y: 104, flip: true })}
    ${tick(220, 62, 20)}`,

  tile: `
    ${backdrop('plain')}
    <rect x="34" y="40" width="192" height="106" rx="14" fill="${OCEAN}"/>
    <text x="58" y="100" fill="#ffffff" font-family="var(--font-heading)" font-size="26" font-weight="700">T — Task</text>
    <rect x="248" y="40" width="198" height="106" rx="14" fill="${RUBY}"/>
    <text x="266" y="100" fill="#ffffff" font-family="var(--font-heading)" font-size="21" font-weight="700">I — Individual</text>
    <rect x="34" y="166" width="192" height="106" rx="14" fill="${EMERALD}"/>
    <text x="58" y="226" fill="#ffffff" font-family="var(--font-heading)" font-size="26" font-weight="700">L — Load</text>
    <rect x="248" y="166" width="198" height="106" rx="14" fill="${C.vest}"/>
    <text x="266" y="226" fill="${INK}" font-family="var(--font-heading)" font-size="21" font-weight="700">E — Environment</text>`,

  task: `
    ${backdrop()}
    ${worker('stoop', { x: 6, y: 104, s: 0.92 })}
    ${box(104, 210, 46, 36)}
    ${cross(56, 62, 20)}
    ${worker('squat', { x: 236, y: 104, s: 0.92 })}
    ${box(336, 206, 46, 36)}
    ${tick(330, 62, 20)}`,

  individual: `
    ${backdrop()}
    ${worker('stand', { x: 176, y: 96, s: 1.15 })}
    ${chip(22, 94, 'TRAINED?')}
    ${chip(22, 146, 'FIT FOR IT?')}
    ${chip(318, 94, 'FOOTWEAR?', EMERALD)}
    ${chip(318, 146, 'GLOVES?', EMERALD)}`,

  load: `
    ${backdrop()}
    ${box(170, 158, 120, 96)}
    <text x="204" y="222" fill="${C.white}" font-family="var(--font-heading)" font-size="26" font-weight="700">?kg</text>
    ${chip(26, 62, 'HEAVY')}
    ${chip(170, 38, 'AWKWARD', RUBY)}
    ${chip(330, 62, 'UNSTABLE', C.vest)}`,

  environment: `
    ${backdrop()}
    <path d="M10 262 l110 0 l0 -34 l100 0 l0 -34 l120 0 l0 -30 l130 0" fill="none" stroke="${C.ground}" stroke-width="10" stroke-linejoin="round"/>
    ${worker('carry', { x: 22, y: 100, s: 0.9 })}
    ${box(100, 172, 44, 34)}
    ${chip(206, 214, 'STEPS', RUBY)}
    ${chip(300, 150, 'WET FLOOR', C.vest)}`,

  record: `
    ${backdrop('plain')}
    ${sheet(92, 44, 154, 220, 7)}
    ${tick(232, 242, 20)}
    ${arrow(268, 150, 58)}
    ${chip(336, 134, 'ACT ON IT', EMERALD)}`,

  plan: `
    ${backdrop()}
    ${worker('think', { x: 34, y: 104 })}
    <g transform="translate(236 44)">
      <rect x="0" y="0" width="200" height="128" rx="18" fill="${C.white}" stroke="${C.ground}" stroke-width="2"/>
      <text x="82" y="86" fill="${OCEAN}" font-family="var(--font-heading)" font-size="56" font-weight="700">?</text>
    </g>
    <circle cx="206" cy="182" r="8" fill="${C.white}"/>
    <circle cx="222" cy="204" r="5" fill="${C.white}"/>`,

  feet: `
    ${backdrop('plain')}
    <ellipse cx="240" cy="178" rx="162" ry="94" fill="${C.bgSoft}"/>
    <line x1="150" y1="120" x2="298" y2="120" stroke="${OCEAN}" stroke-width="3" stroke-dasharray="8 8" stroke-linecap="round"/>
    <g transform="translate(150 150) scale(2.1)">${boot([0, 0], 1)}</g>
    <g transform="translate(248 196) scale(2.1)">${boot([0, 0], 1)}</g>
    ${arrow(332, 190, 52, EMERALD)}
    ${chip(78, 58, 'SHOULDER WIDTH')}
    ${chip(212, 250, 'LEAD FOOT FORWARD', EMERALD)}`,

  grip: `
    ${backdrop('plain')}
    ${box(168, 110, 150, 120)}
    ${hand([158, 210], 13)}
    ${hand([330, 136], 13)}
    ${tick(240, 64, 20)}
    ${chip(122, 266, 'GRIP OPPOSITE CORNERS')}`,

  lift: `
    ${backdrop()}
    ${worker('squat', { x: 4, y: 104, s: 0.92 })}
    ${box(104, 206, 46, 36)}
    ${arrow(176, 176, 46, EMERALD)}
    ${worker('carry', { x: 238, y: 104, s: 0.92 })}
    ${box(320, 174, 46, 36)}
    ${tick(420, 62, 20)}`,

  carry: `
    ${backdrop()}
    ${worker('carry', { x: 22, y: 104, s: 0.92 })}
    ${box(104, 174, 48, 38)}
    ${tick(180, 62, 18)}
    ${worker('carryFar', { x: 236, y: 104, s: 0.92 })}
    ${box(330, 162, 48, 38)}
    ${cross(432, 62, 18)}`,

  turn: `
    ${backdrop()}
    ${worker('carry', { x: 168, y: 100, s: 1.05 })}
    ${box(256, 178, 50, 40)}
    <path d="M120 276 a90 34 0 0 0 240 0" fill="none" stroke="${EMERALD}" stroke-width="5" stroke-linecap="round" stroke-dasharray="10 12"/>
    ${chip(18, 62, 'MOVE THE FEET', EMERALD)}
    ${chip(290, 62, 'DO NOT TWIST', RUBY)}`,

  setdown: `
    ${backdrop()}
    ${worker('squat', { x: 110, y: 100, s: 1.05 })}
    ${box(228, 200, 58, 46)}
    ${arrow(324, 150, 40)}
    ${chip(286, 196, 'THEN ADJUST')}`,

  shelf: `
    ${backdrop('plain')}
    <g stroke="${C.ground}" stroke-width="8" stroke-linecap="round">
      <line x1="262" y1="84" x2="452" y2="84"/>
      <line x1="262" y1="164" x2="452" y2="164"/>
      <line x1="266" y1="84" x2="266" y2="262"/>
      <line x1="448" y1="84" x2="448" y2="262"/>
    </g>
    ${box(296, 110, 50, 40)}
    <rect x="132" y="214" width="110" height="16" rx="6" fill="${C.shirt}"/>
    <rect x="150" y="240" width="74" height="16" rx="6" fill="${C.shirtDark}"/>
    ${worker('stand', { x: 118, y: 62, s: 0.95 })}
    ${chip(16, 104, 'USE STEPS', EMERALD)}`,

  team: `
    ${backdrop()}
    ${worker('carry', { x: 10, y: 104, s: 0.95 })}
    ${worker('carry', { x: 312, y: 104, s: 0.95, flip: true })}
    <rect x="96" y="178" width="290" height="24" rx="8" fill="${C.box}"/>
    <rect x="96" y="178" width="290" height="8" rx="4" fill="${C.boxTop}"/>
    ${chip(130, 40, 'ONE PERSON CALLS IT')}`,

  push: `
    ${backdrop()}
    ${worker('push', { x: 34, y: 104 })}
    ${trolley(164, 158)}
    ${box(172, 142, 84, 66)}
    ${arrow(300, 190, 90, EMERALD)}
    ${chip(276, 56, 'PUSH, NOT PULL', EMERALD)}`,

  aids: `
    ${backdrop()}
    ${trolley(44, 160)}
    ${box(52, 148, 62, 50)}
    <g transform="translate(196 186)">
      <rect x="0" y="34" width="104" height="16" rx="8" fill="${C.shirt}"/>
      <circle cx="20" cy="60" r="11" fill="${C.trouserDark}"/>
      <circle cx="84" cy="60" r="11" fill="${C.trouserDark}"/>
    </g>
    ${box(212, 152, 70, 56)}
    <g transform="translate(392 66)">
      <line x1="-40" y1="0" x2="40" y2="0" stroke="${C.trouser}" stroke-width="7" stroke-linecap="round"/>
      <line x1="0" y1="0" x2="0" y2="62" stroke="${C.trouser}" stroke-width="5"/>
      <path d="M0 62 q-16 12 -4 24 q10 10 18 -2" fill="none" stroke="${C.helmet}" stroke-width="8" stroke-linecap="round"/>
    </g>`,

  stop: `
    ${backdrop()}
    ${worker('ache', { x: 60, y: 104 })}
    <g transform="translate(312 146)">
      <circle cx="0" cy="0" r="54" fill="${RUBY}"/>
      <rect x="-32" y="-10" width="64" height="20" rx="10" fill="#ffffff"/>
    </g>
    ${chip(242, 232, 'STOP AND REPORT', RUBY)}`,

  summary: `
    ${backdrop('plain')}
    ${sheet(146, 40, 186, 228, 6)}
    ${tick(320, 244, 22)}
    ${chip(30, 112, 'TASK')}
    ${chip(30, 164, 'LOAD', EMERALD)}`,

  quiz: `
    ${backdrop('plain')}
    <rect x="96" y="56" width="288" height="208" rx="20" fill="${OCEAN}"/>
    <text x="198" y="196" fill="#ffffff" font-family="var(--font-heading)" font-size="110" font-weight="700">?</text>`,

  result: `
    ${backdrop('plain')}
    <g transform="translate(240 158)">
      <circle cx="0" cy="0" r="86" fill="none" stroke="${C.ground}" stroke-width="20"/>
      <path d="M0 -86 a86 86 0 0 1 74 129" fill="none" stroke="${EMERALD}" stroke-width="20" stroke-linecap="round"/>
      <text x="-40" y="16" fill="${INK}" font-family="var(--font-heading)" font-size="40" font-weight="700">PASS</text>
    </g>`,
};
