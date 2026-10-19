# JIMBO — explainer and CPD video studio portfolio

A portfolio site for an Irish explainer, CPD and product video studio. Built with [Astro](https://astro.build), it compiles to plain HTML,
CSS and images that can be uploaded to any web host.

The site is content-driven: **adding or removing a page, a project or a whole
home page section is a matter of adding or deleting one file or one line.** You
should not need to touch a component to change what the site says.

---

> **Updating the content?** There is a step-by-step, non-technical guide in
> **[CONTENT-GUIDE.md](CONTENT-GUIDE.md)** — start there instead of here.
>
> **Want to understand the setup, or restyle it?**
> **[ARCHITECTURE.md](ARCHITECTURE.md)** explains what Astro is, why the site is
> built this way, and how the design tokens work.
>
> Both are also available as printable PDFs in `docs/`. Run `npm run docs` to
> rebuild them after editing either guide.

## Running it

```bash
npm install          # once
npm run dev          # local preview at http://localhost:4321, reloads as you edit
npm run dev:stop     # stop it (see note below)
npm run build        # writes the finished site to dist/
npm run preview      # serves dist/ so you can check the real build
npm run check        # type-checks the project and validates every content file
```

Astro 7 runs the dev server as a **background daemon**: `npm run dev` returns
you to the prompt and keeps serving after the terminal is closed. `Ctrl+C` does
not stop it — use `npm run dev:stop`, with `npm run dev:status` and
`npm run dev:logs` to inspect it.

`npm run build` produces a `dist/` folder. Upload the **contents** of that
folder to your web host and the site is live. There is no server to run and
nothing to install on the host.

---

## Where everything lives

```
src/
  site.config.ts        <- brand, nav, contact details, HOME PAGE STRUCTURE
  content/
    projects/           <- one .md file per project
    pages/              <- one .md file per standalone page
    capabilities/       <- one .md file per service card
  components/           <- the building blocks
  pages/                <- the routes (rarely need editing)
  styles/global.css     <- colours, fonts, spacing
public/
  media/                <- all images and videos
```

**The two files you will use most are `src/site.config.ts` and whatever is in
`src/content/`.**

---

## Adding and removing content

### Add a project

Create a new file in `src/content/projects/`. The filename becomes the URL, so
`crane-assembly.md` becomes `/work/crane-assembly/`.

```markdown
---
title: Crane Assembly Sequence
client: Acme Construction
type: explainer          # explainer | cpd | product
summary: One or two sentences, used on the card and for search results.
poster: /media/crane.jpg # the card image — required
video: /media/crane.mp4  # optional; plays on hover on desktop
featured: true           # eligible for the home page
order: 2                 # lower numbers appear first
year: 2025
services:
  - Explainer video
details:
  Sector: Civils
  Duration: 45 seconds
gallery:
  - image: /media/crane-01.jpg
    alt: Description for screen readers
    caption: Shown under the image.
    span: half           # half | wide
---

Write the project story here in Markdown. Use `##` for subheadings.
```

It appears on `/work/` immediately, gets its own page, and joins the home page
grid if `featured: true`.

**To remove a project, delete its file.** To hide one temporarily without
deleting it, add `draft: true` — drafts stay visible in `npm run dev` and are
left out of `npm run build`.

### Add a page

Create a file in `src/content/pages/`. `faq.md` becomes `/faq/`.

```markdown
---
title: FAQ
description: Shown under the title and used for search results.
nav: true        # add it to the header menu
navOrder: 30     # lower numbers sit further left
---

Markdown content here.
```

Setting `nav: true` is all that is needed to get it into the header and the
footer — there is no separate menu to keep in step.

**To remove a page, delete its file.**

### Add a service card

Create a file in `src/content/capabilities/`. The frontmatter sets the card
title, one-line blurb and icon; the Markdown body becomes the bullet list.
Available icons: `play`, `cap`, `screen`, `mic`, `captions`, `film`, `image`, `layers`, `cube`, `ruler`, `compass` — add
more in `src/components/Icon.astro`.

### Change the home page

Open `src/site.config.ts` and look at `HOME_SECTIONS`. The home page is built
from that array, top to bottom.

- **Remove a section** — delete its block.
- **Reorder the page** — move a block up or down.
- **Reuse a section** — copy a block and change its text.

The available section types are `hero`, `featured`, `stats`, `capabilities`,
`process`, `team`, `clients` and `cta`.

### Change brand, contact details or menu

All in `src/site.config.ts`: `SITE`, `CONTACT`, `SOCIAL`, `NAV` and
`HEADER_CTA`.

---

## The training module demos

`/training/` lists the sample CPD modules. There are three:

| Module | Page | Content file |
| --- | --- | --- |
| Safe Manual Handling | `/training/manual-handling/` | `src/lib/training/manual-handling.ts` |
| Cutting Carbon in Construction | `/training/low-carbon-construction/` | `src/lib/training/low-carbon-construction.ts` |
| RainSafe Tank Installation | `/training/rainsafe-installation/` | `src/lib/training/rainsafe-installation.ts` |

Each one runs the same player: teaching steps with an illustration, questions
along the way with instant right/wrong feedback, a score, a pass mark and a
"retry the ones I missed" button. The first two modules are ten questions with
a pass mark of 8; RainSafe Tank Installation is twenty with a pass mark of 16.
Both numbers come from `passMark` and the question count in the content file.

| What you want to change | File |
| --- | --- |
| The words, questions and answers | the module's content file in `src/lib/training/` |
| The pictures | `src/lib/training/scenes-manual-handling.ts`, `scenes-carbon.ts`, `scenes-rainsafe.ts` |
| The drawing tools those scenes share | `src/lib/training/illustration-kit.ts` |
| The player: layout, progress bar, scoring | `src/components/training/ModulePlayer.astro` |
| The list of modules | `src/pages/training/index.astro` |

In a content file, each slide names a `graphic`, which is a scene key. Each
question's `answer` is the position of the correct option counting from 0, so
`answer: 2` means the third option.

### Adding a third module

1. Copy a content file in `src/lib/training/` and rewrite the text.
2. Add any new scenes to a scene file (or reuse existing keys).
3. Copy a page in `src/pages/training/`, changing the import.
4. Add it to `MODULES` in `src/pages/training/index.astro`.

### The product walkthrough

`/walkthrough/pacsana/` is a different kind of demo: a step-by-step product
tour rather than a course. Fourteen steps, each with a mocked-up phone screen,
the narration line for that step, and the supporting points beside it. No
questions and no score.

Each step has three parts: the app screen on the left, the words in the
middle, and a full-height illustration on the right of the person doing
whatever the step describes — sleeping, walking outside, getting up in the
night, stumbling.

| What you want to change | File |
| --- | --- |
| The steps, narration and copy | `src/lib/walkthrough/pacsana.ts` |
| The phone screens | `src/lib/walkthrough/screens-pacsana.ts` |
| The person illustrations | `src/lib/walkthrough/scenes-pacsana.ts` |
| The player: layout, progress, controls | `src/components/walkthrough/Walkthrough.astro` |

Each step names a `screen` (a phone mock-up) and a `life` (the drawn
illustration), plus a `lifeImage` pointing at a file. On a laptop the three
columns sit side by side; on a tablet the illustration drops underneath; on a
phone it leads, then the screen, then the words.

### Replacing the illustrations

The illustrations are served from **`public/media/walkthrough/`**, one file per
step, named after it:

```
01-morning.jpg   02-circle.jpg    03-day-night.jpg   04-sleeping.jpg
05-armchair.jpg  06-night.jpg     07-outdoor.jpg     08-visitor.jpg
09-stroll.jpg    10-exercise.jpg  11-stumble.jpg     12-round-clock.jpg
13-alert.jpg     14-together.jpg
```

The files there now are the coded drawings exported as JPGs — placeholders
until the commissioned artwork arrives. **Drop a finished image in under the
same name and it appears.** Export at 1200 × 2400 (1:2 portrait), JPG, quality
about 80, under ~250 KB. The panel crops to fill, so keep the subject inside
the middle 70% vertically and 80% horizontally, and keep text out of the
artwork.

Delete a step's `lifeImage` line in `src/lib/walkthrough/pacsana.ts` and that
step falls back to the drawn scene named by `life`, which is handy while one
illustration is still being worked on.

The illustrator brief for this set is in `docs/illustrator-brief-pacsana/`.

The screens are invented mock-ups drawn on a 360 × 640 grid, and every name,
time and figure in them is made up for the demo. Replace them with real
screenshots and client-approved copy before this is shown as the product.

Both demo types are listed on `/training/`.

### Slide images

Manual Handling points each slide at a file in **`public/media/training/`**,
and RainSafe Tank Installation at one in **`public/media/rainsafe/`**, each
named after its slide, e.g. `29-the-lift.jpg`, `25-the-300-millimetre-margin.jpg`.
Drop a real photo in with the same name and it replaces the placeholder. Delete
a slide's `image` line and it falls back to the drawn scene named by `graphic`.
The carbon module uses the drawn scenes only — add `image` lines when you have
artwork.

The 45 files in `public/media/rainsafe/` are placeholders rendered from the
drawn scenes, so each one shows what its picture is meant to contain. They are
there to be replaced.

Export slide images at 1500 × 1000, JPG, quality about 80, under ~250 KB.
`npm run placeholders` regenerates the placeholder set.

### Accuracy

Manual Handling follows Irish law (the 2005 Act and Chapter 4 of Part 2 of the
2007 General Application Regulations). Cutting Carbon quotes published figures
from UNEP, the EPA and Government guidance, dated in the slide text; those
numbers and the policy positions change every year. **Have a competent person
review either module before it is used as real training**, and note the
on-page disclaimers.

---

## Images and video

Everything goes in `public/media/`, and is referenced from that point on, e.g.
a file at `public/media/crane.jpg` is written as `/media/crane.jpg`.

Files in `public/` are copied through untouched, so **export them at the size
you want them served at.** Suggested settings:

| Use | Size | Format | Notes |
| --- | --- | --- | --- |
| Card / poster image | 1600 × 900 | JPG, quality ~80 | Under ~250 KB |
| Gallery still | 1500 × 1000 | JPG, quality ~80 | |
| Hero background | 1920 × 1080 | JPG | |
| Video | 1280 × 720 or 1920 × 1080 | MP4, H.264, no audio track | Under ~5 MB; keep loops short |
| Social share image | 1200 × 630 | JPG | Default is `/media/og-default.jpg` |

For MP4s, export with the "faststart" / "web optimised" option so playback can
begin before the file has fully downloaded.

Video is handled carefully by default: only the poster image loads up front,
the video file is fetched when it is actually needed, clips pause when scrolled
off screen, and nothing autoplays for visitors who have reduced motion turned
on in their operating system.

The hero video plays through **once** when it comes into view and then holds its
last frame for the rest of the visit — it does not loop, and scrolling back to
the top does not start it again. So the closing frame matters: end the clip on
something you are happy to leave on screen. Project card videos still loop while
the pointer is over them.

### The placeholder media

`public/media/` currently holds generated placeholders so the site can be
viewed before your real renders exist. **Replace them by dropping real files in
with the same names** — nothing else needs changing.

To regenerate them (after adding projects, say), edit the `FILES` list in
`scripts/generate-placeholders.mjs` and run `npm run placeholders`. This is a
development convenience only; delete the script once the real work is in.

---

## Look and feel

`src/styles/global.css` starts with a block of design tokens. The ones you are
most likely to change:

- `--accent` — the ocean blue (`--ocean`). Change this one value and every
  button, link highlight and detail follows.
- `--ruby`, `--tangerine`, `--emerald`, `--ice` — the rest of the palette,
  used for decoration (process bars, team avatars, the call-to-action wash).
- `--bg`, `--surface`, `--text` — the white background, light panels and
  dark text.
- `--step-0` … `--step-5` — the type scale. Sizes are fluid: they grow smoothly
  between a small phone and a large laptop.

Fonts are set in `astro.config.mjs` (currently Archivo for headings, Inter for
body). They are downloaded at build time and served from your own site, so no
visitor request goes to Google.

---

## Responsiveness

The layout is built mobile-first and was checked at 390px (phone), 834px
(tablet) and 1440px (laptop).

- Under 896px the header collapses to a menu button and a full-screen drawer.
- Grids step from one column, to two, to three as space allows.
- Tap targets are at least 44px; form fields use 16px text so iOS does not zoom
  when they are focused.
- Media slots reserve their space before images load, so the page does not jump
  about while it fills in.

---

## Going live

1. Set `SITE.url` in `src/site.config.ts` to your real domain. This is used for
   the sitemap and social share previews.
2. If the site will live in a subfolder (`example.com/portfolio`), set
   `SITE.base` to `'/portfolio'`. Otherwise leave it as `'/'`.
3. Replace the placeholder media, and the `example.com` contact details.
4. To get a working contact form, sign up with a form service (Formspree, Basin
   and similar are free at low volume) and put the URL they give you into
   `CONTACT.formEndpoint`. Until then the contact page shows your email and
   phone instead.
5. `npm run build`, then upload the contents of `dist/`.

Most hosts serve `404.html` automatically for unknown URLs; a few need it
pointing at in their configuration.
