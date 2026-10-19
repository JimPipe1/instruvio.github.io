/* ============================================================================
 * CONTENT SCHEMAS
 *
 * These describe the fields each type of Markdown file is allowed to have.
 * If you mistype a field name or forget a required one, the build stops and
 * tells you which file and which field — that is the point of this file.
 * ========================================================================== */

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/* A single image or video shown in a project's gallery. */
const mediaItem = z.object({
  /** Path to the still, from inside `public/`. e.g. '/media/tower-01.jpg' */
  image: z.string(),
  /** Optional video. If present, the `image` above becomes its poster frame. */
  video: z.string().optional(),
  /** Describe the image for screen readers and for when it fails to load. */
  alt: z.string().default(''),
  /** Caption printed under the media. Leave out for no caption. */
  caption: z.string().optional(),
  /** 'wide' makes the item span the full width of the gallery. */
  span: z.enum(['half', 'wide']).default('half'),
});

/* ---------------------------------------------------------------------------
 * PROJECTS — src/content/projects/*.md
 * One file per project. Add a file, it appears. Delete it, it is gone.
 * ------------------------------------------------------------------------ */

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    /** Project name, shown on the card and as the page heading. */
    title: z.string(),
    /** Who it was for. Shown as the card's small print. */
    client: z.string(),
    /** Must match a `value` in WORK_FILTERS in src/site.config.ts. */
    type: z.enum(['explainer', 'cpd', 'product']),
    /** One or two sentences. Used on the card and for SEO. */
    summary: z.string(),

    /** The card image, from inside `public/`. Required. */
    poster: z.string(),
    /** Card/hero video. Plays on hover on desktop. Optional. */
    video: z.string().optional(),
    /** Shape of the card image: '16 / 9' for most video, '3 / 2' for a squarer card. */
    ratio: z.string().default('16 / 9'),

    /** Extra media shown on the project page, under the description. */
    gallery: z.array(mediaItem).default([]),

    /** Small facts listed beside the description. Add or remove freely. */
    details: z.record(z.string(), z.string()).default({}),
    /** Tags shown as pills on the project page. */
    services: z.array(z.string()).default([]),

    year: z.number().optional(),
    /** `true` makes it eligible for the home page 'featured' section. */
    featured: z.boolean().default(false),
    /** Lower numbers sort first. Ties fall back to newest year. */
    order: z.number().default(100),
    /** `true` hides it from the live site but keeps it visible in `npm run dev`. */
    draft: z.boolean().default(false),
  }),
});

/* ---------------------------------------------------------------------------
 * PAGES — src/content/pages/*.md
 * A standalone page written in Markdown. A file called `about.md` becomes
 * the page /about/. Set `nav: true` to add it to the header menu.
 * ------------------------------------------------------------------------ */

const pages = defineCollection({
  loader: glob({ base: './src/content/pages', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    /** Optional line above the page title. */
    eyebrow: z.string().optional(),
    /** Optional banner image at the top of the page, from inside `public/`. */
    hero: z.string().optional(),
    /**
     * Optional banner video, from inside `public/`. The `hero` image above
     * becomes its poster frame, so set both. It plays through once when the
     * page opens and then holds its last frame, the same as the home hero.
     */
    video: z.string().optional(),
    /** Add this page to the header navigation. */
    nav: z.boolean().default(false),
    /** Position in the nav. Lower numbers sit further left. */
    navOrder: z.number().default(50),
    draft: z.boolean().default(false),
  }),
});

/* ---------------------------------------------------------------------------
 * CAPABILITIES — src/content/capabilities/*.md
 * The service cards on the home page. The Markdown body is the card text.
 * ------------------------------------------------------------------------ */

const capabilities = defineCollection({
  loader: glob({ base: './src/content/capabilities', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    /** The card body text. Keep it to a sentence or two. */
    blurb: z.string(),
    /** Icon name: 'play' | 'cap' | 'screen' | 'mic' | 'captions' | 'film' | 'image' | 'layers' | 'cube' | 'ruler' | 'compass' */
    icon: z.string().default('cube'),
    order: z.number().default(100),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, pages, capabilities };
