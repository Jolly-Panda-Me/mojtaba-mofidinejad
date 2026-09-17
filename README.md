# mojtaba-mofidinejad

Bilingual (English / Persian) personal portfolio for **Mojtaba MofidiNejad — Game Designer & Producer**.
Static site, no build step, no backend. Deploy target: `https://me.jollypanda.ir/bio/mojtabamofidinejad`.

## Status

Every piece of visible text in this site is a **placeholder** and is loaded from JSON at runtime —
nothing about Mojtaba's career, companies, dates, or projects has been hard-coded or invented.
All `[PLACEHOLDER: ...]` strings must be replaced with verified information before this goes live.

## What to edit

All content lives in two files — you never need to touch the HTML/CSS/JS to update copy:

- **`data/site.json`** — hero, about, experience, skills, education, contact, nav labels, SEO meta.
  Every field has an `en` and `fa` value.
- **`data/projects.json`** — the project grid. Add, remove, or edit project objects freely; the page
  re-renders automatically. Filters (by genre) only appear if more than one genre exists in the data.

## Assets to add manually (not generated)

- `assets/images/profile/profile.jpg` — not currently used in the layout, reserved if a profile photo
  is added later.
- `assets/images/projects/*.jpg` — one image per project, matching the `image` path in `projects.json`.
  If missing, the card automatically shows a graceful text placeholder instead of a broken image.
- `assets/images/og/og-image.jpg` — social share image (1200×630 recommended).

## Structure

```
index.html          — semantic single-page shell, all copy injected at runtime
css/style.css        — design tokens + component styles
css/responsive.css    — breakpoints (1440/1280/1024/768/480/375)
css/animations.css    — hero entrance, floating 3D scene, scroll reveals, reduced-motion overrides
js/i18n.js            — loads data/site.json, renders bilingual text, EN/FA switch + localStorage
js/projects.js         — loads data/projects.json, renders filterable project grid
js/animations.js       — IntersectionObserver reveals + hero mouse/touch parallax
js/main.js             — boot sequence, nav, back-to-top, active-section highlighting
data/site.json          — all site copy (bilingual)
data/projects.json       — all project content (bilingual)
```

## Before publishing

1. Replace every `[PLACEHOLDER: ...]` value in `data/site.json` and `data/projects.json` with
   information verified against the LinkedIn profile (or another source you trust).
2. Add real project images under `assets/images/projects/`.
3. Add `assets/images/og/og-image.jpg` for social previews.
4. Double check the JSON-LD block in `index.html` (`#ld-person`) still matches the final bio.
