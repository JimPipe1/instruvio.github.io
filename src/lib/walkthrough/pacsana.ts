/* ============================================================================
 * PRODUCT WALKTHROUGH — PACSANA
 *
 * A step-by-step tour of a product, told one screen at a time. Edit the text
 * between the quote marks and the walkthrough updates.
 *
 *   screen — names a mock-up in screens-pacsana.ts
 *   voice  — the narration line, if this is later cut as a video
 *   body   — what appears beside the screen on the page
 *   note   — optional highlighted line
 *
 * DEMO CONTENT. Written from a client brief to show the format. The screens
 * are invented mock-ups, not the real product UI, and every figure in them is
 * made up. Replace with real screenshots and approved copy before publishing.
 * ========================================================================== */

export interface WalkStep {
  /** Short label, shown in the step list. */
  title: string;
  /** Mock-up key from screens-pacsana.ts. */
  screen: string;
  /** Description of the screen for screen readers. */
  alt: string;
  /** Life-scene key from scenes-pacsana.ts — the drawn fallback. */
  life: string;
  /**
   * The illustration file, from inside `public/`. Drop a finished image into
   * `public/media/walkthrough/` under this name and it replaces the placeholder.
   * Delete this line and the drawn scene named by `life` comes back.
   */
  lifeImage?: string;
  /** Description of that illustration for screen readers. */
  lifeAlt: string;
  /** The narration line for this step. */
  voice: string;
  /** Supporting points shown beside the screen. */
  body: string[];
  /** Optional highlighted line. */
  note?: string;
}

export const WALKTHROUGH = {
  product: 'Wearable Tech',
  title: 'Wearable Tech — a guided tour',
  subtitle:
    'How the app reads a person’s daily movement, and how family and carers stay in the picture without standing over them.',
  duration: '3 minutes',
  disclaimer:
    'Sample walkthrough for demonstration. The screens are mock-ups drawn for this demo, not the real product, ' +
    'and all names, times and figures are invented.',
};

