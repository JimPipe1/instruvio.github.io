/**
 * Turns the Markdown guides in the project root into printable PDFs.
 *
 *   npm run docs
 *
 * Run it again whenever you edit one of the guides and want a fresh PDF to
 * send to somebody. The PDFs are written to docs/ and are purely for reading
 * and printing — they are not part of the website itself.
 *
 * Needs Google Chrome installed, which it drives in the background to do the
 * printing. Nothing is downloaded and no window appears.
 */

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import MarkdownIt from 'markdown-it';
import { chromium } from 'playwright-core';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = join(ROOT, 'docs');

const DOCS = [
  {
    source: 'CONTENT-GUIDE.md',
    output: 'Content-Guide.pdf',
    title: 'How to update the website',
    subtitle: 'A step-by-step guide to adding, changing and removing content',
  },
  {
    source: 'ARCHITECTURE.md',
    output: 'How-This-Website-Works.pdf',
    title: 'How this website works',
    subtitle: 'The concept, the architecture, and how to change the styling',
  },
];

/* ---------------------------------------------------------------------------
 * Print styling
 *
 * Deliberately light rather than matching the dark website: dark pages are
 * hard to read on paper and drain a printer. The accent orange is kept so the
 * documents still look like they belong to the brand.
 * ------------------------------------------------------------------------ */

const CSS = `
  @page { size: A4; margin: 18mm 16mm 20mm; }

  :root {
    --accent: #d94f00;      /* a touch deeper than the site's orange, which is
                               too light to read against white paper */
    --ink: #16191c;
    --muted: #5a6470;
    --rule: #dfe3e8;
    --panel: #f6f7f9;
  }

  * { box-sizing: border-box; }

  body {
    margin: 0;
    color: var(--ink);
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 10.2pt;
    line-height: 1.55;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* --- Cover ---------------------------------------------------------- */

  .cover {
    height: 232mm;              /* one full page inside the margins */
    display: flex;
    flex-direction: column;
    justify-content: center;
    page-break-after: always;
  }

  .cover__mark {
    width: 34px; height: 34px;
    margin-bottom: 26mm;
    background: var(--accent);
    clip-path: polygon(0 0, 100% 0, 100% 70%, 70% 100%, 0 100%);
  }

  .cover__brand {
    font-size: 11pt; font-weight: 700;
    letter-spacing: .28em; text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 8mm;
  }

  .cover__title {
    font-size: 34pt; font-weight: 700;
    line-height: 1.05; letter-spacing: -.02em;
    margin: 0 0 6mm;
  }

  .cover__subtitle {
    font-size: 13pt; color: var(--muted);
    max-width: 115mm; margin: 0;
  }

  .cover__meta {
    margin-top: 26mm; padding-top: 5mm;
    border-top: 2px solid var(--accent);
    font-size: 9pt; color: var(--muted);
  }

  /* --- Headings -------------------------------------------------------- */

  h1 {
    font-size: 19pt; letter-spacing: -.01em;
    margin: 0 0 6mm;
    padding-bottom: 3mm;
    border-bottom: 2px solid var(--accent);
    page-break-after: avoid;
  }

  /* The document title is already on the cover. */
  .body > h1:first-child { display: none; }

  h2 {
    font-size: 14pt; margin: 9mm 0 3mm;
    padding-top: 4mm; border-top: 1px solid var(--rule);
    page-break-after: avoid;
  }

  h3 { font-size: 11.5pt; margin: 6mm 0 2mm; page-break-after: avoid; }
  h4 { font-size: 10.5pt; margin: 5mm 0 2mm; page-break-after: avoid; }

  p { margin: 0 0 3.2mm; orphans: 3; widows: 3; }

  /* --- Lists ----------------------------------------------------------- */

  ul, ol { margin: 0 0 3.5mm; padding-left: 6mm; }
  li { margin-bottom: 1.4mm; }
  li::marker { color: var(--accent); }

  /* Contents list on page 2 */
  .body > ol:first-of-type { columns: 2; column-gap: 10mm; }

  /* --- Code ------------------------------------------------------------ */

  code {
    font-family: "SF Mono", Menlo, Consolas, monospace;
    font-size: 8.6pt;
    background: var(--panel);
    border: 1px solid var(--rule);
    border-radius: 2px;
    padding: .4mm 1.1mm;
  }

  pre {
    background: var(--panel);
    border: 1px solid var(--rule);
    border-left: 2.5px solid var(--accent);
    border-radius: 3px;
    padding: 3mm 3.5mm;
    margin: 0 0 4mm;
    overflow: hidden;
    page-break-inside: avoid;
  }

  pre code {
    background: none; border: 0; padding: 0;
    font-size: 8.4pt; line-height: 1.5;
    white-space: pre-wrap;
    word-break: break-word;
  }

  /* --- Tables ---------------------------------------------------------- */

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 0 0 4.5mm;
    font-size: 9.1pt;
    page-break-inside: avoid;
  }

  th {
    text-align: left;
    background: var(--panel);
    font-size: 8.4pt;
    letter-spacing: .06em;
    text-transform: uppercase;
    color: var(--muted);
    padding: 2mm 2.5mm;
    border-bottom: 1.5px solid var(--accent);
  }

  td {
    padding: 2mm 2.5mm;
    border-bottom: 1px solid var(--rule);
    vertical-align: top;
  }

  td code { font-size: 8.2pt; }

  /* --- Callouts -------------------------------------------------------- */

  blockquote {
    margin: 0 0 4mm;
    padding: 3mm 4mm;
    background: #fff7f2;
    border-left: 2.5px solid var(--accent);
    color: #4a3a30;
    page-break-inside: avoid;
  }

  blockquote p:last-child { margin-bottom: 0; }

  hr {
    border: 0;
    border-top: 1px solid var(--rule);
    margin: 7mm 0;
  }

  a { color: var(--accent); text-decoration: none; }

  strong { font-weight: 700; }
`;

