/* ============================================================================
 * SAFE MANUAL HANDLING — MODULE CONTENT
 *
 * All the words in the training module live here. Edit the text between the
 * quote marks and the module updates. Nothing else needs to change.
 *
 *   slides    — one screen each. `graphic` names a scene in
 *               src/components/training/Illustration.astro.
 *   questions — `answer` is the position of the correct option, counting from
 *               0. So `answer: 2` means the third option is correct.
 *
 * The guidance follows Irish law: the Safety, Health and Welfare at Work Act
 * 2005 and Chapter 4 of Part 2 of the Safety, Health and Welfare at Work
 * (General Application) Regulations 2007. Have a competent person check the
 * wording before this is used as real training.
 * ========================================================================== */

export interface Slide {
  /** Short label shown in the slide list and progress readout. */
  title: string;
  /** Scene name from Illustration.astro, used when `image` is not set. */
  graphic: string;
  /**
   * Real photo or artwork, from inside `public/`. Drop a file into
   * `public/media/training/` with the name below and it replaces the drawing.
   * Delete this line and the drawn scene comes back.
   */
  image?: string;
  /** Description of the picture, read out by screen readers. */
  alt: string;
  /** One paragraph or bullet per line. */
  body: string[];
  /** Optional highlighted line at the bottom of the slide. */
  callout?: string;
}

export interface Question {
  prompt: string;
  options: string[];
  /** Index of the correct option, counting from 0. */
  answer: number;
  /** Shown after the learner answers, right or wrong. */
  why: string;
}

export interface Section {
  id: string;
  title: string;
  slides: Slide[];
  questions: Question[];
}

export const MODULE = {
  title: 'Safe Manual Handling',
  subtitle: 'An interactive module for anyone who lifts, carries, pushes or pulls on site.',
  duration: '20 minutes',
  passMark: 8,
  disclaimer:
    'Sample module for demonstration. The content is guidance only and is not a substitute for ' +
    'practical, instructor-led manual handling training or your own site rules.',
};

