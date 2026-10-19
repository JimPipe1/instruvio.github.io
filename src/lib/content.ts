/* ============================================================================
 * Shared helpers for reading content. Pages use these instead of calling
 * getCollection() directly, so draft filtering and sorting behave the same
 * way everywhere.
 * ========================================================================== */

import { getCollection, type CollectionEntry } from 'astro:content';
import { NAV } from '../site.config.ts';

/**
 * Prefix a site-root path with the configured `base`, so links and media keep
 * working when the site is hosted in a subfolder.
 *
 * External URLs (http://, mailto:, #anchor) are returned untouched.
 */
export function withBase(path: string): string {
  if (/^([a-z]+:|\/\/|#)/i.test(path)) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}

/** Drafts stay visible while you work locally, and are dropped from the build. */
const isPublished = (entry: { data: { draft: boolean } }) =>
  import.meta.env.PROD ? !entry.data.draft : true;

/* --------------------------------------------------------------- projects */

export type Project = CollectionEntry<'projects'>;

/** All projects, lowest `order` first, then newest year first. */
export async function getProjects(): Promise<Project[]> {
  const projects = await getCollection('projects', isPublished);
  return projects.sort(
    (a, b) => a.data.order - b.data.order || (b.data.year ?? 0) - (a.data.year ?? 0),
  );
}

/** Projects marked `featured: true`, capped at `limit`. */
export async function getFeaturedProjects(limit = 4): Promise<Project[]> {
  const projects = await getProjects();
  const featured = projects.filter((p) => p.data.featured);
  // If nothing is flagged as featured, fall back to the first few projects so
  // the home page is never empty.
  return (featured.length > 0 ? featured : projects).slice(0, limit);
}

/** The project before and after this one, for the footer links. Wraps around. */
export async function getProjectNeighbours(id: string) {
  const projects = await getProjects();
  const index = projects.findIndex((p) => p.id === id);
  if (index === -1 || projects.length < 2) return { prev: undefined, next: undefined };
  return {
    prev: projects[(index - 1 + projects.length) % projects.length],
    next: projects[(index + 1) % projects.length],
  };
}

/* ------------------------------------------------------------------ pages */

export async function getPages() {
  return getCollection('pages', isPublished);
}

/* ----------------------------------------------------------- capabilities */

export async function getCapabilities() {
  const items = await getCollection('capabilities', isPublished);
  return items.sort((a, b) => a.data.order - b.data.order);
}

/* ----------------------------------------------------------- navigation */

/**
 * The header menu: the fixed links from site.config.ts, plus every Markdown
 * page that opted in with `nav: true`.
 */
export async function getNavItems() {
  const pages = await getPages();
  const fromPages = pages
    .filter((page) => page.data.nav)
    .sort((a, b) => a.data.navOrder - b.data.navOrder)
    .map((page) => ({
      label: page.data.title,
      href: `/${page.id}/`,
      order: page.data.navOrder,
    }));

  // Both lists share one `order` scale, so a page can be slotted anywhere
  // between the fixed links by choosing its navOrder.
  return [...NAV, ...fromPages].sort((a, b) => a.order - b.order);
}

/** True when `href` is the page currently being rendered. */
export function isCurrent(href: string, pathname: string): boolean {
  const clean = (s: string) => `/${s.replace(/^\/|\/$/g, '')}`;
  const target = clean(withBase(href));
  const here = clean(pathname);
  if (target === clean(withBase('/'))) return here === target;
  return here === target || here.startsWith(`${target}/`);
}