export const STEPS: WalkStep[] = [
  {
    title: 'The daily picture',
    screen: 'home',
    alt: 'App home screen showing steps, sleep and a trip out of the house',
    life: 'morning',
    lifeImage: '/media/walkthrough/01-morning.svg',
    lifeAlt: 'An older woman standing in her kitchen on an ordinary morning',
    voice: 'Here is a quick tour of the app, and how it reads your daily movement.',
    body: [
      'A small worn sensor picks up ordinary movement around the house — getting up, moving between rooms, sitting down, going out.',
      'The app turns that into one plain-language summary: how you slept, how much you have moved, whether you have been out.',
      'No cameras, no microphones, nothing to remember to switch on.',
    ],
    note: 'One screen answers the question everybody actually asks: is today a normal day?',
  },
  {
    title: 'Your circle',
    screen: 'connected',
    alt: 'A list of people who can see the information, with their access levels',
    life: 'circle',
    lifeImage: '/media/walkthrough/02-circle.svg',
    lifeAlt: 'The same woman at home with her daughter and a care worker, both holding phones',
    voice: 'See how easy it is to stay connected, so family and carers know you are well.',
    body: [
      'You choose who is in your circle and how much each person sees — everything, or only urgent alerts.',
      'Family members and care workers use the same app, so nobody is relying on a phone call being answered.',
      'Access can be changed or switched off at any time.',
    ],
  },
  {
    title: 'Rest and movement',
    screen: 'day-night',
    alt: 'Two bar charts: sleep hours and active hours across the week',
    life: 'day-night',
    lifeImage: '/media/walkthrough/03-day-night.svg',
    lifeAlt: 'A split scene: walking outdoors by day, asleep in bed by night',
    voice: 'Are you resting well at night, and are you mobile during the day?',
    body: [
      'Night and day are shown together, because one explains the other.',
      'A week at a glance makes a pattern obvious in a way a single night never does.',
      'The app compares you with your own normal, not with an average stranger.',
    ],
  },
  {
    title: 'Sleep in detail',
    screen: 'sleep',
    alt: 'Sleep detail screen with time asleep, settled percentage and restless periods',
    life: 'sleeping',
    lifeImage: '/media/walkthrough/04-sleeping.jpg',
    lifeAlt: 'The woman asleep in bed with a bedside lamp on low',
    voice: 'Are they sleeping well?',
    body: [
      'Time asleep, how settled the night was, and how often it was interrupted.',
      'A run of restless nights is usually the first sign that something else is going on.',
      'Carers see the same view, so a conversation starts from the same facts.',
    ],
  },
  {
    title: 'Skin health',
    screen: 'skin',
    alt: 'Screen showing time spent in one position and prompts to move',
    life: 'armchair',
    lifeImage: '/media/walkthrough/05-armchair.jpg',
    lifeAlt: 'The woman seated in an armchair, with a clock showing time passing',
    voice: 'How is your skin health?',
    body: [
      'Long spells in the same position are the main risk factor for pressure damage.',
      'The app tracks the longest unbroken spell and how often position changes through the day.',
      'A gentle prompt is easier to act on than a district nurse visit three weeks later.',
    ],
  },
  {
    title: 'Night-time trips',
    screen: 'bathroom',
    alt: 'Screen showing bathroom trips last night and across the week',
    life: 'night',
    lifeImage: '/media/walkthrough/06-night.jpg',
    lifeAlt: 'The woman walking to the bathroom at night, lit by a bedside lamp',
    voice: 'How often did you visit the bathroom last night?',
    body: [
      'Trips to the bathroom at night are counted and timed.',
      'A sudden change can point to an infection, a medication effect or a fall risk in the dark.',
      'Shown as a trend, so one unusual night does not cause alarm.',
    ],
  },
  {
    title: 'Getting outside',
    screen: 'outdoors',
    alt: 'Screen showing a trip out of the house and outdoor time for the week',
    life: 'outdoor',
    lifeImage: '/media/walkthrough/07-outdoor.jpg',
    lifeAlt: 'The woman walking outdoors with a stick, past a tree',
    voice: 'Are you getting outside to exercise?',
    body: [
      'Trips beyond the front door are recorded separately from moving around indoors.',
      'Time outdoors, number of trips, and how that compares with last week.',
      'Getting out matters for strength, mood and appetite, so it is worth counting on its own.',
    ],
  },
  {
    title: 'Company',
    screen: 'social',
    alt: 'Screen showing hours spent with other people and recent visits',
    life: 'visitor',
    lifeImage: '/media/walkthrough/08-visitor.jpg',
    lifeAlt: 'The woman and her daughter having tea at the table',
    voice: 'How much are you socialising?',
    body: [
      'Time with other people — visitors at home, and time spent out.',
      'Isolation creeps up slowly, which is exactly the kind of change a weekly trend catches.',
      'It also shows the family something useful: the weekends are quiet.',
    ],
  },
  {
    title: 'What might help',
    screen: 'advice',
    alt: 'Screen showing three suggestions, each with the reason behind it',
    life: 'stroll',
    lifeImage: '/media/walkthrough/09-stroll.jpg',
    lifeAlt: 'The woman walking outdoors with her daughter after lunch',
    voice: 'The app also gives advice on what might help improve your health.',
    body: [
      'Suggestions come from your own data, and each one says why it is being offered.',
      'Small, specific and doable — a short walk after lunch, standing up every hour.',
      'Advice you can ignore, which is rather the point: it is guidance, not instruction.',
    ],
    note: 'Suggestions are general wellbeing prompts, not medical advice.',
  },
  {
    title: 'Reports',
    screen: 'reports',
    alt: 'Report screen splitting activity inside and outside the home against the WHO target',
    life: 'exercise',
    lifeImage: '/media/walkthrough/10-exercise.jpg',
    lifeAlt: 'The woman rising from her chair indoors and walking outdoors',
    voice:
      'A set of reports looks at exercise both inside and outside the home, and checks whether you are meeting the WHO goals.',
    body: [
      'Activity is split between inside and outside the home, because they mean different things.',
      'Progress is measured against the World Health Organization’s weekly activity guideline.',
      'The report can be shared with a GP or physio, which saves a lot of guessing at an appointment.',
    ],
  },
  {
    title: 'Mobility',
    screen: 'mobility',
    alt: 'Screen showing daily steps, walking pace and a fall-risk estimate',
    life: 'stumble',
    lifeImage: '/media/walkthrough/11-stumble.jpg',
    lifeAlt: 'The woman stumbling and catching herself against the worktop',
    voice: 'Are you moving enough? How fast are you getting around? And how likely are you to fall?',
    body: [
      'Three measures that matter as people get older: how much, how fast, and how steadily.',
      'Walking pace is one of the better early indicators of declining health, and it changes slowly enough to spot.',
      'Fall risk is an estimate built from pace, steadiness and night-time activity.',
    ],
  },
  {
    title: 'Watching around the clock',
    screen: 'always-on',
    alt: 'Screen showing a 24-hour activity ribbon and what the pattern indicates',
    life: 'round-clock',
    lifeImage: '/media/walkthrough/12-round-clock.jpg',
    lifeAlt: 'Day and night together: walking above, asleep below, a clock between',
    voice: 'Carers cannot be there all the time, but Pacsana analyses the data 24/7.',
    body: [
      'The analysis runs continuously, including the hours when nobody is in the house.',
      'It compares today against the person’s own established pattern rather than a generic threshold.',
      'Family and carers see the same picture, updated as the day goes on.',
    ],
  },
  {
    title: 'Alerts as they happen',
    screen: 'alerts',
    alt: 'Alerts screen showing an urgent alert and two informational ones',
    life: 'alert',
    lifeImage: '/media/walkthrough/13-alert.jpg',
    lifeAlt: 'The daughter receiving an alert on her phone while her mother sits at home',
    voice: 'And they can be notified of specific events that happen in real time.',
    body: [
      'Specific events trigger a notification: no movement when there should be, leaving the house late, returning home.',
      'Each person in the circle chooses which alerts they receive, so nobody is woken for a normal night.',
      'Every alert says what happened, when, and what is unusual about it.',
    ],
  },
  {
    title: 'Peace of mind',
    screen: 'reassurance',
    alt: 'Closing screen showing an all-clear for the day',
    life: 'together',
    lifeImage: '/media/walkthrough/14-together.jpg',
    lifeAlt: 'The woman and her daughter together at home',
    voice:
      'Pacsana gives peace of mind, acting as their eyes and ears when family or carers cannot be there.',
    body: [
      'Most days, the answer is simply that everything is fine — and knowing that is the point.',
      'The person keeps their independence and their privacy. The family stops guessing.',
      'When something does change, everybody hears about it early enough to do something.',
    ],
    note: 'Eyes and ears when you cannot be there.',
  },
];

export const TOTAL_STEPS = STEPS.length;
