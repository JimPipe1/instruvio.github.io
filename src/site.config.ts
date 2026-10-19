/* ============================================================================
 * SITE CONFIG — the control panel for the whole website.
 *
 * Almost every piece of "chrome" (brand name, nav, contact details, footer)
 * and the entire structure of the home page live in this one file.
 *
 * You do not need to touch any component to restructure the site:
 *   - Change text .................. edit the strings below
 *   - Remove a home page section ... delete its line from HOME_SECTIONS
 *   - Reorder the home page ........ drag its line up or down in HOME_SECTIONS
 *   - Add a nav link ............... add an entry to NAV
 * ========================================================================== */

/* ---------------------------------------------------------------------------
 * 1. BRAND + CONTACT
 * ------------------------------------------------------------------------ */

export const SITE = {
  /** Shown in the header, the browser tab, and the footer. */
  name: 'INSTRUVIO',
  /** Sits under the logo in the footer, and after the page title in the tab. */
  tagline: 'CPD, explainer and product videos',
  /** One-line description used for SEO and social sharing previews. */
  description:
    'A video and motion graphics studio making explainer videos, CPD ' +
    'modules, SaaS onboarding and product videos. Script, graphics, voiceover, ' +
    'music and animation all included.',

  /**
   * Your live domain, with no trailing slash. Used to build absolute URLs for
   * the sitemap and social share cards. Update this before you go live.
   */
  url: 'https://example.com', // PLACEHOLDER: your real domain

  /**
   * Hosting the site in a SUBFOLDER (e.g. example.com/portfolio)?
   * Set this to '/portfolio'. Leave as '/' for a normal root domain.
   */
  base: '/',
} as const;

export const CONTACT = {
  email: 'info@instruvio.com',
  /** Leave as '' to hide the phone line, or add e.g. '+353 1 234 5678'. */
  phone: '', // PLACEHOLDER
  location: 'Ireland', // PLACEHOLDER: add your town or city if you like

  /**
   * Static hosting cannot process a form on its own, so the contact form
   * needs a third-party endpoint (Formspree, Basin, Netlify Forms, etc.).
   *
   *   null  -> the page shows your email + phone as plain links (no form)
   *   'https://formspree.io/f/xxxxxxx' -> a working form is rendered
   */
  formEndpoint: null as string | null,
};

/** Footer social links. Delete any line you do not use. PLACEHOLDER URLs. */
export const SOCIAL = [
  { label: 'LinkedIn', href: 'https://linkedin.com/company/example' },
  { label: 'Vimeo', href: 'https://vimeo.com/example' },
  { label: 'YouTube', href: 'https://youtube.com/@example' },
];

/* ---------------------------------------------------------------------------
 * 2. NAVIGATION
 *
 * These links always appear. Any Markdown file in `src/content/pages/` with
 * `nav: true` in its frontmatter is added automatically, so you rarely need
 * to edit this list by hand.
 * ------------------------------------------------------------------------ */

export const NAV = [
  { label: 'Work', href: '/work/', order: 0 },
  { label: 'Demos', href: '/training/', order: 30 },
  { label: 'Contact', href: '/contact/', order: 100 },
];

/** Text and destination of the button on the far right of the header. */
export const HEADER_CTA = { label: 'Start a project', href: '/contact/' };

/* ---------------------------------------------------------------------------
 * 3. HOME PAGE STRUCTURE
 *
 * The home page is assembled from this array, top to bottom.
 *
 *   - DELETE a block to remove that section from the page.
 *   - MOVE a block to reorder the page.
 *   - COPY a block to use the same section twice with different content.
 *
 * The `type` of each block decides which component renders it. The available
 * types are: 'hero' | 'featured' | 'stats' | 'capabilities' | 'process'
 *            | 'team' | 'clients' | 'cta'
 * ------------------------------------------------------------------------ */

