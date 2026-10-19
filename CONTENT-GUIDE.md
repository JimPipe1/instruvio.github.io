# How to update the website

This guide is for adding, changing and removing content. You do not need to
know how to code, and you cannot break anything permanently — if something goes
wrong, undo your change and save again.

**Contents**

1. [Before you start](#1-before-you-start)
2. [How the site is organised](#2-how-the-site-is-organised)
3. [Add a new project](#3-add-a-new-project)
4. [Change an existing project](#4-change-an-existing-project)
5. [Remove or hide a project](#5-remove-or-hide-a-project)
6. [Choose what appears on the home page](#6-choose-what-appears-on-the-home-page)
7. [Add a new page](#7-add-a-new-page)
8. [Change the service cards](#8-change-the-service-cards)
9. [Change your name, menu and contact details](#9-change-your-name-menu-and-contact-details)
10. [Adding photos and videos](#10-adding-photos-and-videos)
11. [Writing text: the six things worth knowing](#11-writing-text-the-six-things-worth-knowing)
12. [Rules that will stop the site building](#12-rules-that-will-stop-the-site-building)
13. [When something goes wrong](#13-when-something-goes-wrong)
14. [Putting your changes live](#14-putting-your-changes-live)

---

## 1. Before you start

### What you need

**A text editor.** Not Microsoft Word, and not TextEdit in its normal mode —
both add invisible formatting that breaks these files. Free options that work
properly:

- [Visual Studio Code](https://code.visualstudio.com) — recommended, and it
  colour-codes the files so mistakes are easier to spot
- [Sublime Text](https://www.sublimetext.com)

Install one, then open the whole `Jimbo` folder in it (**File → Open Folder**).
You will see the folders listed down the left-hand side, and you can click any
file to edit it.

### Turn on the live preview

This shows you your changes as you make them. Open the Terminal app, and type
these two lines, pressing Enter after each:

```
cd /Users/gfay/Jimbo
npm run dev
```

You will see a message like this, and then your normal prompt back:

```
Dev server running at http://localhost:4321 (pid 23570)
```

Now open **http://localhost:4321** in your web browser.

Every time you save a file, the browser updates itself within a second or so.
You do not need to refresh.

> **The preview keeps running in the background.** Closing the Terminal window
> does not stop it, and neither does pressing `Control` + `C`. That is normal —
> it means you can close the window and the preview still works.

When you have finished for the day, stop it by typing:

```
npm run dev:stop
```

Two other commands, for when you are not sure what is going on:

| Command | What it tells you |
| --- | --- |
| `npm run dev:status` | Whether the preview is running, and on which address |
| `npm run dev:logs` | The recent messages, including any errors |

If you run `npm run dev` when it is already running, it simply tells you so and
carries on — it will not start a second one or complain.

---

## 2. How the site is organised

There are only two ideas to understand.

### Idea one: one file, one thing

Each project on the site is one file. Each page is one file. Add a file and it
appears on the site. Delete the file and it disappears — including its menu
link and any links pointing at it. Nothing else needs updating.

These files live in the `src/content` folder:

```
src/content/
   projects/       <- one file per project in your portfolio
   pages/          <- one file per ordinary page (About, Pricing...)
   capabilities/   <- one file per service card on the home page
```

The **file's name becomes its web address**, so a project file named
`crane-assembly.md` becomes `yoursite.com/work/crane-assembly/`.

Name files in lower case with hyphens instead of spaces: `crane-assembly.md`,
not `Crane Assembly.md`. The `.md` on the end matters — keep it.

### Idea two: settings at the top, writing underneath

Open any file in `src/content/projects/` and you will see this shape:

```markdown
---
title: Riverside Tower Facade Sequence
client: Northbank Facades
year: 2025
---

Northbank were losing tenders to competitors whose systems looked simpler
to install, even where they were not.
```

The part **between the two `---` lines** is the settings: short facts the
website uses to build the page — the title, the client, which image to show.
Each one is a label, then a colon, then the value.

Everything **below the second `---`** is your writing. That is the description
that appears on the page, and you can write it normally.

That is the whole system. The rest of this guide is which settings exist.

---

## 3. Add a new project

### Step 1 — Put your images and video in place

Copy them into the `public/media` folder. Name them in lower case with hyphens:
`crane-assembly.jpg`, `crane-assembly.mp4`. See
[section 10](#10-adding-photos-and-videos) for sizes.

### Step 2 — Make a copy of an existing project

The easiest and safest way to start is to copy a file that already works.

In your editor, right-click `src/content/projects/saas-onboarding-series.md`,
choose **Copy**, then **Paste**, and rename the copy to your project — for
example `crane-assembly.md`.

### Step 3 — Fill it in

Open your new file and replace the contents. Here is a complete example with
every available setting:

```markdown
---
title: Crane Assembly Sequence
client: Acme Construction
type: explainer
summary: A 60-second sequence showing how the mast sections are assembled and pinned.
poster: /media/crane-assembly.jpg
video: /media/crane-assembly.mp4
ratio: 16 / 9
year: 2025
featured: true
order: 2
services:
  - Explainer video
  - Technical modelling
details:
  Sector: Lifting equipment
  Duration: 60 seconds
  Deliverables: 4K master, web cut
gallery:
  - image: /media/crane-assembly-01.jpg
    alt: Close view of the mast pin connection
    caption: The pin connection, shown cut away.
    span: half
  - image: /media/crane-assembly-02.jpg
    alt: The completed crane on site
    caption: Final context render.
    span: wide
---

Write the story of the project here. What was the client's problem, what did
you make, and what happened as a result.

## What we did

Use two hash marks and a space to make a subheading like the one above.
```

### What each setting means

**You must fill in these five. The site will not build without them.**

| Setting | What to put |
| --- | --- |
| `title` | The project name, as you want it displayed |
| `client` | Who it was for |
| `type` | Exactly one of: `explainer`, `cpd` or `product` — see note below |
| `summary` | One or two sentences. Shown on the project card and in Google results |
| `poster` | The main image, written as `/media/` then your filename |

> **`type` must be spelled exactly**, all in lower case, and must be one of
> those three words. It controls which filter button the project appears under
> on the Work page. A typo here is the most common mistake — see
> [section 13](#13-when-something-goes-wrong).

**These are all optional. Delete any line you do not need.**

| Setting | What it does | If you leave it out |
| --- | --- | --- |
| `video` | Plays when a visitor hovers over the card, and gets a play button on the project page | Just the image is shown |
| `ratio` | The shape of the big image on the project page. `16 / 9` is widescreen, `3 / 2` is a standard photo shape | Widescreen |
| `year` | Shown in the facts panel | Not shown |
| `featured` | `true` makes it eligible for the home page | Not on the home page |
| `order` | Sorts the Work page. **Lower numbers come first** — 1 appears before 10 | Goes to the end |
| `services` | The grey pill labels on the project page | No pills |
| `details` | The facts panel. You can invent your own labels here — see below | Only Client, Type and Year |
| `gallery` | Extra images below the description | No gallery |
| `draft` | `true` hides it from the live site | It is published |

### About `details`

This one is free-form: whatever labels you write on the left appear in the
facts panel exactly as you typed them.

```yaml
details:
  Sector: Lifting equipment
  Duration: 60 seconds
  Anything you like: Any value you like
```

The two-space indent at the start of those lines is required. See
[section 12](#12-rules-that-will-stop-the-site-building).

### About `gallery`

Each image starts with a hyphen and a space. The four settings underneath it
must line up with each other:

```yaml
gallery:
  - image: /media/crane-assembly-01.jpg
    alt: Close view of the mast pin connection
    caption: The pin connection, shown cut away.
    span: half
```

- `image` — required, the file to show
- `alt` — a plain description for blind visitors and for when an image fails to
  load. Describe what is in the picture, not "photo of crane"
- `caption` — optional, printed in small grey text underneath
- `span` — `half` for a normal image, `wide` to run it the full page width

A gallery item can be a video too. Add a `video:` line under `image:`, and the
image becomes its holding frame.

### Step 4 — Check it

Look at http://localhost:4321/work/ — your project should be there. Click it.

---

## 4. Change an existing project

Open its file in `src/content/projects/`, edit, and save. The browser updates
straight away.

To change the wording on the page, edit the text below the second `---`. To
change a fact, image or setting, edit the lines above it.

---

## 5. Remove or hide a project

**To remove it permanently:** delete the file. Everything referring to it
disappears with it — the Work page card, the project page, and the previous/
next links on neighbouring projects.

**To hide it temporarily**, which is safer, add a `draft` line to the settings:

```yaml
draft: true
```

A draft still shows in your local preview at http://localhost:4321 so you can
keep working on it, but it is left out of the version you publish. Change it to
`draft: false`, or delete the line, to publish it.

This is the right choice for work under NDA, or a project you are still writing
up.

---

## 6. Choose what appears on the home page

### Which projects appear

The home page shows projects that have `featured: true` in their settings, and
it shows them in `order` sequence — lowest number first.

To swap a project onto the home page:

1. Open the project you want to add, set `featured: true`, give it a low
   `order` number such as `1`.
2. Open the one you want to drop, and either set `featured: false` or delete
   the line.

By default four are shown. To change that, open `src/site.config.ts`, find the
block starting `type: 'featured'`, and change the `limit` number.

### Which sections appear, and in what order

Open **`src/site.config.ts`** and scroll to `HOME_SECTIONS`. This is a list of
the bands that make up the home page, top to bottom:

```
hero          the big opening statement and background video
featured      the grid of selected projects
stats         the row of numbers (12+, 400+, 30+)
capabilities  the "What we make" service cards
process       the numbered "How a project runs" stages
clients       the row of client names
cta           the closing "Got a product..." panel
```

Each one is a block in curly brackets `{ }`.

- **To remove a band from the home page,** delete its whole block, from its
  opening `{` to the `},` that closes it.
- **To move a band,** cut the whole block and paste it higher or lower in the
  list.
- **To change its wording,** edit the text in quote marks inside the block.

The text in the `stats`, `process`, `team`, `clients` and `cta` bands lives here too,
so this is where you change the numbers, the four process stages and the client
names.

> Delete the **whole** block including its final `},`. If you leave a stray
> bracket behind the site will not build — undo with `Command` + `Z` and try
> again.

---

## 7. Add a new page

This is for ordinary pages such as About, Pricing, FAQ or Terms.

Create a new file in `src/content/pages/`. The name becomes the address, so
`faq.md` becomes `yoursite.com/faq/`.

```markdown
---
title: Frequently asked questions
description: Answers to the questions we are asked most often about pricing, timescales and file formats.
eyebrow: Help
nav: true
navOrder: 30
---

## How long does an explainer video take?

Four to six weeks for a 60 to 120 second explainer.
```

| Setting | Required? | What it does |
| --- | --- | --- |
| `title` | Yes | The page heading |
| `description` | Yes | The larger intro line under the heading, also used by Google |
| `eyebrow` | No | Small blue label above the heading |
| `nav` | No | `true` adds it to the menu at the top of every page |
| `navOrder` | No | Its position in the menu. Lower numbers sit further left |
| `hero` | No | A wide banner image, e.g. `/media/about-hero.jpg` |
| `draft` | No | `true` hides it from the live site |

**You do not have to add the page to the menu yourself.** Setting `nav: true`
puts it in the top menu and the footer automatically.

The current menu order is Work (0), About (10), Sectors (15), Pricing (20), Contact (100). To
slot a new page between Sectors and Pricing, give it `navOrder: 18`.

**To remove a page,** delete its file. To take it out of the menu but keep the
page reachable by its address, change `nav: true` to `nav: false`.

---

## 8. Change the service cards

These are the cards under "What we make" on the home page. One file each, in
`src/content/capabilities/`:

```markdown
---
title: Explainer videos
blurb: Short animated films that turn a complex product, process or policy into something anyone can follow.
icon: play
order: 10
---

- 60 to 120 second hero explainers
- Custom illustration or motion graphics
- Cut-downs for social and presentations
```

- `blurb` is the paragraph on the card. Keep it to a sentence or two.
- The bullet list underneath the `---` becomes the small list at the bottom of
  the card. Start each line with a hyphen and a space.
- `order` sorts the cards, lowest first.
- `icon` picks the small symbol. Choose one of: `play`, `cap`, `screen`, `mic`,
  `captions`, `film`, `image`, `layers`, `cube`, `ruler`, `compass`. A name that is not on the list quietly falls back
  to the cube rather than breaking anything.

Add a file for a new card, delete a file to remove one. The cards re-flow to
fill the space by themselves.

---

## 9. Change your name, menu and contact details

All in one file: **`src/site.config.ts`**.

It looks more technical than the content files, but you are only changing text
between quote marks. Do not remove the quote marks, the commas, or the curly
brackets.

```js
export const SITE = {
  name: 'JIMBO',
  tagline: 'Explainer, CPD and product video, made in Ireland',
```

| What you want to change | Look for |
| --- | --- |
| Company name in the header and footer | `name:` near the top |
| The line under the logo in the footer | `tagline:` |
| Your web address, once you have one | `url:` |
| Email, phone, location | The `CONTACT` block |
| LinkedIn, Vimeo, Instagram links | The `SOCIAL` block — delete any line you do not use |
| The blue "Start a project" button | `HEADER_CTA` |
| The Work / Contact menu links | The `NAV` block |

> Pages you created yourself do not need adding to `NAV` — `nav: true` in the
> page's own file handles it. `NAV` is only for Work and Contact, which are
> built in.

---

## 10. Adding photos and videos

### Where they go

Everything goes in the **`public/media`** folder. Just drag the files in.

### How to refer to them

Whatever the filename is, write it in your settings starting with `/media/`:

| File you dropped in | What you type |
| --- | --- |
| `crane-assembly.jpg` | `poster: /media/crane-assembly.jpg` |
| `crane-assembly.mp4` | `video: /media/crane-assembly.mp4` |

Note the **forward slash at the start**, and that it is `/media/` — not
`public/media/`, and not the long path from your own computer.

### Naming

Lower case, hyphens instead of spaces, no accents or symbols:

- Good: `crane-assembly-01.jpg`
- Bad: `Crane Assembly 01.jpg`, `crane_assembly(final).jpg`

### What size to export

Files here are served to visitors exactly as you save them — nothing shrinks
them for you. A 40MB render will make the page painfully slow on a phone.

| What it is for | Size | Format | Aim for under |
| --- | --- | --- | --- |
| Project card / main image | 1600 × 900 | JPG, quality 80 | 250 KB |
| Gallery image | 1500 × 1000 | JPG, quality 80 | 250 KB |
| Home page background | 1920 × 1080 | JPG, quality 80 | 400 KB |
| Video | 1920 × 1080 | MP4 (H.264) | 5 MB |
| Wide page banner | 1680 × 720 | JPG, quality 80 | 300 KB |

For video, keep clips short and loopable, remove the audio track, and tick
**"web optimised"** or **"fast start"** when exporting — that lets playback
begin before the file has finished downloading.

### Replacing the placeholder images

The site currently ships with generated placeholder images so it looks
complete. They are the pale ones with a blue cube and the word
PLACEHOLDER.

**To replace one, save your real file over it with exactly the same name.**
Nothing else needs to change. For example, save your real render as
`saas-onboarding.jpg` into `public/media`, replacing the placeholder of that
name, and it appears everywhere that project is shown.

---

## 11. Writing text: the six things worth knowing

The writing below the second `---` uses a simple formatting system. Plain
paragraphs work exactly as you would expect — just type, and leave a blank line
between paragraphs.

**1. A subheading** — two hash marks and a space:

```markdown
## What we did
```

**2. A smaller subheading** — three hash marks:

```markdown
### Materials
```

**3. Bold** — two asterisks either side:

```markdown
This was the **most important** part.
```

**4. A bullet list** — a hyphen and a space, one item per line:

```markdown
- Full sequences for trade stands
- Short loops for product pages
```

**5. A numbered list** — the number, a full stop, and a space:

```markdown
1. Technical review
2. Modelling
```

**6. A link** — the words in square brackets, the address in round brackets:

```markdown
See our [pricing page](/pricing/) for guide costs.
```

Leave a blank line before and after headings and lists. That is the single most
common formatting mistake.

---

## 12. Rules that will stop the site building

There are only four, and all of them apply to the **settings area between the
`---` lines**, not to your writing.

### Rule 1 — If your text contains a colon, wrap it in quotes

A colon is how the settings tell a label from a value, so a colon inside your
text confuses it.

```yaml
title: Riverside: Phase 2          # BREAKS
title: "Riverside: Phase 2"        # correct
```

This catches people out with titles like `Case study: Acme`. If in doubt,
quotes around a value are always safe.

### Rule 2 — Indent with spaces, never with the Tab key

Some settings have lines indented underneath them. Those indents must be
**two spaces**. Pressing Tab inserts a different character that looks identical
on screen but breaks the file.

In Visual Studio Code, pressing Tab inserts spaces by default, so you are
usually safe — but never paste indented text in from Word.

### Rule 3 — Always put a space after the colon

```yaml
title:Crane Assembly     # BREAKS
title: Crane Assembly    # correct
```

### Rule 4 — Do not delete the `---` lines

Every content file must start with `---` on the very first line, and have a
second `---` closing the settings. Without both, the file is not recognised.

### And save as plain text

If you use TextEdit, choose **Format → Make Plain Text** before saving, and
make sure the file ends in `.md` and not `.md.rtf` or `.md.txt`. This is why a
proper code editor is worth installing.

---

## 13. When something goes wrong

If a change breaks something, the Terminal window shows a red error and the
browser shows an error page. **Nothing is damaged.** Fix the file and save, and
it recovers on its own. If you cannot see what is wrong, press `Command` + `Z`
in your editor to undo, and save again.

Here are the errors you are most likely to meet, and what they actually mean.

### "Invalid option: expected one of explainer | cpd | product"

```
[InvalidContentEntryDataError] projects → crane-assembly data does not match
collection schema.

  type: Invalid option: expected one of "explainer"|"cpd"|"product"
```

**What it means:** the `type` line in `crane-assembly.md` has a typo, or a
capital letter. It must be exactly `explainer`, `cpd` or `product`, all
lower case.

The name after the arrow — `crane-assembly` — is the file to open.

### "client: Required"

```
  client**: **client: Required
  poster**: **poster: Required
```

**What it means:** you have left out a setting that must be there. This lists
each missing one by name. Add the missing lines.

### "bad indentation of a mapping entry"

**What it means:** almost always an unquoted colon in your text (Rule 1), or a
Tab used for indenting (Rule 2). The error gives a line number:
`crane-assembly.md:1:16` means line 1.

### An image shows as a broken icon, or a grey box

The site still builds — a missing image is not an error. Check:

1. Is the file actually in `public/media`?
2. Does the name match **exactly**, including capital letters? `Crane.jpg` and
   `crane.jpg` are different files as far as the web is concerned.
3. Did you write `/media/crane.jpg` and not `public/media/crane.jpg`?

### A project is not showing up

- If it is missing from the Work page, check for `draft: true` in its settings.
- If it is missing from the home page only, it needs `featured: true`, and it
  may be below the four-project cut-off — lower its `order` number.

### Everything looks broken and unstyled

Restart the preview: `npm run dev:stop`, then `npm run dev`.

---

## 14. Putting your changes live

Editing files only changes your own copy. To produce the version that goes on
the web, run:

```
npm run build
```

This creates a folder called `dist`. Upload **the contents of that folder** —
not the folder itself — to your web host, replacing what is there.

Before the very first upload, someone will need to set your real web address in
`src/site.config.ts`. There is a checklist at the end of `README.md`.

### A safe habit

Before making a big change, copy the file you are about to edit and add `-old`
to the copy's name (`about-old.md`). If it goes wrong, delete your edited
version and rename the copy back.

Remember that a file in `src/content/pages` is live once it exists, so do not
leave `about-old.md` sitting in there — it would become a real page. Keep
backups outside the project folder, on your desktop.