/* ---------------------------------------------------------------------------
 * Build
 * ------------------------------------------------------------------------ */

const md = new MarkdownIt({ html: false, linkify: false, typographer: true });

// The in-page "Contents" links (#1-before-you-start) mean nothing in a PDF and
// print as underlined noise, so flatten them to plain text.
md.renderer.rules.link_open = () => '';
md.renderer.rules.link_close = () => '';

const escapeHtml = (s) =>
  s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

function pageHtml({ title, subtitle, brand, date, bodyHtml }) {
  return `<!doctype html>
<html lang="en-GB">
<head><meta charset="utf-8"><title>${escapeHtml(title)}</title><style>${CSS}</style></head>
<body>
  <section class="cover">
    <div class="cover__mark"></div>
    <div class="cover__brand">${escapeHtml(brand)}</div>
    <h1 class="cover__title">${escapeHtml(title)}</h1>
    <p class="cover__subtitle">${escapeHtml(subtitle)}</p>
    <div class="cover__meta">${escapeHtml(date)}</div>
  </section>
  <main class="body">${bodyHtml}</main>
</body>
</html>`;
}

async function main() {
  // Read the brand name straight out of the site config so the covers stay
  // correct if it is ever renamed.
  const config = await readFile(join(ROOT, 'src', 'site.config.ts'), 'utf8');
  const brand = config.match(/name:\s*'([^']+)'/)?.[1] ?? 'Portfolio';

  const date = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  await mkdir(OUT_DIR, { recursive: true });

  let browser;
  try {
    browser = await chromium.launch({ channel: 'chrome' });
  } catch {
    console.error(
      'Could not start Google Chrome, which is needed to make the PDFs.\n' +
        'Install it from https://google.com/chrome and run this again.',
    );
    process.exit(1);
  }

  for (const doc of DOCS) {
    const markdown = await readFile(join(ROOT, doc.source), 'utf8');
    const html = pageHtml({ ...doc, brand, date, bodyHtml: md.render(markdown) });

    // Keep the intermediate HTML: handy if a PDF ever looks wrong.
    const htmlPath = join(OUT_DIR, doc.output.replace(/\.pdf$/, '.html'));
    await writeFile(htmlPath, html);

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle' });
    await page.pdf({
      path: join(OUT_DIR, doc.output),
      format: 'A4',
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: '<div></div>',
      footerTemplate: `
        <div style="width:100%;padding:0 16mm;font-family:Helvetica,Arial,sans-serif;
                    font-size:7.5pt;color:#8a949e;display:flex;justify-content:space-between;">
          <span>${escapeHtml(brand)} — ${escapeHtml(doc.title)}</span>
          <span class="pageNumber"></span>
        </div>`,
      margin: { top: '18mm', bottom: '20mm', left: '16mm', right: '16mm' },
    });
    await page.close();

    console.log(`✓ docs/${doc.output}`);
  }

  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