export const SECTIONS: Section[] = [
  /* ======================================================= 1. INTRODUCTION */
  {
    id: 'introduction',
    title: 'Introduction & legislation',
    slides: [
      {
        title: 'Welcome',
        graphic: 'welcome',
        image: '/media/training/01-welcome.jpg',
        alt: 'Two site workers, one carrying a box',
        body: [
          'Manual handling is part of nearly every job on a building site. Done badly, it is also one of the quickest ways to end up injured.',
          'This module takes about 20 minutes. It covers what the law expects, how to assess a lift, and the technique that keeps your back out of trouble.',
          'There are ten questions along the way. You need 8 out of 10 to pass.',
        ],
      },
      {
        title: 'What counts as manual handling',
        graphic: 'definition',
        image: '/media/training/02-what-counts-as-manual-handling.jpg',
        alt: 'A worker carrying a box beside a worker pushing a loaded trolley',
        body: [
          'The Regulations define manual handling of loads as any transporting or supporting of a load by one or more employees.',
          'That includes lifting, putting down, pushing, pulling, carrying or moving a load.',
          'A load is not only a box. It can be a bag of sand, a length of timber, a tool, a wheelbarrow, a gas cylinder or a person.',
        ],
        callout: 'If you move it with your body rather than a machine, it is manual handling.',
      },
      {
        title: 'Why it matters',
        graphic: 'injury',
        image: '/media/training/03-why-it-matters.jpg',
        alt: 'A worker holding their lower back in pain',
        body: [
          'Manual handling is the single biggest cause of workplace injury reported in Ireland.',
          'In 2022, manual handling accounted for 2,712 non-fatal injuries reported to the Health and Safety Authority: 30% of the total. Manual handling and falls together made up 55%.',
          'Back injuries are slow to heal, easy to repeat, and can follow you for the rest of your working life.',
        ],
      },
      {
        title: 'How your back works',
        graphic: 'spine',
        image: '/media/training/04-how-your-back-works.jpg',
        alt: 'Diagram of vertebrae separated by discs, with one disc under strain',
        body: [
          'Your spine is a stack of bones called vertebrae, separated by soft discs that act as cushions.',
          'Muscles and ligaments hold the stack in line. The spine is strongest when it keeps its natural S-shape.',
          'Bending and twisting under load squeezes the discs unevenly. Do that often enough and the disc gives way.',
        ],
      },
      {
        title: 'The law: the 2005 Act',
        graphic: 'law',
        image: '/media/training/05-the-law-act-2005.jpg',
        alt: 'Two legal documents with a tick',
        body: [
          'The Safety, Health and Welfare at Work Act 2005 is the main piece of Irish safety law.',
          'It places a duty on employers to provide a safe place of work, safe systems of work, and the information, instruction, training and supervision needed to work safely.',
          'It also places duties on employees, which we cover in the next section.',
        ],
      },
      {
        title: 'The Regulations',
        graphic: 'regs',
        image: '/media/training/06-the-regulations.jpg',
        alt: 'A regulation document under a magnifying glass',
        body: [
          'Manual handling is dealt with in Chapter 4 of Part 2 of the Safety, Health and Welfare at Work (General Application) Regulations 2007.',
          'The Regulations set out what the employer must do, and Schedule 3 lists the risk factors that a manual handling assessment has to consider.',
          'Those factors fall into five groups: the load, the physical effort, the working environment, the requirements of the activity, and the individual doing it.',
        ],
      },
      {
        title: 'Two ways injuries happen',
        graphic: 'backcare',
        image: '/media/training/07-two-ways-injuries-happen.jpg',
        alt: 'A worker stretching beside a worker standing upright',
        body: [
          'Sudden injuries happen in one movement: a heavy awkward lift, a slip mid-carry, a twist to put something down.',
          'Cumulative injuries build up over months of small, repeated strains that never quite get a chance to recover.',
          'Both can end in the same place: strains, sprains, or damage to a disc.',
        ],
        callout: 'Anywhere in the musculoskeletal system can be injured, not just your lower back.',
      },
      {
        title: 'Section summary',
        graphic: 'summary',
        image: '/media/training/08-summary-legislation.jpg',
        alt: 'A checklist with a tick',
        body: [
          'Manual handling covers lifting, carrying, pushing, pulling and supporting any load.',
          'It causes around 30% of reported non-fatal workplace injuries in Ireland.',
          'The rules come from the 2005 Act and Chapter 4 of Part 2 of the 2007 General Application Regulations.',
        ],
      },
    ],
    questions: [
      {
        prompt: 'Which of these is NOT manual handling?',
        options: [
          'Pushing a wheelbarrow of rubble across the site',
          'Operating a tower crane from the cab to move a load',
          'Carrying a bag of cement up a flight of stairs',
          'Holding a sheet of plasterboard in place while it is fixed',
          'Dragging a full skip across the yard by hand, for the glory of it',
        ],
        answer: 1,
        why:
          'Manual handling means moving or supporting a load with your own body. Operating a crane moves the load by machine, which is exactly the kind of control the law wants you to use where you can.',
      },
      {
        prompt: 'Which law sets out the manual handling rules that apply in Ireland?',
        options: [
          'The Manual Handling Operations Regulations 1992',
          'Chapter 4 of Part 2 of the General Application Regulations 2007',
          'The Auld Fella’s Guide to Lifting, revised 1984 and never written down',
          'The Building Control Regulations 1997',
          'The Organisation of Working Time Act 1997',
        ],
        answer: 1,
        why:
          'Chapter 4 of Part 2 of the Safety, Health and Welfare at Work (General Application) Regulations 2007 covers manual handling of loads, alongside the general duties in the 2005 Act. The 1992 Regulations are the equivalent in the UK, not Ireland.',
      },
    ],
  },

  /* ======================================================= 2. DUTIES */
  {
    id: 'duties',
    title: 'Employer & employee duties',
    slides: [
      {
        title: 'Avoid, assess, reduce',
        graphic: 'avoid',
        image: '/media/training/09-avoid-assess-reduce.jpg',
        alt: 'A stooped lift marked with a red cross beside a loaded trolley marked with a green tick',
        body: [
          'The employer’s duties run in a fixed order.',
          'First, avoid hazardous manual handling wherever it is reasonably practicable, by organising the work differently or using equipment.',
          'Where it cannot be avoided, assess the risk. Then reduce that risk as far as reasonably practicable.',
        ],
        callout: 'Avoid first. A lift that never happens cannot hurt anybody.',
      },
      {
        title: 'Designing the lift out',
        graphic: 'aids',
        image: '/media/training/10-designing-the-lift-out.jpg',
        alt: 'A sack truck, a pallet trolley and a hoist',
        body: [
          'Deliver closer to the point of use, so loads travel less.',
          'Order materials in smaller units, or split a load before moving it.',
          'Provide trolleys, sack trucks, pallet trucks, hoists, telehandlers and roller tracks — and keep them where the work is.',
        ],
      },
      {
        title: 'Assess what is left',
        graphic: 'assess',
        image: '/media/training/11-assess-what-is-left.jpg',
        alt: 'A worker considering a task beside an assessment form',
        body: [
          'A written manual handling risk assessment is required for handling that cannot be avoided.',
          'It has to consider the factors in Schedule 3 of the Regulations, which we cover in the next section.',
          'It should be reviewed when the job, the load, the place or the people change.',
        ],
      },
      {
        title: 'Information and training',
        graphic: 'training',
        image: '/media/training/12-information-and-training.jpg',
        alt: 'A trainer in front of two workers under a training sign',
        body: [
          'Employers must give employees information on the weight of loads and how to handle them safely.',
          'Employees who carry out manual handling must receive training from a person with the relevant training and experience.',
          'Training should be specific to the actual work, not generic, and refreshed when things change.',
        ],
      },
      {
        title: 'Your duties as an employee',
        graphic: 'employee',
        image: '/media/training/13-your-duties-as-an-employee.jpg',
        alt: 'A worker carrying a load correctly, marked with a green tick',
        body: [
          'Under the 2005 Act you must take reasonable care of your own safety and that of anyone affected by what you do.',
          'Follow the safe system of work, use the equipment provided, and use it the way you were trained to.',
          'Do not be under the influence of anything that puts you or others at risk, and do not interfere with or misuse safety equipment.',
        ],
      },
      {
        title: 'Report it',
        graphic: 'report',
        image: '/media/training/14-report-it.jpg',
        alt: 'A worker filling in a report form',
        body: [
          'Report anything that could injure someone: a blocked route, a broken trolley, a load heavier than expected, a near miss.',
          'Report injuries as soon as they happen, even minor ones. A small strain ignored is how long-term back trouble starts.',
          'Tell your employer if a health condition, an injury or a pregnancy affects what you can safely handle.',
        ],
      },
      {
        title: 'Looking after your back',
        graphic: 'backcare',
        image: '/media/training/15-looking-after-your-back.jpg',
        alt: 'A worker stretching before work',
        body: [
          'Warm up gently before heavy work, and change position regularly through the day.',
          'Keep general fitness up and keep your weight within a healthy range for your height.',
          'If back pain starts, stop the activity and get it looked at rather than working through it.',
        ],
      },
    ],
    questions: [
      {
        prompt: 'A pallet of blocks has to be moved across site. What should the employer consider first?',
        options: [
          'Whether the lift can be avoided altogether, for example with a telehandler or a closer delivery point',
          'A site-wide arm-wrestling tournament to find the strongest lifter',
          'Which employees are strongest',
          'How many breaks the team will need',
          'Whether back belts can be issued to the team',
        ],
        answer: 0,
        why:
          'The duties run in order: avoid, then assess, then reduce. Sharing a bad lift among stronger people is not avoiding it.',
      },
      {
        prompt: 'Which of these is an employee duty under the Safety, Health and Welfare at Work Act 2005?',
        options: [
          'Inventing a bold new lifting technique and naming it after yourself',
          'Carrying out the written manual handling risk assessment',
          'Buying the lifting equipment for the site',
          'Using the equipment and safe system of work provided, and reporting hazards and injuries',
          'Deciding the maximum weight anyone on site may lift',
        ],
        answer: 3,
        why:
          'Assessing, providing equipment and setting the system of work are the employer’s job. Yours is to work to that system, use what you are given properly, and speak up when something is wrong.',
      },
    ],
  },

  /* ======================================================= 3. RISK ASSESSMENT */
  {
    id: 'risk-assessment',
    title: 'Risk assessment',
    slides: [
      {
        title: 'What an assessment is for',
        graphic: 'assess',
        image: '/media/training/16-what-an-assessment-is-for.jpg',
        alt: 'A worker studying a task beside an assessment form',
        body: [
          'A manual handling risk assessment looks at the whole job, from where the load starts to where it ends up.',
          'Its purpose is to find the hazardous parts, decide who could be harmed, check what controls already exist, and decide what else is needed.',
          'The person carrying it out should know the Regulations, know the job, and be competent to do it.',
        ],
      },
      {
        title: 'TILE',
        graphic: 'tile',
        image: '/media/training/17-tile-overview.jpg',
        alt: 'Four coloured panels: Task, Individual, Load, Environment',
        body: [
          'The Schedule 3 factors are easiest to remember as TILE.',
          'Task — what the handling actually involves. Individual — the person doing it. Load — what is being moved. Environment — where it happens.',
          'Run through all four before a lift you have not done before.',
        ],
        callout: 'Task · Individual · Load · Environment',
      },
      {
        title: 'T — Task',
        graphic: 'task',
        image: '/media/training/18-t-for-task.jpg',
        alt: 'A stooped lift marked with a cross beside a knees-bent lift marked with a tick',
        body: [
          'Does the task involve stooping, twisting, or reaching above shoulder height or below knee height?',
          'Is the load held away from the body, carried a long distance, or lifted and lowered repeatedly?',
          'Is there enough rest, and can the pace be set by the worker rather than by a machine or a delivery?',
        ],
      },
      {
        title: 'I — Individual',
        graphic: 'individual',
        image: '/media/training/19-i-for-individual.jpg',
        alt: 'A worker with labels asking about training, fitness, footwear and gloves',
        body: [
          'Has the person been trained for this handling, and do they have the information they need?',
          'Does the job call for unusual strength, height or reach?',
          'Could it put someone at particular risk — a pregnant worker, a young worker, or someone with an existing injury or health condition?',
          'Does their clothing, footwear or PPE get in the way of a safe lift?',
        ],
      },
      {
        title: 'L — Load',
        graphic: 'load',
        image: '/media/training/20-l-for-load.jpg',
        alt: 'A box labelled heavy, awkward and unstable',
        body: [
          'Is it heavy, bulky or awkward to hold? There is no legal maximum weight in Ireland — it depends on the whole situation.',
          'Is the contents likely to shift, or is the load unstable or unpredictable?',
          'Are there handholds, or could packaging be changed to add some?',
          'Is it hot, cold, sharp, or hazardous if it spills?',
        ],
      },
      {
        title: 'E — Environment',
        graphic: 'environment',
        image: '/media/training/21-e-for-environment.jpg',
        alt: 'A route with steps and level changes under bright sun',
        body: [
          'Is there enough space to stand and move properly, and is the route clear?',
          'Are floors level, dry and in good condition, or are there steps, slopes and changes of surface?',
          'Is the lighting good enough to see the load and the route?',
          'Is it hot, cold, wet or windy? A gust can turn a sheet of ply into a sail.',
        ],
      },
      {
        title: 'Other factors',
        graphic: 'aids',
        image: '/media/training/22-other-factors.jpg',
        alt: 'Handling aids: a sack truck, a pallet trolley and a hoist',
        body: [
          'What equipment is available, is it maintained, and does everyone know how to use it?',
          'Does the way the work is organised force a rush — deliveries at the end of a shift, a single person doing a two-person job?',
          'Does PPE that is needed for another hazard make the handling harder, and how is that dealt with?',
        ],
      },
      {
        title: 'Write it down and act on it',
        graphic: 'record',
        image: '/media/training/23-write-it-down-and-act-on-it.jpg',
        alt: 'A completed assessment form with a tick and an arrow to action',
        body: [
          'The assessment should be written down and kept with the safety documentation.',
          'Findings have to be acted on. An assessment that sits in a folder changes nothing on the ground.',
          'Review it when the load, the equipment, the place or the people change, or after an incident.',
        ],
      },
      {
        title: 'Section summary',
        graphic: 'summary',
        image: '/media/training/24-summary-risk-assessment.jpg',
        alt: 'A checklist with a tick',
        body: [
          'Assess the whole job from start to finish, using TILE.',
          'There is no single safe weight limit: weight is only one factor among many.',
          'Record the assessment, act on it, and review it when things change.',
        ],
      },
    ],
    questions: [
      {
        prompt: 'What do the letters TILE stand for?',
        options: [
          'Time, Instruction, Lifting, Equipment',
          'Task, Individual, Load, Environment',
          'Tea, Interruptions, Lunch, Elevenses',
          'Training, Inspection, Legislation, Enforcement',
          'Team, Injury, Lift, Effort',
        ],
        answer: 1,
        why:
          'Task, Individual, Load and Environment — the four groups of risk factors from Schedule 3 of the 2007 Regulations.',
      },
      {
        prompt: 'A load has no handholds and the contents shift when it moves. Which TILE factor is that?',
        options: [
          'Task',
          'Individual',
          'Load',
          'Environment',
          'Vibes, the secret fifth factor known only to experienced lads',
        ],
        answer: 2,
        why:
          'Handholds, stability and shifting contents are characteristics of the load. Often the fix is simple: repack it, or split it.',
      },
      {
        prompt: 'Which statement about weight limits in Ireland is correct?',
        options: [
          'You may lift anything at all, provided you shout encouragement to yourself first',
          'Nobody may lift more than 25 kg under any circumstances',
          'There is no fixed legal maximum weight; the risk depends on the task, individual, load and environment together',
          'Men may lift 25 kg and women 16 kg by law',
          'Anything over 10 kg must be moved mechanically',
        ],
        answer: 2,
        why:
          'Irish law sets no maximum weight. Guideline figures exist as a screening tool, but the assessment has to look at the whole situation, not the number alone.',
      },
    ],
  },

  /* ======================================================= 4. TECHNIQUE */
  {
    id: 'technique',
    title: 'Handling techniques',
    slides: [
      {
        title: 'Think before you lift',
        graphic: 'plan',
        image: '/media/training/25-think-before-you-lift.jpg',
        alt: 'A worker planning a lift, with a question mark',
        body: [
          'Where is it going, and is the route clear all the way?',
          'How heavy is it? Test it by tilting a corner before you commit.',
          'Do you need help, a trolley, or a different way of doing it altogether?',
          'Are there obstructions to move first, and somewhere ready to put the load down?',
        ],
        callout: 'The lift starts before you touch the load.',
      },
      {
        title: 'Feet and stance',
        graphic: 'feet',
        image: '/media/training/26-feet-and-stance.jpg',
        alt: 'Overhead view of feet apart with the leading foot forward',
        body: [
          'Wear footwear suitable for the job and the ground.',
          'Put your feet roughly shoulder width apart for a stable base.',
          'Place the leading foot slightly forward, pointing the way you are going to travel.',
        ],
      },
      {
        title: 'Grip',
        graphic: 'grip',
        image: '/media/training/27-grip.jpg',
        alt: 'Hands gripping opposite corners of a box',
        body: [
          'Grip opposite corners rather than the sides — it is far more secure.',
          'Use handholds where they exist, and gloves where the load is sharp, rough or cold.',
          'Keep your arms within the boundary of your body rather than stretched out.',
          'If the grip is not secure, set it down and start again.',
        ],
      },
      {
        title: 'Posture',
        graphic: 'task',
        image: '/media/training/28-posture.jpg',
        alt: 'A stooped lift marked with a cross beside a knees-bent lift marked with a tick',
        body: [
          'Bend your knees, not your back, and do not fully flex the knees into a deep squat.',
          'Keep your spine in its natural alignment, with the shoulders level and facing the same way as the hips.',
          'Get close to the load before you start. Reaching out multiplies the strain on your lower back.',
        ],
      },
      {
        title: 'The lift',
        graphic: 'lift',
        image: '/media/training/29-the-lift.jpg',
        alt: 'A worker rising from a knees-bent position to a standing carry',
        body: [
          'Keep relaxed. A smooth, progressive movement is safer than a snatch.',
          'Lead the movement with your head, and use the power of your legs.',
          'Keep the load close to your body, with the heaviest side nearest you.',
        ],
      },
      {
        title: 'Carrying',
        graphic: 'carry',
        image: '/media/training/30-carrying.jpg',
        alt: 'A load carried close to the body, and the same load held out in front marked with a cross',
        body: [
          'Carry the load close to your waist, not out in front of you or on one hip.',
          'Keep your head up and look where you are going once the load is secure.',
          'Take shorter distances where you can, and put the load down and rest rather than struggling on.',
        ],
      },
      {
        title: 'Turning',
        graphic: 'turn',
        image: '/media/training/31-turning.jpg',
        alt: 'A worker turning by moving their feet rather than twisting',
        body: [
          'Never twist your trunk while holding a load. Twisting under load is one of the most common ways backs are injured.',
          'Move your feet to turn, so hips and shoulders stay in line.',
          'Plan the turn before you lift, so you are not correcting it halfway.',
        ],
        callout: 'Turn with your feet, not your spine.',
      },
      {
        title: 'Setting down',
        graphic: 'setdown',
        image: '/media/training/32-setting-down.jpg',
        alt: 'A worker lowering a box with bent knees, then sliding it into place',
        body: [
          'Lower the load the way you lifted it: knees bent, back in line, load close.',
          'Put it down first, then slide it into position. Do not adjust it in mid-air.',
          'Watch your fingers and toes, and make sure it is stable before you let go.',
        ],
      },
      {
        title: 'High and low loads',
        graphic: 'shelf',
        image: '/media/training/33-high-and-low-loads.jpg',
        alt: 'A worker using steps to reach a high shelf',
        body: [
          'Avoid lifting above shoulder height. Use steps or a platform so the load starts at a better height.',
          'For loads on the ground, bring them to bench height first where you can.',
          'Store heavy items between knee and shoulder height so they never need a bad lift.',
        ],
      },
      {
        title: 'Team handling',
        graphic: 'team',
        image: '/media/training/34-team-handling.jpg',
        alt: 'Two workers carrying a long load together',
        body: [
          'Use a team lift for long, heavy or awkward loads, and match people of roughly similar height where possible.',
          'One person calls the lift, and everyone knows the plan and the route before it starts.',
          'Lift, move and lower together on the call.',
        ],
      },
      {
        title: 'Pushing and pulling',
        graphic: 'push',
        image: '/media/training/35-pushing-and-pulling.jpg',
        alt: 'A worker pushing a loaded trolley',
        body: [
          'Push rather than pull where you can: you can see where you are going and your back is better supported.',
          'Keep your back straight, and push with your legs and body weight rather than your arms alone.',
          'Keep loads low on the trolley, check the wheels run freely, and slow down on slopes and ramps.',
        ],
      },
      {
        title: 'If it hurts, stop',
        graphic: 'stop',
        image: '/media/training/36-if-it-hurts-stop.jpg',
        alt: 'A worker in pain beside a stop sign',
        body: [
          'If you feel pain during a lift, stop straight away. Do not try to finish it.',
          'Report it to your supervisor and follow your site procedure for injuries and near misses.',
          'Get medical advice. Early treatment is what keeps a strain from becoming a long-term problem.',
        ],
        callout: 'This module is guidance only. Practical, instructor-led training is still required.',
      },
    ],
    questions: [
      {
        prompt: 'You are lifting a box from the floor. Which is correct?',
        options: [
          'Keep your legs straight and bend from the waist so you can reach further',
          'Bend your knees, keep your back in its natural alignment and hold the load close',
          'Lift quickly in one snatch so the strain is over faster',
          'Keep the load at arm’s length so it does not mark your clothes',
          'Bend from the waist and let sheer willpower take the strain',
        ],
        answer: 1,
        why:
          'Knees bent, back in line, load close to the body, and a smooth movement powered by the legs. Straight legs and a bent back put the whole strain through your lower discs.',
      },
      {
        prompt: 'You are carrying a load and need to turn to your left. What should you do?',
        options: [
          'Twist at the waist, keeping your feet planted',
          'Move your feet and turn your whole body',
          'Spin on the spot like a lighthouse and trust the physics',
          'Swing the load around to build momentum',
          'Lean back and pivot on one heel',
        ],
        answer: 1,
        why:
          'Twisting under load is one of the quickest ways to injure a disc. Move the feet so hips and shoulders stay in line.',
      },
      {
        prompt: 'A load is too heavy to handle comfortably on your own. What is the best response?',
        options: [
          'Lift it anyway, but faster, to get it over with',
          'Stop, and use a handling aid or a team lift, reporting the problem if neither is available',
          'Ask the nearest person to take the whole load instead',
          'Film the attempt for the internet, so at least the injury is content',
          'Drag it along the ground to the destination',
        ],
        answer: 1,
        why:
          'Stopping is always an option. Use the aid or the team lift the assessment calls for, and tell your supervisor if the equipment or the people are not there.',
      },
    ],
  },
];

/** Every question in order, used for the final score. */
export const ALL_QUESTIONS = SECTIONS.flatMap((section) =>
  section.questions.map((question) => ({ ...question, section: section.title })),
);

export const TOTAL_SLIDES = SECTIONS.reduce((n, s) => n + s.slides.length, 0);
export const TOTAL_QUESTIONS = ALL_QUESTIONS.length;
