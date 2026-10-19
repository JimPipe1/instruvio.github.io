// @ts-check
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

import { SITE } from './src/site.config.ts';

// Domain and subfolder both come from src/site.config.ts so there is only
// ever one place to update them.
export default defineConfig({
  site: SITE.url,
  base: SITE.base,
  trailingSlash: 'ignore',

  // Emit `/work/index.html` rather than `/work.html`, which gives clean URLs
  // on every static host without needing rewrite rules.
  build: { format: 'directory' },

  integrations: [mdx(), sitemap()],

  // Fonts are downloaded at build time and served from your own site, so
  // there is no request to Google when a visitor loads a page.
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Archivo',
      cssVariable: '--font-display',
      weights: [500, 600, 700],
      subsets: ['latin'],
      fallbacks: ['Helvetica Neue', 'Arial', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--font-body',
      weights: [400, 500, 600],
      subsets: ['latin'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
  ],
});