export const HOME_SECTIONS: HomeSection[] = [
  {
    type: 'hero',
    eyebrow: 'Content creation studio · Dublin',
    title: 'Your story, told visually.',
    body:
      'A studio that plugs into your team like a full-stack creative department. ' +
      'Our expertise in visual communication turns commercial products, services and training into graphics, videos and interactives that people understand — and act on. Created by humans, powered by AI.' ,
    primaryCta: { label: 'See the work', href: '/work/' },
    secondaryCta: { label: 'Talk to us', href: '/contact/' },
    /* Background media for the hero. Use a video for movement, or leave
       `video` out and the poster image is shown on its own.   video: '/media/hero.mp4',
       The hero video plays through once when the page opens and then holds its
       last frame, so pick a clip whose closing frame is worth looking at. */
    poster: '/media/network-hero-palette.jpg',
    video: '/media/heroVideo.mp4',
  
  },

  {
    type: 'featured',
    title: 'Selected work',
    intro: 'Explainers, CPD modules, onboarding and product videos fuelled by 30 years of instructional design experience.',
    /* How many projects to show. They are chosen from the projects marked
       `featured: true`, in their `order` sequence. */
    limit: 4,
    cta: { label: 'View all work', href: '/work/' },
  },

  {
    /* These describe what every project includes. They are not performance
       claims. Once you have real numbers (projects delivered, clients served),
       you can swap them in here. */
   //?type: 'stats',
    items: [
      { value: 'All-in', label: 'Script, graphics, voiceover, music and animation in one price' },
      { value: 'EN · GA', label: 'English and Localised versions available' },
      { value: 'CC', label: 'Captions and transcripts on every video' },
    ],//
  },

  {
    type: 'capabilities',
    title: 'What we make',
    intro:
      'One team takes you from a blank page to a finished, accessible video, ' +
      'with your subject experts involved at every review point.',
    /* The cards come from the Markdown files in `src/content/capabilities/`. */
  },

  {
    type: 'process',
    title: 'How a project runs',
    intro: 'Four stages, a fixed price, and your approval before each one begins.',
    steps: [
      {
        title: 'Discovery',
        body: 'We agree who the video is for, what they need to understand, and what they should do next. For CPD, we map this to learning outcomes.',
      },
      {
        title: 'Script',
        body: 'We write the script with your subject experts and compliance reviewers, so the facts are signed off before anything is drawn.',
      },
      {
        title: 'Storyboard and style',
        body: 'You see every scene and the visual style in advance. Changes are quick and cheap at this stage.',
      },
      {
        title: 'Animation and delivery',
        body: 'We add voiceover, music and animation, then deliver captioned files for web, social, presentations and your LMS.',
      },
    ],
  },

  {
    /* PLACEHOLDER: replace with your real team. Each person needs a name and
       role; `bio`, `photo` (e.g. '/media/team/aoife.jpg') and `linkedin` are
       optional. Without a photo the card shows their initials. Delete a
       person's block to remove them, or delete this whole block to hide the
       section. */
    type: 'team',
    title: 'The team',
    intro:
      'A small team of developers, writers, designers and animators who work directly with ' +
      'your subject experts, with no account managers in between.',
    members: [
      {
        name: 'Jim Pipe',
        role: 'Founder & Creative Director',
        bio: 'Leads discovery, scripting and creative direction, and your main contact from brief to delivery.',
        photo: '/media/team/Jim.jpg',
        // linkedin: 'https://linkedin.com/in/your-profile',
      },
      {
        name: 'Viv Duignan',
        role: '3D Scene Builder, Animator, Motion Designer',
        bio: 'Bring tech to life in low-poly or photo-realistic scenes, expert in AR/VR',
        photo: '/media/team/Viv.jpg',
      },
      {
        name: 'Cat Mangan',
        role: '2D Art Director, Illustrator, Animator',
        bio: 'Expert illustrator and storyboarder who designs the visual style & brings every scene to life in your brand.',
        photo: '/media/team/Cat.jpg',
      },
      {
        name: 'Darren Lakes',
        role: '3D Animator, Motion Designer',
        bio: 'Our PM: Keeps schedules, reviews and sign-offs on track, so projects land on time and on budget.',
        photo: '/media/team/Darren.jpg',
      },
    ],
  },

  {
    /* The sectors the studio serves. Once you have permission to name real
       clients, you can add a second 'clients' block titled 'Trusted by'. */
    type: 'clients',
    title: 'Sectors we work with',
    items: [
      'Technical & professional CPD',
      'B2B SaaS & technology',
      'Fintech & financial services',
      'Healthcare',
      'Legal',
      'Construction & engineering',
      'Education',
      'Public sector & local government',
    ],
  },

  {
    type: 'cta',
    title: 'Got something that is hard to explain?',
    body: 'Tell us what it is and who needs to understand it. We will come back with an approach, a timeline and a fixed price.',
    button: { label: 'Start a project', href: '/contact/' },
  },
];

/* ---------------------------------------------------------------------------
 * 4. WORK PAGE FILTERS
 *
 * The buttons across the top of /work/. The `value` must match the `type`
 * field used in a project's frontmatter ('all' is a special case).
 * ------------------------------------------------------------------------ */

export const WORK_FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Explainers', value: 'explainer' },
  { label: 'CPD & training', value: 'cpd' },
  { label: 'Product & SaaS', value: 'product' },
];

/* ---------------------------------------------------------------------------
 * Types — you should not need to edit anything below this line.
 * ------------------------------------------------------------------------ */

export type Link = { label: string; href: string };

export type HomeSection =
  | {
      type: 'hero';
      eyebrow?: string;
      title: string;
      body?: string;
      primaryCta?: Link;
      secondaryCta?: Link;
      poster?: string;
      video?: string;
    }
  | { type: 'featured'; title: string; intro?: string; limit?: number; cta?: Link }
  | { type: 'stats'; title?: string; items: { value: string; label: string }[] }
  | { type: 'capabilities'; title: string; intro?: string }
  | {
      type: 'process';
      title: string;
      intro?: string;
      steps: { title: string; body: string }[];
    }
  | {
      type: 'team';
      title: string;
      intro?: string;
      members: {
        name: string;
        role: string;
        bio?: string;
        photo?: string;
        linkedin?: string;
      }[];
    }
  | { type: 'clients'; title: string; items: string[] }
  | { type: 'cta'; title: string; body?: string; button: Link };
