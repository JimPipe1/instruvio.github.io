/**
 * Generates /robots.txt at build time, so the sitemap URL always matches the
 * domain set in src/site.config.ts rather than being hard-coded.
 */
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) =>
  new Response(
    `User-agent: *
Allow: /

Sitemap: ${new URL('sitemap-index.xml', site)}
`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
